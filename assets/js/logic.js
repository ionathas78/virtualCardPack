const _deckMaster = [];
const _deckCurrent = [];

function getCards() {
    var groupName = "";
    //  Get common name between card filenames
    groupName = getCommonNameFromPath(_cardsList);
    console.log(_cardsList);
    console.log(groupName);


    for (var i = 0; i < _cardsList.length; i++) {
        let cardPath = _cardsList[i];
        if (cardPath != "") {
            let cardName = cardPath.substr(cardPath.lastIndexOf("/")).replace(groupName, "");

            let cardItem = {
                group: groupName,
                name: cardName,
                filePath: cardPath
            }

            _deckMaster.push(cardItem);
        }
    }
}

function getWorkingDeck() {

}


//      **      Utility Functions

function getCommonName(stringArray) {
    let workingString;
    if (stringArray[0]) {
        workingString = stringArray[0];
    }
    for (let i = 1; i < stringArray.length; i++) {
        let currentName = stringArray[i];
        if (currentName != "" && workingString != "") {
            workingString = commonString(currentName, workingString);
        }
    }

    return workingString;
}

function getCommonNameFromPath(stringArray) {
    let workingString;
    if (stringArray[0]) {
        workingString = stringArray[0].substr(stringArray[0].lastIndexOf("/") + 1);
    }
    for (let i = 1; i < stringArray.length; i++) {
        let currentName = stringArray[i].substr(stringArray[i].lastIndexOf("/") + 1);
        workingString = commonString(currentName, workingString);
    }

    return workingString;
}

function commonString(a, b, caseSensitive = false) {
    let workingString = "";
    let shortString, longString;

    if (a.length > b.length) {
        shortString = b;
        longString = a;
    } else {
        shortString = a;
        longString = b;
    }

    for (let i = 0; i < shortString.length; i++) {
        let baseString = shortString;
        let compareString = longString;

        if (!caseSensitive) {
            baseString = baseString.toUpperCase();
            compareString = compareString.toUpperCase();
        }
        for (let j = i; j < shortString.length; j++) {
            let currentString = baseString.substring(i, j + 1);
            let compareIndex = compareString.indexOf(currentString);
    
            if (compareIndex > -1) {
                if (currentString.length > workingString.length) {
                    workingString = shortString.substring(i, j + 1);
                }
            }    
        }        
    }

    return workingString;
}

//      **      Logic

getCards();
getWorkingDeck();
