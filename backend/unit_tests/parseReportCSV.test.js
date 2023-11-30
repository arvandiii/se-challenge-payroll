const parseReportCSV = require("../src/utils/parseReportCSV");

test('parse sample report csv', async () => {
    const csvString = `date,hours worked,employee id,job group
    14/11/2023,7.5,1,A
    9/11/2023,4,2,B
    10/11/2023,4,2,B
    9/11/2023,11.5,3,A
    8/11/2023,6,3,A
    11/11/2023,3,3,A
    2/11/2023,6,3,A
    3/11/2023,12,2,B
    4/11/2023,11,2,B
    6/11/2023,5,4,B
    21/11/2023,6,1,A
    22/11/2023,5,1,A
    23/11/2023,5,4,B
    24/11/2023,5,4,B
    25/11/2023,5,4,B
    14/12/2023,7.5,1,A
    9/12/2023,4,2,B
    10/12/2023,4,2,B
    9/12/2023,11.5,3,A
    8/12/2023,6,3,A
    12/11/2023,3,3,A
    2/12/2023,6,3,A
    3/12/2023,12,2,B
    4/12/2023,11,2,B
    6/12/2023,5,4,B
    21/12/2023,6,1,A
    22/12/2023,5,1,A
    23/12/2023,5,4,B
    24/12/2023,5,4,B
    25/12/2023,5,4,B
    24/2/2023,5,4,B`
    const parsedCSV = await parseReportCSV({ csvString })
    expect(parsedCSV).toEqual([
        { date: "14/11/2023", "hours worked": 7.5, "employee id": "1", "job group": "A" },
        { date: "9/11/2023", "hours worked": 4, "employee id": "2", "job group": "B" },
        { date: "10/11/2023", "hours worked": 4, "employee id": "2", "job group": "B" },
        { date: "9/11/2023", "hours worked": 11.5, "employee id": "3", "job group": "A" },
        { date: "8/11/2023", "hours worked": 6, "employee id": "3", "job group": "A" },
        { date: "11/11/2023", "hours worked": 3, "employee id": "3", "job group": "A" },
        { date: "2/11/2023", "hours worked": 6, "employee id": "3", "job group": "A" },
        { date: "3/11/2023", "hours worked": 12, "employee id": "2", "job group": "B" },
        { date: "4/11/2023", "hours worked": 11, "employee id": "2", "job group": "B" },
        { date: "6/11/2023", "hours worked": 5, "employee id": "4", "job group": "B" },
        { date: "21/11/2023", "hours worked": 6, "employee id": "1", "job group": "A" },
        { date: "22/11/2023", "hours worked": 5, "employee id": "1", "job group": "A" },
        { date: "23/11/2023", "hours worked": 5, "employee id": "4", "job group": "B" },
        { date: "24/11/2023", "hours worked": 5, "employee id": "4", "job group": "B" },
        { date: "25/11/2023", "hours worked": 5, "employee id": "4", "job group": "B" },
        { date: "14/12/2023", "hours worked": 7.5, "employee id": "1", "job group": "A" },
        { date: "9/12/2023", "hours worked": 4, "employee id": "2", "job group": "B" },
        { date: "10/12/2023", "hours worked": 4, "employee id": "2", "job group": "B" },
        { date: "9/12/2023", "hours worked": 11.5, "employee id": "3", "job group": "A" },
        { date: "8/12/2023", "hours worked": 6, "employee id": "3", "job group": "A" },
        { date: "12/11/2023", "hours worked": 3, "employee id": "3", "job group": "A" },
        { date: "2/12/2023", "hours worked": 6, "employee id": "3", "job group": "A" },
        { date: "3/12/2023", "hours worked": 12, "employee id": "2", "job group": "B" },
        { date: "4/12/2023", "hours worked": 11, "employee id": "2", "job group": "B" },
        { date: "6/12/2023", "hours worked": 5, "employee id": "4", "job group": "B" },
        { date: "21/12/2023", "hours worked": 6, "employee id": "1", "job group": "A" },
        { date: "22/12/2023", "hours worked": 5, "employee id": "1", "job group": "A" },
        { date: "23/12/2023", "hours worked": 5, "employee id": "4", "job group": "B" },
        { date: "24/12/2023", "hours worked": 5, "employee id": "4", "job group": "B" },
        { date: "25/12/2023", "hours worked": 5, "employee id": "4", "job group": "B" },
        { date: "24/2/2023", "hours worked": 5, "employee id": "4", "job group": "B" },
    ]);
});

test('parse small report csv', async () => {
    const csvString = `date,hours worked,employee id,job group
    14/11/2023,7.5,1,A`
    const parsedCSV = await parseReportCSV({ csvString })
    expect(parsedCSV).toEqual([
        { date: "14/11/2023", "hours worked": 7.5, "employee id": "1", "job group": "A" }
    ]);
});

test('parse small report csv with wrong headers', async () => {
    const csvString = `date,hours worked,employee id,wrong
    14/11/2023,7.5,1,A`
    await expect(parseReportCSV({ csvString })).rejects.toThrow('Invalid CSV');
});

test('parse small report csv with wrong body', async () => {
    const csvString = `date,hours worked,employee id,job group
    14/11/2023,Two,1,A`
    await expect(parseReportCSV({ csvString })).rejects.toThrow('Invalid CSV');
});