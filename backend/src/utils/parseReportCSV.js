const csv = require('csvtojson')
const _ = require('underscore')

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

function convertToCleanDate(dateString) {
    const parts = dateString.split('/');
    const day = parts[0].padStart(2, '0');
    const month = parts[1].padStart(2, '0');
    const year = parts[2];
    return `${day}/${month}/${year}`;
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
            mappedItem.date = convertToCleanDate(mappedItem.date)
            return mappedItem
        })
    return mappedReportArr
}

module.exports = parseReportCSV