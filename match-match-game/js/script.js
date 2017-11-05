class Game {
    constructor(difficulty, skirt) {
        this.difficultyGame = difficulty;
        this.skirtCard = skirt;
        this.count = 0;
    }

    createDeck(arr, diff) {
        let deck = [];
        let temp = [];
        let size = diff / 2;
        for (let i = 0; i < size; i++) {
            deck.push(new Card(i, arr[i].src, arr[i].value));
        }
        for (let i = 0; i < size; i++) {
            temp.push(new Card((i + size), arr[i].src, arr[i].value));
        }
        return deck.concat(temp);
    }

    shuffle(array) {
        var counter = array.length, temp, index;

        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            counter--;
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    static createCard(obj, cls) {
        let node = document.createElement('div');
        node.className = "card";
        node.id = "card" + obj.id;
        node.setAttribute("value", obj.value);
        node.innerHTML = `<div class="flipper"><div class="front ${cls}"></div><div class="back"><img src="${obj.src}"/></div></div>`;
        return node;
    }

    generate(arr, cls) {
        for (let i in arr) {
            document.querySelector('#game-field').appendChild(Game.createCard(arr[i], cls));
        }
    }

    hideRules() {
        document.querySelector("#intro").classList.add("hide");
    }

    flip(e, skirt, arr) {
        if (arr.length < 2) {
            if (e.target.classList.contains(skirt)) {
                let elem = e.target.parentElement;
                let obj = {
                    objId: elem.parentElement.id,
                    objValue: elem.parentElement.getAttribute('value')
                }
                arr.push(obj);
                elem.classList.toggle("flip");
                this.count++;
                if (this.count === 2) {
                    setTimeout(() => { this.match(arr) },1000);
                    return;
                }
            }
        }
    }

    match(arr, count) {
        if (arr[0].objValue === arr[1].objValue) {
            for (let i in arr) {
                document.getElementById(arr[i].objId).classList.add('unvisible');
                this.count--;
            }
        }
        else {
            for (let i in arr) {
                document.getElementById(arr[i].objId).firstChild.classList.toggle('flip');                
                this.count--;
            }
        }
        arr.shift();
        arr.shift();
    }
}

class Card {
    constructor(id, src, value) {
        this.id = ++id;
        this.src = src;
        this.value = value;
    }
}

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
    deck = game.createDeck(cards, game.difficultyGame);
    resultDeck = game.shuffle(deck);
    game.generate(resultDeck, game.skirtCard);
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

    newGameNode.addEventListener("click", reload);

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

    function reload() {
        window.location.reload();
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

let cards = [
    {
        src: "img/face/facebook.png",
        value: 1
    },
    {
        src: "img/face/twitter.png",
        value: 2
    },
    {
        src: "img/face/rss.png",
        value: 3
    },
    {
        src: "img/face/instagram.png",
        value: 4
    },
    {
        src: "img/face/vimeo.png",
        value: 5
    },
    {
        src: "img/face/ok.png",
        value: 6
    },
    {
        src: "img/face/be.png",
        value: 7
    },
    {
        src: "img/face/wat.png",
        value: 8
    },
    {
        src: "img/face/digg.png",
        value: 9
    },
    {
        src: "img/face/pininterest.png",
        value: 10
    },
    {
        src: "img/face/wat2.png",
        value: 11
    },
    {
        src: "img/face/google.png",
        value: 12
    },
];



