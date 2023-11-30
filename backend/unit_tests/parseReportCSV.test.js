const parseReportCSV = require("../src/utils/parseReportCSV");

test('parse small report csv', async () => {
    const parsedCSV = await parseReportCSV({ reportCSVFilePath: './unit_tests/time-report-1.csv' })
    expect(parsedCSV).toEqual([
        { date: 1699056000000, "hoursWorked": 7.5, "employeeId": "1", "jobGroup": "A" }
    ]);
});
