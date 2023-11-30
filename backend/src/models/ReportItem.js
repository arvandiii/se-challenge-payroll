const { mongoose } = require('./mongo');

const ReportItemSchema = new mongoose.Schema({
    'date': String,
    'hoursWorked': Number,
    'employeeId': String,
    'jobGroup': String,
    'reportId': String
});

const ReportItem = mongoose.model('ReportItem', ReportItemSchema);

module.exports = ReportItem;
