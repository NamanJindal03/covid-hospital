const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  //referring doctor and patient db so that we can tell this report is associated to what patient and doctor
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor'
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Patient'
  },
  status: {
    type: String,
    required: true,
    //only allows values from this array
    enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit']
  },
  date : {
    type: String,
    required: true
  }
},{
  timestamps: true
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;