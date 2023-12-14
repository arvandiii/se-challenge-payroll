const Report = require('../src/models/Report');
const ReportItem = require('../src/models/ReportItem');
const JobGroup = require('../src/models/JobGroup');
const saveReport = require('../src/controllers/saveReport');
const getReport = require('../src/controllers/getReport');

describe('get scenario', () => {
    beforeEach(async () => {
        await Report.deleteMany({});
        await ReportItem.deleteMany({});
        await JobGroup.deleteMany({});
        await JobGroup.findOneAndUpdate({ group: 'A', currency: 'USD'}, { rate: 20 }, { upsert: true });
        await JobGroup.findOneAndUpdate({ group: 'B', currency: 'USD'}, { rate: 30 }, { upsert: true });
    });

    test('get report after csv 1', async () => {
        await saveReport({ reportId: 1, reportCSVFilePath: './unit_tests/time-report-1.csv' })
        const report = await Report.find({});
        expect(report[0].id).toBe("1");
        const reportItems = await ReportItem.find({});
        expect(reportItems.length).toBe(1);
        const employeeReports = await getReport();
        expect(employeeReports).toEqual(
            [
                {
                    "employeeId": "1",
                    "payPeriod": { startDate: "2023-11-01", endDate: "2023-11-15" },
                    "amountPaid": "$150.00"
                }
            ]
        );
    });

    test('get report after csv 4', async () => {
        await saveReport({ reportId: 4, reportCSVFilePath: './unit_tests/time-report-4.csv' })
        const report = await Report.find({});
        expect(report[0].id).toBe("4");
        const reportItems = await ReportItem.find({});
        expect(reportItems.length).toBe(4);
        const employeeReports = await getReport();
        expect(employeeReports).toEqual(
            [
                {
                    "employeeId": "1",
                    "payPeriod": {
                        "startDate": "2023-01-01",
                        "endDate": "2023-01-15"
                    },
                    "amountPaid": "$300.00"
                },
                {
                    "employeeId": "1",
                    "payPeriod": {
                        "startDate": "2023-01-16",
                        "endDate": "2023-01-31"
                    },
                    "amountPaid": "$80.00"
                },
                {
                    "employeeId": "2",
                    "payPeriod": {
                        "startDate": "2023-01-16",
                        "endDate": "2023-01-31"
                    },
                    "amountPaid": "$90.00"
                }
            ]
        );
    })

    test('get report after csv 4 and 1', async () => {
        await saveReport({ reportId: 4, reportCSVFilePath: './unit_tests/time-report-4.csv' })
        await saveReport({ reportId: 1, reportCSVFilePath: './unit_tests/time-report-1.csv' })
        const report = await Report.find({});
        expect(report.length).toBe(2);
        const reportItems = await ReportItem.find({});
        expect(reportItems.length).toBe(5);
        const employeeReports = await getReport();
        console.log(employeeReports);
        expect(employeeReports).toEqual(
            [
                {
                    "employeeId": "1",
                    "payPeriod": {
                        "startDate": "2023-01-01",
                        "endDate": "2023-01-15"
                    },
                    "amountPaid": "$300.00"
                },
                {
                    "employeeId": "1",
                    "payPeriod": {
                        "startDate": "2023-01-16",
                        "endDate": "2023-01-31"
                    },
                    "amountPaid": "$80.00"
                },
                {
                    "employeeId": "1",
                    "payPeriod": { startDate: "2023-11-01", endDate: "2023-11-15" },
                    "amountPaid": "$150.00"
                },
                {
                    "employeeId": "2",
                    "payPeriod": {
                        "startDate": "2023-01-16",
                        "endDate": "2023-01-31"
                    },
                    "amountPaid": "$90.00"
                }
            ]
        );
    })
});