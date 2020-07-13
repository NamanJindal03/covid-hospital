const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  //refering the reports db in here so that we can have all reports of a patient together
  reports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Report'
    }
  ]
},{
  timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;