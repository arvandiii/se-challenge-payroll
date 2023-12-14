const Promise = require('bluebird');
const Report = require('../models/Report');
const ReportItem = require('../models/ReportItem');
const parseReportCSV = require("../utils/parseReportCSV");
const reportErrors = require('../errors/report');

const saveReport = async ({ reportId, reportCSVFilePath }) => {
    const exists = await Report.exists({ id: reportId });
    if (exists) {
        throw reportErrors.REPORT_EXISTS;
    }

    const reportItemsData = await parseReportCSV({ reportCSVFilePath });
    const reportItems = await Promise.all(reportItemsData.map(async (item) => {
        const reportItem = new ReportItem({ ...item, reportId: reportId });
        await reportItem.save();
        return reportItem;
    }));

    const reportModel = new Report({ id: reportId });
    await reportModel.save();
}

module.exports = saveReport;