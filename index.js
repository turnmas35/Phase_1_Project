document.addEventListener("DOMContentLoaded", function() {

    function fetchCards() {
        fetch("https://api.tcgdex.net/v2/en/sets")
        .then((resp) => resp.json())
        .then((jsonCards) => {
            jsonCards.forEach(card => {
                console.log(card)
                cardList(card)
            })
        })
    }
    fetchCards()
})