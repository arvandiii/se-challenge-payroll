const express = require('express')
const app = express()
const port = process.env.PORT
const multer = require('multer')
const saveReport = require('./utils/saveReport')
const getReport = require('./utils/getReport')

const upload = multer({ dest: './tmp/' })

app.get('/report', async (req, res) => {
    const employeeReports = await getReport();
    res.send({ payrollReport: { employeeReports } })
})

app.post('/upload/report', upload.single('reportFile'), async function (req, res, next) {
    const reportId = req.file.originalname.split('.')[0].split('-')[2]
    await saveReport({ id: reportId, reportCSVFilePath: req.file.path })
    res.send({ response: 'uploaded' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})