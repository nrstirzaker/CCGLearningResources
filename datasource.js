"use strict"
const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./ConfigManager');
const rowUtils = require('./RowUtils');
const stream = require('stream');

const getData = function (queryParams){
    return new Promise((resolve,reject) =>{
        loadSheet(queryParams.topic).
            then(
                result => {
                    process.stdout.write("loadSheet Resolved\n");
                    resolve(result)
                }
            ).catch(
                error => {
                    process.stdout.write("loadSheet Error: " + error.message +"\n");
                    reject("loadSheet returned an error: " + error.message)
                }
            );

    })
}

async function loadSheet(param){  
    const lowerCaseParam = param ? param.toLowerCase() : 'all';
    process.stdout.write("Query Params: " + lowerCaseParam + "\n");
    try {

        if(credentials.getKeys().sheet_id){
            process.stdout.write("Sheet Id retrieved\n");
        }

        if(credentials.getKeys().api_key){
            process.stdout.write("API Key retrieved\n");
        }

        const doc = new GoogleSpreadsheet(credentials.getKeys().sheet_id);
        process.stdout.write("GoogleSpreadsheet Created\n");

        doc.useApiKey(credentials.getKeys().api_key);          
        process.stdout.write("API Key Set\n");

        await doc.loadInfo();
        process.stdout.write("Info Loaded\n");

        const sheet = doc.sheetsByIndex[0];
        const options = {};
        options.limit = 200;
        const spreadSheetRows = await sheet.getRows(options);
        process.stdout.write("Number of rows returned:" + spreadSheetRows.length);

        const outputRows = [];
        spreadSheetRows.forEach(spreadSheetRow => {
            const rowData = rowUtils.getRowAsJson(spreadSheetRow);
            if (lowerCaseParam === rowData.Topic.toLowerCase() || lowerCaseParam === 'all'){
                const rowNumber = spreadSheetRow.rowNumber - 1;
                outputRows.push( rowData );
            }
            
        }); 
        const output = {};
        output.rows = outputRows;

        return output;

    } catch (error) {
        process.stdout.write(error.message);
        throw error
    }
   
};

module.exports.getData = getData;

 