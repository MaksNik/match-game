class Game {
    constructor(difficulty, skirt) {
        this.difficultyGame = difficulty;
        this.skirtCard = skirt;
        this.isGameStarted = false;
        this.count = 0;
        this.removedCardsCount = 0;
    }

    timer() {
        let timer = document.querySelector("#timer");
        let start = new Date();
        let go = startTimer.bind(this);
        let interval = setInterval(go, 100);

        function startTimer() {
            let currTime = new Date() - start;
            let sec = Math.abs(Math.floor(currTime / 1000) % 60);
            let min = Math.abs(Math.floor(currTime / 1000 / 60) % 60);
            let hours = Math.abs(Math.floor(currTime / 1000 / 60 / 60) % 24);
            if (sec.toString().length === 1) {
                sec = '0' + sec;
            }
            if (min.toString().length === 1) {
                min = '0' + min;
            }
            if (hours.toString().length === 1) {
                hours = '0' + hours;
            }
            timer.innerHTML = hours + ':' + min + ':' + sec;
            if (!this.isGameStarted) {
                clearInterval(interval);
            }
        }

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
        let counter = array.length, temp, index;

        while (counter > 0) {
            index = Math.floor(Math.random() * counter);
            counter--;
            temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    generate(arr, cls) {
        for (let i in arr) {
            document.querySelector('#game-field').appendChild(arr[i].createCard(cls));
        }
        this.isGameStarted = true;
    }

    disableMenuButtons() {
        document.querySelector("#skirt-button").setAttribute("disabled", "disabled");
        document.querySelector("#difficulty-button").setAttribute("disabled", "disabled");
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
                    setTimeout(() => { this.match(arr) }, 1000);
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
                this.removedCardsCount++;
                if (this.removedCardsCount === this.difficultyGame) {
                    this.congrats();
                    this.isGameStarted = false;
                }
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

    congrats() {
        document.querySelector('#game-field').remove();
        document.querySelector('#congrats').classList.add('show');
    }
}