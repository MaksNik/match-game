let skirt;
let difficulty;
let game;
let deck;
let resultDeck;
let startButton = document.querySelector('#start');
let gameField = document.querySelector('#game-field');
let flippedCards = [];

bindMenuEvents();

startButton.addEventListener("click", startGame);
gameField.addEventListener("click", evt => {
    game.flip(evt, game.skirtCard, flippedCards);
});



function startGame() {
    game = new Game(difficulty, skirt);
    game.hideRules();
    game.disableMenuButtons();
    deck = game.createDeck(cards, game.difficultyGame);
    resultDeck = game.shuffle(deck);
    game.generate(resultDeck, game.skirtCard);
    game.timer();
}




function bindMenuEvents() {
    let skirtMenuNode = document.querySelector("#skirt-button");
    let difficultyMenuNode = document.querySelector("#difficulty-button");
    let newGameNode = document.querySelector("#new-game-button");
    let skirtNode = document.querySelector("#skirt");
    let difficultyNode = document.querySelector("#difficulty");

    skirtMenuNode.addEventListener("click", evt => {
        show(evt.target);
    });

    difficultyMenuNode.addEventListener("click", evt => {
        show(evt.target);
    });

    newGameNode.addEventListener("click", newGame);

    skirtNode.addEventListener("click", evt => {
        setSkirtCard(evt.target);
    });

    difficultyNode.addEventListener("click", evt => {
        setDifficultyGame(evt.target);
    });

    function show(node) {
        if (node.nextElementSibling.classList.contains("active")) {
            node.nextElementSibling.classList.toggle("active");
            return;
        }
        else {
            node.nextElementSibling.classList.add('active');
        }
    }

    function newGame() {
        let node1 = document.querySelector("#intro");
        let node2 = document.querySelector("#congrats")
        if (node1.classList.contains("hide")) {
            if (node2.classList.contains("show")) {
                window.location.reload();
                return;
            }
            let answer = confirm("Are you sure?")
            if (answer) {
                window.location.reload();
            }
            else return;
        }
        
    }

    function setSkirtCard(node) {
        if (node.classList.contains("skirt-1")) {
            skirt = "skirt-1";
        }
        if (node.classList.contains("skirt-2")) {
            skirt = "skirt-2";
        }
        if (node.classList.contains("skirt-3")) {
            skirt = "skirt-3";
        }
        node.parentElement.parentElement.classList.toggle("active");
        if (isChecked()) {
            activateStartButton();
        }
        document.querySelector("#skirt-preview").classList.add(skirt);
        return;
    }

    function setDifficultyGame(node) {
        if (node.classList.contains("low")) {
            difficulty = 8;
        }
        if (node.classList.contains("medium")) {
            difficulty = 16;
        }
        if (node.classList.contains("high")) {
            difficulty = 24;
        }
        node.parentElement.parentElement.classList.toggle("active");
        if (isChecked()) {
            activateStartButton();
        }
        document.querySelector("#diff-preview").innerHTML = node.innerText;
        return;
    }

    function isChecked() {
        if (skirt && difficulty) {
            return true;
        }
        else return false;
    }

    function activateStartButton() {
        let start = document.querySelector("#start");
        start.classList.add('enabled');
        start.removeAttribute('disabled');
    }
}





