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

function convertToDate(dateString) {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
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