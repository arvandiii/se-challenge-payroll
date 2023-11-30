const parseReportCSV = require("../src/utils/parseReportCSV");

test('parse small report csv', async () => {
    const parsedCSV = await parseReportCSV({ reportCSVFilePath: './unit_tests/time-report-1.csv' })
    expect(parsedCSV).toEqual([
        { date: "04/11/2023", "hoursWorked": 7.5, "employeeId": "1", "jobGroup": "A" }
    ]);
});
