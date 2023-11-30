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

const checkType = (arr, schema) => {
    if (!Array.isArray(arr) || arr.length === 0) {
        return false;
    }

    for (const obj of arr) {
        if (typeof obj !== 'object' || Array.isArray(obj)) {
            return false;
        }

        for (const key in schema) {
            if (!(key in obj) || typeof obj[key] !== schema[key]) {
                return false;
            }
        }
    }
    return true;
};

const parseReportCSV = async ({ csvFile }) => {
    const reportArr = await csv({
        colParser: headerSchema,
        checkType: true,
        noheader: false
    }).fromFile(csvFile)
    if (!checkType(reportArr, headerSchema)) {
        throw new Error('Invalid CSV')
    }
    const mappedReportArr = _.map(reportArr,
        (item) => {
            const mappedItem = {}
            for (const key in item) {
                mappedItem[headerMap[key]] = item[key]
            }
            return mappedItem
        })
    return mappedReportArr
}

module.exports = parseReportCSV