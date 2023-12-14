const express = require('express')
const app = express()
const port = process.env.PORT
const reportRouter = require('./routers/report')


app.use('/report', reportRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})