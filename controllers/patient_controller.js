const Patient = require('../models/patient');
const Report = require('../models/report');
module.exports.register = async (req,res) =>{
    const {mobile } = req.body;
    try{
        let patient = await Patient.findOne({mobile});

        //if the patient is found we dont need to register and we will send his details
        if(patient){
            patient = await patient.populate('reports', '_id , doctor , patient , status , date').execPopulate();
            return res.status(200).json({
              message: "Patient details",
              patient: patient
            })
        }
        
        //if not found we have to register this patient with his mobile number
        patient = await Patient.create({mobile});

        return res.status(200).json({
            message: "Patient registered successfully",
            patient: patient
        })
        
    }
    catch(err){ 
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports.createReport = async (req, res) =>{
    try{
        let patient = await Patient.findById(req.params.id, function(err){
            if(err){
                console.log(err);
                return res.status(401).json({
                    message: "Invalid details"
                });
            }   
        })

        let statusArray = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];
        let status = statusArray[Math.floor(Math.random() * statusArray.length)];
        let date = new Date().toJSON().slice(0,10).toString();
        let report = await Report.create({
            doctor: req.auth._id,
            patient: patient._id,
            status: status,
            date: date
        });

        patient.reports.push(report.id);
        patient.save();
        return res.status(200).json({
            message: "Report created successfully",
            report: report
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
          });
    }
}
module.exports.allReports = async (req,res) =>{
    try{
        let patient = await Patient.findById(req.params.id, function(err){
            if(err){
                console.log(err);
                return res.status(401).json({
                    message: "Invalid details"
                });
            }   
        })
        .sort('-createdAt')
        .populate({
          path: 'reports',
          select: 'doctor status date',
          populate:{
              path: 'doctor',
              select: 'name'
          }
        })
        //if patient found send his reports
        return res.status(200).json({
          mobile: patient.mobile,
          message: "All Reports of fetched" ,
          reports: patient.reports
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error"
          });
    }
}