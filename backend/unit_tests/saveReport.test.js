const JobGroup = require('../src/models/JobGroup');
const Report = require('../src/models/Report');
const ReportItem = require('../src/models/ReportItem');
const saveReport = require('../src/controllers/saveReport');

describe('save scenario', () => {
    beforeEach(async () => {
        await Report.deleteMany({});
        await ReportItem.deleteMany({});
        await JobGroup.deleteMany({});
        await JobGroup.findOneAndUpdate({ group: 'A', currency: 'USD'}, { rate: 20 }, { upsert: true });
        await JobGroup.findOneAndUpdate({ group: 'B', currency: 'USD'}, { rate: 30 }, { upsert: true });
    });

    test('save csv 1', async () => {
        await saveReport({ reportId: 1, reportCSVFilePath: './unit_tests/time-report-1.csv' })
        const report = await Report.find({});
        expect(report[0].id).toBe("1");
        const reportItems = await ReportItem.find({});
        expect(reportItems.length).toBe(1);
    });

    test('save csv 1 twice', async () => {
        await saveReport({ reportId: 1, reportCSVFilePath: './unit_tests/time-report-1.csv' })
        expect(async () => {
            await saveReport({ reportId: 1, reportCSVFilePath: './unit_tests/time-report-1.csv' })
        }).rejects.toThrow('Report already exists');
    });

    test('save csv 4', async () => {
        await saveReport({ reportId: 4, reportCSVFilePath: './unit_tests/time-report-4.csv' })
        const report = await Report.find({});
        expect(report[0].id).toBe("4");
        const reportItems = await ReportItem.find({});
        expect(reportItems.length).toBe(4);
    });
});