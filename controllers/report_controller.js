const Report = require('../models/report');
module.exports.reportsWithStatus = async (req, res)=>{
    try{
        let statusArray = ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'];
        //checks if the status provided is a valid status or not
        if(statusArray.indexOf(req.params.status) == -1){
          return res.status(401).json({
            message: "Invalid details"
          });
        }
        let reports = await Report.find({status: req.params.status}, 'doctor patient status date')
        //populating data fromdoctor and patient
          .populate({
            path: 'doctor',
            select: 'name , _id'
          })
          .populate({
            path: 'patient',
            select: 'mobile , _id'
          });
        return res.status(200).json({
          message: "All reports whose status is " + req.params.status,
          reports: reports
        });
      }catch(err){
        return res.status(500).json({
          message: "Internal Server Error"
        });
      }
}