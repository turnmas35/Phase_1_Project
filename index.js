document.addEventListener("DOMContentLoaded", function() {

    const list = document.getElementById("list")
    const showCardSet = document.getElementById("show-cardset")

    function fetchCards() {
        fetch("https://api.tcgdex.net/v2/en/sets")
        .then((resp) => resp.json())
        .then((jsonCardSets) => {
            jsonCardSets.forEach(cardSet => {
                console.log(cardSet)
                cardList(cardSet)
            })
        })
    }
    fetchCards()

    function cardList(cardSet) {
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
            showCardSet.append(name, setId, logoHeader, logo, symbolHeader, symbol)

            logo.addEventListener("error", function(e) {
                e.target.src = "https://assets.tcgdex.net/en/base/base1/logo.png"
                e.onerror = null
            })
        })
    }
})