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
                    process.stdout.write("loadSheet Error Caught\n");
                    //process.stdout.write(error);
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
            process.stdout.write("sheet_id has a value\n");
        }else{
            process.stdout.write("sheet_id has NO value\n");
        }

        if(credentials.getKeys().private_key){
            const first36 = credentials.getKeys().private_key.subString(1,36);
            process.stdout.write("private_key has a value, first 36 are :" + first36 +"\n");
            
        }else{
            process.stdout.write("private_key has NO value\n");
        }

        if(credentials.getKeys().client_email){
            process.stdout.write("client_email has a value" + credentials.getKeys().client_email + "\n");
        }else{
            process.stdout.write("client_email has NO value\n");
        }


        const doc = new GoogleSpreadsheet(credentials.getKeys().sheet_id);
        process.stdout.write("GoogleSpreadsheet:" + doc + " Created\n");

        // await doc.useServiceAccountAuth({
        //     client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        //     private_key: process.env.GOOGLE_PRIVATE_KEY,
        //   });

        await doc.useServiceAccountAuth({
            client_email: credentials.getKeys().client_email,
            private_key: credentials.getKeys().private_key
        });            
        process.stdout.write("Service Account Auth Complete");

        await doc.loadInfo();
        process.stdout.write("Info Loaded");

        const sheet = doc.sheetsByIndex[0];
        const options = {};
        options.limit = 200;
        const spreadSheetRows = await sheet.getRows(options);
        process.stdout.write("Number of rows returned:" + spreadSheetRows.length);

        const outputRows = [];
        spreadSheetRows.forEach(spreadSheetRow => {
            const rowData = rowUtils.getRowAsJson(spreadSheetRow);
            process.stdout.write("Row Data:" + rowData); 
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
        process.stdout.write(error.message);
        process.stderr.write(error);
        //throw error
    }
   
};

module.exports.getData = getData;

 