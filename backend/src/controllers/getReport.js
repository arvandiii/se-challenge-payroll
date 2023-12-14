const _ = require('underscore');
const Promise = require('bluebird');
const ReportItem = require('../models/ReportItem');
const JobGroup = require('../models/JobGroup');
const { getCurrencySymbol } = require('../utils/currencyUtils');
const { calculatePayPeriod } = require('../utils/dateUtils');

const calculateAmountPaid = async (hoursWorked, jobGroup, currency) => {
    const jobGroupFromDB = await JobGroup.findOne({ group: jobGroup, currency });
    return hoursWorked * jobGroupFromDB.rate;
}

const getReport = async () => {
    // TODO: change default to an option
    const currency = 'USD'
    const currencySymbol = getCurrencySymbol(currency);
    const reportItems = await ReportItem.find({}, null, { sort: { employeeId: 1, date: 1 } });
    const reportItemsWithPayPeriod = reportItems.map((item) => ({
        employeeId: item.employeeId,
        hoursWorked: item.hoursWorked,
        jobGroup: item.jobGroup,
        payPeriod: calculatePayPeriod(new Date(item.date)),
    }))
    const groupedReport = _.groupBy(reportItemsWithPayPeriod,
        (item) => `${item.employeeId}-${item.payPeriod.startDate}-${item.payPeriod.endDate}`);
    const groupedReportWithAmountPaid = await Promise.map(Object.values(groupedReport), async (group) => {
        console.log('group', group)
        let amountPaid = await Promise.reduce(group, async (acc, item) => {
            const amount = await calculateAmountPaid(item.hoursWorked, item.jobGroup, currency);
            return acc + amount;
        }, 0)
        return {
            employeeId: group[0].employeeId,
            payPeriod: group[0].payPeriod,
            amountPaid: `${currencySymbol}${amountPaid.toFixed(2)}`
        }
    });
    console.log('groupedReportWithAmountPaid', groupedReportWithAmountPaid);
    return groupedReportWithAmountPaid;
}

module.exports = getReport;