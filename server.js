const express = require('express')
const datasource = require('./datasource');
const app = express()
const port = process.env.PORT || 3000; // set our port

app.get('/', (req, res) => {
    datasource.getData().
        then(
            result => {res.send(result)}
        ).catch(
            error => {res.send(error)}
        );
    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))