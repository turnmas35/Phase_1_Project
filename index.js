document.addEventListener("DOMContentLoaded", function() {

    const list = document.getElementById("list")

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
            
        })
    }
})