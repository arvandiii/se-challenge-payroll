const Report = require('../models/Report');
const ReportItem = require('../models/ReportItem');

const saveReport = async (reportData) => {
    const exists = await Report.exists({ id: reportData.id });
    if (exists) {
        throw new Error('Report already exists');
    }

    const reportItems = await Promise.all(reportData.items.map(async (item) => {
        const reportItem = new ReportItem({...item, reportId: reportData.id});
        await reportItem.save();
        return reportItem;
    }));

    const reportModel = new Report({id: reportData.id});
    await reportModel.save();
}

module.exports = saveReport;