const mongoose = require('mongoose')

const mongoURI = 'mongo:27017'
const mongoDatabaseName = 'se-challenge-payroll-backend'

mongoose.connect(`mongodb://${mongoURI}/${mongoDatabaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = { mongoose }