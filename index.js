document.addEventListener("DOMContentLoaded", function() {

    const list = document.getElementById("list")
    const showCardSet = document.getElementById("show-cardset")
    const cardUl = document.getElementById("card-list")

    function fetchCards() {
        fetch("https://api.tcgdex.net/v2/en/sets")
        .then((resp) => resp.json())
        .then((jsonCardSets) => {
            jsonCardSets.forEach(cardSet => {
                console.log(cardSet)
                cardSetList(cardSet)
            })
        })
    }
    fetchCards()

    function cardSetList(cardSet) {
        const listItem = document.createElement("li")
        listItem.innerText = cardSet.name
        list.append(listItem)

        listItem.addEventListener("click", function(e) {
            e.preventDefault();
            showCardSet.innerHTML = ""
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
            showCardSet.append(name, setId, logoHeader, logo, symbolHeader, symbol, cardData)

            logo.addEventListener("error", function(e) {
                e.target.src = "https://assets.tcgdex.net/en/base/base1/logo.png"
                e.onerror = null
            })

            symbol.addEventListener("error", function(e) {
                e.target.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/2052px-Pok%C3%A9_Ball_icon.svg.png"
                e.onerror = null
            })

            fetch("https://api.tcgdex.net/v2/en/cards")
            .then((resp) => resp.json())
            .then((jsonCardList) => {
                jsonCardList.forEach(card => {
                    console.log(card)
                    cardList(card)
                })
            })
        })
    }

    function cardList(card) {
        const cardLi = document.createElement("li")
        cardLi.innerText = card.name
        cardUl.append(cardLi)
    }
})