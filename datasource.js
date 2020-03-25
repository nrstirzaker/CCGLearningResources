"use strict"
const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./ConfigManager');
const rowUtils = require('./RowUtils');

const getData = function (queryParams){
    return new Promise((resolve,reject) =>{
        loadSheet(queryParams.topic).
            then(
                result => {resolve(result)}
            ).catch(
                error => {reject("loadSheet returned an error: " + error)}
            );

    })
}

async function loadSheet(param){  
    const lowerCaseParam = param ? param.toLowerCase() : 'all';
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
        const spreadSheetRows = await sheet.getRows(options);

        const outputRows = [];
        spreadSheetRows.forEach(spreadSheetRow => {
            const rowData = rowUtils.getRowAsJson(spreadSheetRow); 
            if (lowerCaseParam === rowData.Topic.toLowerCase() || lowerCaseParam === 'all'){
                const rowNumber = spreadSheetRow.rowNumber - 1;
                const outputRow={};
                outputRow["row" + rowNumber] = rowData;
                outputRows.push( outputRow );
            }
            
        }); 
        const output = {};
        output.rows = outputRows;

        return output;

    } catch (error) {
        process.stderr.write(error);
        var msg = error.message;
        throw msg
    }
   
};

module.exports.getData = getData;

 