const mongoose = require('mongoose')

const mongoURI = 'mongo:27017'
const mongoDatabaseName = process.env.ENV == 'production' ?
    'se-challenge-payroll-backend' : 'se-challenge-payroll-backend-test'

mongoose.connect(`mongodb://${mongoURI}/${mongoDatabaseName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = { mongoose }