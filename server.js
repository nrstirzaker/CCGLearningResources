const express = require('express')
const datasource = require('./datasource');
const stream = require('stream');
const moment = require('moment');
const app = express()
const port = process.env.PORT || 3000; // set our port

var startTime;

app.get('/uptime', (req,res) => {

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Start time: ' + startTime.utc().format("DD/MM/YY HH:mm"));

});

app.get('/', (req, res) => {
    datasource.getData(req.query).
        then(
            result => {res.send(result)}
        )
        .catch(
            error => {res.send({"error":error.message})}
        );
    
})

app.listen(port, () => {
    startTime = moment(new Date());
    process.stdout.write(`App listening on port ${port}!`);
})