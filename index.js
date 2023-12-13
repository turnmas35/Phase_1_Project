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
            const name = document.createElement("h2")
            name.innerText = cardSet.name
            const setId = document.createElement("h3")
            const logo = document.createElement("img")
            logo.width = 300
            logo.height = 100
            logo.src = `${cardSet.logo}.png`;
            const symbol = document.createElement("img")
            const cardData = document.createElement("p")
            showCardSet.append(name, logo)

            logo.addEventListener("error", function(e) {
                e.target.src = "https://assets.tcgdex.net/en/base/base1/logo.png"
                e.onerror = null
            })
        })
    }
})