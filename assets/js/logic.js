const _CARDS_INHAND = 5;
const _STATUS_DURATION = 5000;

const _deckMaster = [];
let _deckCurrent = [];
let _deckPile = [];
let _deckHand = [];

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
const _divStatus = document.getElementById("status-text");

const Location = {
    "DECK": 0,
    "HAND": 1,
    "PILE": 2
}

function Card(groupName, cardName, cardPath, cardLocation = Location.DECK) {
    return {           
        group: groupName,
        name: cardName,
        filePath: cardPath,
        location: cardLocation
    };
}

//      **      Event Handlers

function newDeckBtnHandler(event) {
    event.preventDefault();
    clearAll();
    
    getNewDeck();
    renderCardCount();
    hideShuffled();
    hideEndOfDeck();
    enableButtons();
}

function shuffleBtnHandler(event) {
    event.preventDefault();

    if (_deckCurrent.length > 0) {
        shuffleDeck();
        displayShuffled();
        showStatus("Remaining Deck Shuffled!");
    }
}

function dealBtnHandler(event) {
    event.preventDefault();

    if (_deckCurrent.length > 0) {
        drawCardToHand(_CARDS_INHAND);
        renderHand();
    }
    if (_deckCurrent.length = 0) {
        displayEndOfDeck();
        disableButtons();
    }
    hideShuffled();
}

function drawBtnHandler(event) {
    event.preventDefault();

    if (_deckCurrent.length > 0) {
        let newCard = flipCardToPile();
        clearPile();
        renderCard(newCard, _divPile);
    }
    if (_deckCurrent.length = 0) {
        displayEndOfDeck();
        disableButtons();
    }
    hideShuffled();
}

//      **      Page functions

function renderCard(cardToDisplay, targetElement) {
    let figNew = document.createElement("fig");
    let imgNew = document.createElement("img");

    figNew.className = "card";

    imgNew.src = cardToDisplay.filePath;
    imgNew.alt = cardToDisplay.name;
    imgNew.height = "300";
    
    figNew.appendChild(imgNew);
    targetElement.appendChild(figNew);
}

function renderHand() {
    clearHand();
    _deckHand.forEach(card => { renderCard(card, _divHand) });
}

function showStatus(statusText = "") {
    let pNew = document.createElement("p");
    pNew.textContent = statusText;

    clearDOMElement(_divStatus);
    _divStatus.appendChild(pNew);

    setInterval(() => {
        clearDOMElement(_divStatus);
    }, _STATUS_DURATION);
}

function renderCardCount() {
    _spanCardsDealt.textContent = _deckHand.length + _deckPile.length;
    _spanCardsTotal.textContent = _deckMaster.length;
}

function clearDeck() {
    clearDOMElement(_divDeck);
}

function clearHand() {
    clearDOMElement(_divHand);
}

function clearPile() {
    clearDOMElement(_divPile);
}

function clearAll() {
    clearDOMElement(_divDeck);
    clearDOMElement(_divHand);
    clearDOMElement(_divPile);
}

function displayShuffled() {
    _spanIsShuffled.style.display = "block";
}

function hideShuffled() {
    _spanIsShuffled.style.display = "none";
}

function displayEndOfDeck() {
    _spanEndOfDeck.style.display = "block";
}

function hideEndOfDeck() {
    _spanEndOfDeck.style.display = "none";
}

function enableButtons() {
    _btnDealHand.disabled = false;
    _btnDrawCard.disabled = false;
    _btnShuffleDeck.disabled = false;
}

function disableButtons() {
    _btnDealHand.disabled = true;
    _btnDrawCard.disabled = true;
    _btnShuffleDeck.disabled = true;
}

//      **      Deck Functions

function getCards() {
    var groupName = "";
    //  Get common name between card filenames
    groupName = getCommonNameFromPath(_cardsList);
    console.log(_cardsList);
    console.log(groupName);
    for (var h = 0; h < _deckMaster.length; h++) {
        _deckMaster.pop();
    }

    for (var i = 0; i < _cardsList.length; i++) {
        let cardPath = _cardsList[i];
        if (cardPath != "") {
            let cardName = cardPath.substr(cardPath.lastIndexOf("/")).replace(groupName, "");
            let cardItem = new Card(groupName, cardName, cardPath, Location.DECK);

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

function flipCardToPile() {
    let drawnCard = _deckCurrent.shift();
    drawnCard.location = Location.PILE;
    _deckPile.push(drawnCard);
    return drawnCard;
}

function drawCardToHand(cardsToDraw = 1) {
    for (let i = 0; i < cardsToDraw; i++) {
        let drawnCard = _deckCurrent.shift();
        drawnCard.location = Location.HAND;
        _deckHand.push(drawnCard);
    }
    return _deckHand;
}

function playCardFromHandToPile(cardIndex = 0) {
    let playedCard = {};
    if (_deckHand && cardIndex < _deckHand.length) {
        playedCard = _deckHand.splice(cardIndex, 1);
        playedCard.location = Location.PILE;
        _deckPile.push(playedCard);
    }
    return playedCard;
}

//      **      Utility Functions

function clearDOMElement(el) {
    while (el.firstChild) {
        el.removeChild(el.lastChild);
    }
}

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

_btnNewDeck.addEventListener("click", newDeckBtnHandler);
_btnShuffleDeck.addEventListener("click", shuffleBtnHandler);
_btnDealHand.addEventListener("click", dealBtnHandler);
_btnDrawCard.addEventListener("click", drawBtnHandler);
