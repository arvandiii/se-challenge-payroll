const { mongoose } = require('./mongo');

const ReportSchema = new mongoose.Schema({
    id: String,
});

const Report = mongoose.model('Report', ReportSchema);

module.exports = Report;