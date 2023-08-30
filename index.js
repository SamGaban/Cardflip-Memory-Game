// TODO difficulty chooser

let difModifier = 12;


// Audio files

const winSound = new Audio('./assets/sound/win.mp3')
winSound.volume = 0.05;
const loseSound = new Audio('./assets/sound/lose.mp3');
loseSound.volume = 0.03;
const popSound = new Audio('./assets/sound/pop.mp3');
popSound.volume = 0.03;

// Timer Functionalities

let then = new Date().getTime();

setInterval(() => {
    let now = new Date().getTime();
    let milliseconds = (now - then);
    let milliToDisplay = (milli) => {
        let minutes = Math.floor(milli/60000);
        let seconds = ((milli % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
    let timerDiv = document.querySelector('#timer');
    timerDiv.textContent = milliToDisplay(milliseconds);
},1000);

// Score Text Setter

let easyBest = 0;
let normalBest = 0;
let hardBest = 0;
let prefixSentence = "";


const ScoreTextSet = (num) => {
    let now = new Date().getTime();
    let time = now - then;
    let easy = document.querySelector('#easyScore');
    let normal = document.querySelector('#normalScore');
    let hard = document.querySelector('#hardScore');
    let timeDivi = document.querySelector('#timer');
    switch (parseInt(num)) {
        case 12:
            if (easyBest === 0) { // First score in this category
                easyBest = time;
                easy.textContent = `Best Easy Score: ${timeDivi.textContent} with ${tries} lives left !`;
                break;
            } else if (easyBest > time) { // New best score
                easyBest = time;
                easy.textContent = `Best Easy Score: ${timeDivi.textContent} with ${tries} lives left !`;
                prefixSentence = "New best easy score !\n";
                break;
            } else {
                break;
            }

        case 18:
            if (normalBest === 0) { // First score in this category
                normalBest = time;
                normal.textContent = `Best Normal Score: ${timeDivi.textContent} with ${tries} lives left !}`;
                break;
            } else if (normalBest > time) { // New best score
                normalBest = time;
                normal.textContent = `Best Easy Score: ${timeDivi.textContent} with ${tries} lives left !`;
                prefixSentence = "New best normal score !\n";
                break;
            } else {
                break;
            }
        case 24:
            if (hardBest === 0) { // First score in this category
                hardBest = time;
                hard.textContent = `Best Normal Score: ${timeDivi.textContent} with ${tries} lives left !}`;
                break;
            } else if (hardBest > time) { // New best score
                hardBest = time;
                hard.textContent = `Best Easy Score: ${timeDivi.textContent} with ${tries} lives left !`;
                prefixSentence = "New best hard score !\n";
                break;
            } else {
                break;
            }
    }
};


// Defining the three difficulty modifier radio buttons

let radioButtons = document.querySelectorAll('#question>input');

let difficulty = "Easy";

// MAKING THE RADIO BUTTONS WORK
for (let i=0; i < 3; i++) {
    let item = radioButtons[i];
    item.onclick = () => {
        difModifier = item.value;
        switch (parseInt(difModifier)) {
            case 12:
                difficulty = "Easy";
                break
            case 18:
                difficulty = "Normal";
                break
            case 24:
                difficulty = "Hard";
                break
        }
        NewGame();
    }
}

let turned = 0;

let score = 0;

let tries = Math.floor(difModifier * 0.6);

let shuffled;


// Tries initialization
const TriesRefresh = () => {
    let triesDisplay = document.querySelector('#tries');
    triesDisplay.textContent = `Lives: ${tries}`;
};

TriesRefresh();



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

let cardsTurned = [];

// TODO Create a function that, when there's two cards turned, checks if they match, and if yes, keeps them upside

const CompareCards = () => {
    if (cardsTurned.length === 2) {
        let hider = document.querySelector("#hider-div");
        hider.classList.add('overlay') // Adding the hider overlay to prevent clicks
        setTimeout(() => { // Good match
            if (cardsTurned[0].src.toString().split()[0].split("").slice(-5)[0] === cardsTurned[1].src.toString().split()[0].split("").slice(-5)[0]) {
                score += 1;
                popSound.play();
                if (score === (difModifier / 2)) { // Win
                    let timeDiv = document.querySelector('#timer');
                    winSound.play();
                    ScoreTextSet(difModifier);
                    alert(`${prefixSentence}You won on ${difficulty} mode with ${tries} live(s) left !\nTime: ${timeDiv.textContent} !`);
                    NewGame();
                }
                cardsTurned = [];
                hider.classList.remove('overlay') // Removing hider overlay
            } else { // Wrong
                tries -= 1;
                if (tries === 0) { // Lose
                    loseSound.play();
                    alert(`You lost on ${difficulty} mode with a score of ${score} !`);
                    NewGame();
                    hider.classList.remove('overlay');
                }
                TriesRefresh();
                setTimeout(() => {
                    cardsTurned[0].classList.remove("front");
                    cardsTurned[0].classList.add("back")
                    cardsTurned[0].setAttribute('src', './assets/images/back.png');
                    cardsTurned[1].classList.remove("front");
                    cardsTurned[1].classList.add("back")
                    cardsTurned[1].setAttribute('src', './assets/images/back.png');
                    cardsTurned = [];
                    hider.classList.remove('overlay') // Removing hider overlay
                }, 1500)

            }
        }, 100)

    }
};

// TODO Card populate function

const PopulateCards = () => {
    let htmlDiv = document.querySelector("#flip-card-container");

    for (let i = 0; i < difModifier; i++) {

        let cardDiv = document.createElement('div');
        let card = document.createElement('img');
        cardDiv.classList.add('cardDiv')
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
                    console.log("Hey !")
                    // When a card is revealed
                } else if (card.classList[a].toString() === "back") {
                    turned += 1;
                    // TODO keep track of turned card
                    cardsTurned.push(card);
                    CompareCards();


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
    then = new Date().getTime();
    tries = Math.floor(difModifier * 0.6)
    score = 0;
    cardsTurned = [];
    turned = 0;
    CleanBoard();
    CreateCardIndexes();
    PopulateCards();
    TriesRefresh();
    prefixSentence = "";
};


// TODO Check if win
// TODO Check if lose