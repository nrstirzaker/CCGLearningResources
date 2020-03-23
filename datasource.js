"use strict"
const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./ConfigManager');
const rowUtils = require('./RowUtils');

const getData = function (){
    return new Promise((resolve,reject) =>{
        loadSheet().
            then(
                result => {resolve(result)}
            ).catch(
                error => {reject("main error" + error)}
            );

    })
}

async function loadSheet(){  

    try {

        const doc = new GoogleSpreadsheet(credentials.getKeys().sheet_id);
        await doc.useServiceAccountAuth({
            client_email: credentials.getKeys().client_email,
            private_key: credentials.getKeys().private_key
        });
            
        await doc.loadInfo();
        
        const sheet = doc.sheetsByIndex[0];
        const options = {};
        options.limit = 200;
        const rows = await sheet.getRows(options);

        const outputRows = [];
        rows.forEach(row => { 
            outputRows.push( rowUtils.getRowAsJson(row) );
        }); 
        const output = {};
        output.rows = outputRows;

        return output;

    } catch (error) {
        console.log(error);
        return {error}
    }
   
};

module.exports.getData = getData;

 