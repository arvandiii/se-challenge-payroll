const express = require('express')
const app = express()
const port = process.env.PORT
const multer = require('multer')
const parseReportCSV = require('./utils/parseReportCSV')
const saveReport = require('./utils/saveReport')

const upload = multer({ dest: './tmp/' })

app.get('/report', (req, res) => {
    res.send({ response: 'up' })
})

app.post('/upload/report', upload.single('reportFile'), async function (req, res, next) {
    console.log(req.file);
    console.log(req.body);
    const reportId = req.file.originalname.split('.')[0].split('-')[2]
    const parsedReport = await parseReportCSV({ csvFile: req.file.path })
    console.log(parsedReport)
    await saveReport({ id: reportId, items: parsedReport })
    console.log('saved')
    res.send({ response: 'uploaded' })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})