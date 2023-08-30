// TODO difficulty chooser

let difModifier = 12

// Defining the three difficulty modifier radio buttons

let radioButtons = document.querySelectorAll('#question>input');


for (let i=0; i < 3; i++) {
    let item = radioButtons[i];
    item.onclick = () => {
        difModifier = item.value;
        NewGame();
    }
}

let shuffled;

const CreateCardIndexes = () => {
    // TODO Create a list of cards based on the modifier number

    let cardIndexList = []
    for (let i = 0; i < difModifier/2; i++) {
        cardIndexList.push(i)
        cardIndexList.push(i)
    }
    console.log(cardIndexList);

// TODO Randomize list

    shuffled = [];

    shuffled = cardIndexList // Value to use later IMPORTANT
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    console.log(shuffled)

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
                // When a card if face up and clicked
                if (card.classList[a].toString() === "front") {
                    card.classList.remove("front");
                    card.classList.add("back")
                    card.setAttribute('src', './assets/images/back.png');
                    // When a card is face down and clicked
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
  CleanBoard();
  CreateCardIndexes();
  PopulateCards();
};

// TODO Each card default to the back even though it has a class linked to its secret value
// TODO if card is visible => event listener that makes it clickable
// TODO On click, card has visible class added and clicked counter +1
// TODO On second click, other card visible => Compare => counter +1
// TODO Check if card share secret class
// TODO Card invisible => unclickable