const _ = require('underscore');
const ReportItem = require('../models/ReportItem');

function convertToDate(dateString) {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    return new Date(year, month, day);
}

const calculatePayPeriod = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const isFirstHalf = day <= 15;

    return {
        startDate: new Date(year, month, isFirstHalf ? 1 : 16).toISOString().split('T')[0],
        endDate: new Date(year, month, isFirstHalf ? 15 : new Date(year, month + 1, 0).getDate()).toISOString().split('T')[0]
    };
}

const calculateAmountPaid = (hoursWorked, jobGroup) => {
    return hoursWorked * (jobGroup === 'A' ? 20 : 30);
}

const getReport = async () => {
    const reportItems = await ReportItem.find({}, null, { sort: { employeeId: 1, date: 1 } });
    console.log(reportItems)
    const reportItemsWithPayPeriod = reportItems.map((item) => ({
        employeeId: item.employeeId,
        hoursWorked: item.hoursWorked,
        jobGroup: item.jobGroup,
        payPeriod: calculatePayPeriod(convertToDate(item.date)),
    }))
    const groupedReport = _.groupBy(reportItemsWithPayPeriod,
        (item) => `${item.employeeId}-${item.payPeriod.startDate}-${item.payPeriod.endDate}`);
    const groupedReportWithAmountPaid = _.map(groupedReport, (group) => ({
        employeeId: group[0].employeeId,
        payPeriod: group[0].payPeriod,
        amountPaid: `$${group.reduce((acc, item) => acc + calculateAmountPaid(item.hoursWorked, item.jobGroup), 0).toFixed(2)}`
    }));
    return groupedReportWithAmountPaid;
}

module.exports = getReport;