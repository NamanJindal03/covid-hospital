const Patient = require('../models/patient');
const Report = require('../models/report');

//registers a new patient if already exist then send its details
module.exports.register = async (req,res) =>{
    const {mobile } = req.body;
    try{
        let patient = await Patient.findOne({mobile});

        //if the patient is found we dont need to register and we will send his details
        if(patient){
            //populating the oatient with some specifs from report
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

//create a report for the user with a random association with covid
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
        //these are the only values which are allowed to be within status field as an enum has been defined
        let statusArray = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];
        //randomly picks one
        let status = statusArray[Math.floor(Math.random() * statusArray.length)];
        let date = new Date().toJSON().slice(0,10).toString();
        //creating a new report
        let report = await Report.create({
            doctor: req.auth._id,
            patient: patient._id,
            status: status,
            date: date
        });
        //pushing this report in the patient's reports
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

//gives all reports of a specific patient
module.exports.allReports = async (req,res) =>{
    try{
        //req.params.id - the frontend passes the id of the patient for which we need to generate all the reports
        let patient = await Patient.findById(req.params.id, function(err){
            if(err){
                console.log(err);
                return res.status(401).json({
                    message: "Invalid details"
                });
            }   
        })
        //sort according to the date of creation
        .sort('-createdAt')
        //performing nested population with some specific data
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