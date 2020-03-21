const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./credentials.json');
 
// spreadsheet key is the long id in the sheets URL


(async function main(){

    try{

        const doc = new GoogleSpreadsheet('1MbmrTRl8eOcAKaG_NFsAaIPQcyYuJKnjnbr91K1FpdM');
        doc.useServiceAccountAuth(credentials);
        await doc.loadInfo();
        console.log(doc.sheetCount);

    }catch(err){
        console.log(err)
    }
    

})();


//doc.useApiKey('AIzaSyBgxrFXoldWT_8Wck6-Sao-7InqQq-FWWg');

// doc.useServiceAccountAuth({
//   client_email: 'friendsatschristscollege@gmail.com',
//   private_key: '59088832878-m4fteuen7h3fm4ruhhgs6oolnvbiv6f7.apps.googleusercontent.com'
// });
 


// sheet = doc.sheetsById[0]; // or use doc.sheetsById[id]
// console.log(sheet.title);
// console.log(sheet.rowCount);
 
// use service account creds
// await doc.useServiceAccountAuth({
//     client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
//     private_key: process.env.GOOGLE_PRIVATE_KEY,
//   });  
// // OR load directly from json file if not in secure environment
// await doc.useServiceAccountAuth(require('./creds-from-google.json'));
// // OR use API key -- only for read-only access to public sheets
// doc.useApiKey('YOUR-API-KEY');
 