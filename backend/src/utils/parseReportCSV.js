const csv = require('csvtojson')
const _ = require('underscore')
const { convertToDate } = require('./dateUtils')

const headerSchema = {
    'date': 'string',
    'hours worked': 'number',
    'employee id': 'string',
    'job group': 'string'
}

const headerMap = {
    'date': 'date',
    'hours worked': 'hoursWorked',
    'employee id': 'employeeId',
    'job group': 'jobGroup'
}

const parseReportCSV = async ({ reportCSVFilePath }) => {
    const reportArr = await csv({
        colParser: headerSchema,
        checkType: true,
        noheader: false
    }).fromFile(reportCSVFilePath)
    const mappedReportArr = _.map(reportArr,
        (item) => {
            const mappedItem = {}
            for (const key in item) {
                mappedItem[headerMap[key]] = item[key]
            }
            mappedItem.date = convertToDate(mappedItem.date).getTime()
            return mappedItem
        })
    return mappedReportArr
}

module.exports = parseReportCSV