const getRowAsJson = function (spreadSheetRow) {
    const rowOutput = {};
    const rows = [];
    const col1 = spreadSheetRow.First;
    const col2 = spreadSheetRow.Second;
    const col3 = spreadSheetRow.Third;
    const rowNumber = spreadSheetRow.rowNumber - 1;
    rowOutput["row" + rowNumber] = {col1,col2,col3}
    return rowOutput;
}


module.exports.getRowAsJson = getRowAsJson;

