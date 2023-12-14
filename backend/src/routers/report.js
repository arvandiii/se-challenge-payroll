const express = require('express');
const multer = require('multer')

const getReport = require('../controllers/getReport');
const saveReport = require('../controllers/saveReport');

const router = express.Router();
const upload = multer({ dest: './tmp/' })

router.get('/', async (req, res) => {
    const employeeReports = await getReport();
    res.send({ status: 'ok', data: { payrollReport: { employeeReports } } })
})

router.post('/upload', upload.single('reportFile'), async (req, res) => {
    const reportId = req.file.originalname.split('.')[0].split('-')[2]
    await saveReport({ id: reportId, reportCSVFilePath: req.file.path })
    res.send({ status: 'ok' })
})

module.exports = router;