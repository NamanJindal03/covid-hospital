const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
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