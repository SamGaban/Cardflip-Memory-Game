// TODO difficulty chooser

let difModifier = 12

// Defining the three difficulty modifier radio buttons

let radioButtons = document.querySelectorAll('#question>input');

// MAKING THE RADIO BUTTONS WORK
for (let i=0; i < 3; i++) {
    let item = radioButtons[i];
    item.onclick = () => {
        difModifier = item.value;
        NewGame();
    }
}

let turned = 0;

let shuffled;

const CreateCardIndexes = () => {
    // TODO Create a list of cards based on the modifier number

    let cardIndexList = []
    for (let i = 0; i < difModifier/2; i++) {
        cardIndexList.push(i)
        cardIndexList.push(i)
    }

// TODO Randomize list

    shuffled = [];

    shuffled = cardIndexList // Value to use later IMPORTANT
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)

};

CreateCardIndexes();


// TODO Card populate function

const PopulateCards = () => {
    let htmlDiv = document.querySelector("#flip-card-container");

    for (let i = 0; i < difModifier; i++) {

        let cardDiv = document.createElement('div');
        let card = document.createElement('img');
        // card.setAttribute('src', `./assets/images/${shuffled[i]}.png`);
        card.setAttribute('src', './assets/images/back.png');
        card.setAttribute('class', `card${shuffled[i]}`)
        card.classList.add("back")
        cardDiv.appendChild(card);
        cardDiv.addEventListener('click', () => {
            // console.log(`Card ${shuffled[i]}`)
            // TODO create a function that makes it so if the card has the class
            // back, it switches with front, and vice versa

            for (let a = 0; a < card.classList.length; a++) {
                // card.classList.remove("front")
                // When a card is face up
                if (card.classList[a].toString() === "front") {
                    card.classList.remove("front");
                    card.classList.add("back")
                    card.setAttribute('src', './assets/images/back.png');
                    // When a card is revealed
                } else if (card.classList[a].toString() === "back") {
                    card.classList.remove("back");
                    card.classList.add("front")
                    card.setAttribute('src', `./assets/images/${shuffled[i]}.png`);
                }
            }

        });
        // END OF EVENT LISTENER FUNCTION

        htmlDiv.appendChild(cardDiv);
    }
};

PopulateCards();

// TODO Create a reset function that cleans the board

const CleanBoard = () => {
    let mainDiv = document.querySelector("#flip-card-container");
    mainDiv.innerHTML = "";
};

// TODO Function to link to the radio button for the game to reset each time they are pressed with new difficulty

const NewGame = () => {
    turned = 0;
    CleanBoard();
    CreateCardIndexes();
    PopulateCards();
};

// TODO Create a function that turns all card face down without resetting the game and score
// TODO On second click, other card visible => Compare => counter +1
// TODO Check if card share secret class
// TODO Card invisible => unclickable