const { mongoose } = require('./mongo');

const JobGroupSchema = new mongoose.Schema({
    group: String,
    rate: Number,
    currency: String
});

const JobGroup = mongoose.model('JobGroup', JobGroupSchema);

module.exports = JobGroup;