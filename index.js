document.addEventListener("DOMContentLoaded", function() {
    
// global variables
    const list = document.getElementById("list")
    const showCardSet = document.getElementById("show-cardset")
    const cardUl = document.getElementById("card-list")
    const cardInfo = document.getElementById("show-card-info")
    const cardForm = document.getElementById("card-form")
    const cardSetForm = document.getElementById("cardset-form")

// function fetches card sets and displays on dom
    function fetchCardSets() {
        fetch("https://api.tcgdex.net/v2/en/sets")
        .then((resp) => resp.json())
        .then((jsonCardSets) => {
            jsonCardSets.forEach(cardSet => {
                cardSetList(cardSet)
            })
        })
    }
    fetchCardSets()

// creates li and lists card set names
    function cardSetList(cardSet) {
        const listItem = document.createElement("li")
        listItem.innerText = cardSet.name
        list.append(listItem)

    // listens for click on card set name, then displays card set info for that specific card set
        listItem.addEventListener("click", function(e) {
            e.preventDefault();
            showCardSet.innerHTML = ""
            const nameHeader = document.createElement("h3")
            nameHeader.innerText = 'SET NAME:'
            const name = document.createElement("h1")
            name.innerText = cardSet.name
            const setId = document.createElement("h2")
            setId.innerText = `Set ID: ${cardSet.id}`
            const logoHeader = document.createElement("h3")
            logoHeader.innerText = "LOGO:"
            const logo = document.createElement("img")
            logo.src = `${cardSet.logo}.png`;
            const symbolHeader = document.createElement("h3")
            symbolHeader.innerText = "SYMBOL:"
            const symbol = document.createElement("img")
            symbol.src = `${cardSet.symbol}.png`;
            const cardData = document.createElement("p")
            cardData.innerText = `Total Cards: ${cardSet.cardCount.total} | Official Cards: ${cardSet.cardCount.official}`;
            showCardSet.append(nameHeader, name, setId, logoHeader, logo, symbolHeader, symbol, cardData)

        // listens for error on image display, then displays Alt image
            logo.addEventListener("error", function(e) {
                e.target.src = "https://assets.tcgdex.net/en/base/base1/logo.png"
                e.onerror = null
            })

        // listens for error on image display, then displays Alt image
            symbol.addEventListener("error", function(e) {
                e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png"
                e.onerror = null
            })
        })
    }

    // function fetches all cards and displays on dom
    function fetchCards() {
        fetch("https://api.tcgdex.net/v2/en/cards")
        .then((resp) => resp.json())
        .then((jsonCardList) => {
            jsonCardList.forEach(card => {
                cardList(card)
            })
        })
    }
    fetchCards()

// list cards to cardUl
    function cardList(card) {
        const cardLi = document.createElement("li")
        cardLi.innerText = card.name
        cardUl.append(cardLi)

    // listens for click on card name, the displays info for that specific card
        cardLi.addEventListener("click", function(e) {
            e.preventDefault();
            cardInfo.innerHTML = ""
            const nameHeader = document.createElement("h3")
            nameHeader.innerText = 'NAME:'
            const name = document.createElement("h1")
            name.innerText = card.name
            const setId = document.createElement("h2")
            setId.innerText = `Set ID: ${card.id}`
            const imageHeader = document.createElement("h3")
            imageHeader.innerText = "CARD:"
            const image = document.createElement("img")
            image.src = `${card.image}/high.png`;


            cardInfo.append(nameHeader, name, setId, imageHeader, image)

            image.addEventListener("error", function(e) {
                e.target.src = "https://assets.pokemon.com/assets/cms2/img/cards/web/SM8/SM8_EN_91.png"
                e.onerror = null
            })
        })
    }
// submit button search code
    cardForm.addEventListener("submit", function(e) {
        e.preventDefault();
        cardSearch(cardForm.children[0].value)
        console.log(cardForm.children[0].value)
    })

    function cardSearch(name) {
        fetch(`https://api.tcgdex.net/v2/en/cards/${name}`)
            .then(res => res.json())
            .then(jsonCard => {
                cardInfo.innerHTML = ""
                cardUl.innerHTML = ""
                cardList(jsonCard)
            })
    };

    cardSetForm.addEventListener("submit", function(e) {
        e.preventDefault();
        cardSearch(cardSetForm.children[0].value)
        console.log(cardSetForm.children[0].value)
    })

    function cardSearch(name) {
        fetch(`https://api.tcgdex.net/v2/en/cards/${name}`)
            .then(res => res.json())
            .then(jsonCard => {
                cardInfo.innerHTML = ""
                cardUl.innerHTML = ""
                cardList(jsonCard)
            })
    };
})