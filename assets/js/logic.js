const _deckMaster = [];

function getCards() {
    var groupName = "";
    //  Get common name between card filenames

    for (var i = 0; i < _cardsList.length; i++) {
        let cardPath = _cardsList[i];
        let cardName = cardPath.replace(groupName, "");

        let cardItem = {
            group: groupName,
            name: cardName,
            filePath: cardPath
        }

        _deckMaster.push(cardItem);
    }
}

//      **      Logic

getCards();
