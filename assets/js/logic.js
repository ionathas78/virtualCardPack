const _CARDS_INHAND = 5;

const _deckMaster = [];
const _deckCurrent = [];
const _deckPile = [];
const _deckHand = [];

const _spanIsShuffled = document.getElementById("is-shuffled");
const _spanCardsDealt = document.getElementById("cards-dealt");
const _spanCardsTotal = document.getElementById("cards-total");
const _spanEndOfDeck = document.getElementById("end-of-deck");
const _btnNewDeck = document.getElementById("new-deck");
const _btnShuffleDeck = document.getElementById("shuffle-deck");
const _btnDrawCard = document.getElementById("draw-card");
const _btnDealHand = document.getElementById("deal-hand");
const _divDeck = document.getElementById("card-deck");
const _divPile = document.getElementById("card-pile");
const _divHand = document.getElementById("card-hand");

//      **      Page Functions

function dealBtnHandler(event) {
    event.preventDefault();

}

function drawBtnHandler(event) {
    event.preventDefault();

}

function newDeckBtnHandler(event) {
    event.preventDefault();

}

function shuffleBtnHandler(event) {
    event.preventDefault();

}


//      **      Deck Functions

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
                filePath: cardPath,
                isDrawn: false,
                inHand: false
            }

            _deckMaster.push(cardItem);
        }
    }
}

function getNewDeck() {
    _deckCurrent = [..._deckMaster];
    _deckPile = [];
    _deckHand = [];
    return true;
}

function shuffleDeck() {
    _deckCurrent.sort(() => Math.random() > 0.5);
    return true;
}

function revealCardToPile() {
    let drawnCard = _deckCurrent.shift();
    _deckPile.push(drawnCard);
    return drawnCard;
}

function drawCardToHand(cardsToDraw = 1) {
    for (let i = 0; i < cardsToDraw; i++) {
        let drawnCard = _deckCurrent.shift();
        _deckHand.push(drawnCard);
    }
    return _deckHand;
}

function playCardFromHand(cardIndex = 0) {
    let playedCard = {};
    if (_deckHand && cardIndex < _deckHand.length) {
        playedCard = _deckHand.splice(cardIndex, 1);
        _deckPile.push(playedCard);
    }
    return playedCard;
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

_btnDealHand.addEventListener("click", dealBtnHandler);
_btnDrawCard.addEventListener("click", drawBtnHandler);
_btnNewDeck.addEventListener("click", newDeckBtnHandler);
_btnShuffleDeck.addEventListener("click", shuffleBtnHandler);
