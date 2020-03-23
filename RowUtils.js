const getRowAsJson = function (spreadSheetRow) {
    const rowOutput = {};
    const rows = [];
    const Topic = spreadSheetRow.Topic;
    const Name = spreadSheetRow.Name;
    const URL = spreadSheetRow.URL;
    const Notes = spreadSheetRow.Notes;
    const Year1Review = spreadSheetRow.Year1Review;
    const Year2Review = spreadSheetRow.Year2Review;
    const Year3Review = spreadSheetRow.Year3Review;
    const Year4Review = spreadSheetRow.Year4Review;
    const Year5Review = spreadSheetRow.Year5Review;
    const Year6Review = spreadSheetRow.Year6Review;
    const Year7Review = spreadSheetRow.Year7Review;
    const Year8Review = spreadSheetRow.Year8Review;
    const Year9Review = spreadSheetRow.Year9Review;
    const Year10Review = spreadSheetRow.Year10Review;
    const Year11Review = spreadSheetRow.Year11Review;
    const Year12Review = spreadSheetRow.Year12Review;
    const Year13Review = spreadSheetRow.Year13Review;
    const rowNumber = spreadSheetRow.rowNumber - 1;
    rowOutput["row" + rowNumber] = {Topic,Name,URL,Notes,Year1Review,Year2Review,Year3Review,Year4Review,Year5Review,Year6Review,Year7Review,Year8Review,Year9Review,Year10Review,Year11Review,Year12Review,Year13Review}
    return rowOutput;
}


module.exports.getRowAsJson = getRowAsJson;

