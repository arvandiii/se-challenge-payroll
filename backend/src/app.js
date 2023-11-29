const express = require('express')
const app = express()
const port = process.env.PORT
const multer = require('multer')

const upload = multer({ dest: './tmp/' })


app.get('/', (req, res) => {
    res.send({response: 'up'})
})

app.post('/upload/report', upload.single('report'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any

    console.log(req.file);
    console.log(req.body);
    res.send({response: 'uploaded'})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})