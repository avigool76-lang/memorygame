function startGame() {

    document.getElementById("startScreen").style.display = "none";

}
const cardsData = [

/* 🖼️ זוג 1 */
{
    id: 1,
    image: "images/pic1.jpg",
    text: "זוג הנוכלים"
},
{
    id: 1,
    image: "images/pic1.jpg",
    text: "זוג הנוכלים"
},

/* 🖼️ זוג 2 */
{
    id: 2,
    image: "images/pic2.jpg",
    text: "אנחנו זוג היפיפות"
},
{
    id: 2,
    image: "images/pic2.jpg",
    text: "תכף מתחתנות"
},

/* 🖼️ זוג 3 */
{
    id: 3,
    image: "images/pic3.jpg",
    text: "מרבה ליאור"
},
{
    id: 3,
    image: "images/pic3.jpg",
    text: "מרבה אור"
},

/* 🖼️ זוג 4 */
{
    id: 4,
    image: "images/pic4.jpg",
    text: "ליאורז שלי"
},
{
    id: 4,
    image: "images/pic4.jpg",
    text: "מלכת היופי והחן "
}

];


/* =========================================
   ערבוב הקלפים
   ========================================= */

cardsData.sort(() => Math.random() - 0.5);


/* =========================================
   משתנים של המשחק
   ========================================= */

const board = document.getElementById("board");
const movesEl = document.getElementById("moves");
const timerEl = document.getElementById("timer");
const winnerEl = document.getElementById("winner");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let time = 0;
let timerStarted = false;


/* =========================================
   ⏱️ טיימר
   ========================================= */

function startTimer() {

    setInterval(() => {

        time++;
        timerEl.innerText = time;

    }, 1000);

}


/* =========================================
   יצירת קלפים
   ========================================= */

function createBoard() {

    cardsData.forEach(data => {

        const card = document.createElement("div");
        card.classList.add("card");

        /* נשמור ID לבדיקה */
        card.dataset.id = data.id;

        /* =========================================
           מבנה הקלף (קדימה + אחורה)
           ========================================= */

        card.innerHTML = `
        
            <div class="back">❓</div>

            <div class="front">

                <img src="${data.image}" />

                <p>${data.text}</p>

            </div>
        
        `;

        /* לחיצה על קלף */
        card.addEventListener("click", () => {

            if (lockBoard) return;
            if (card.classList.contains("flip")) return;

            /* התחלת טיימר בלחיצה ראשונה */
            if (!timerStarted) {
                startTimer();
                timerStarted = true;
            }

            flipCard(card);

        });

        board.appendChild(card);

    });

}


/* =========================================
   היפוך קלף
   ========================================= */

function flipCard(card) {

    card.classList.add("flip");

    if (!firstCard) {

        firstCard = card;
        return;

    }

    secondCard = card;

    moves++;
    movesEl.innerText = moves;

    checkMatch();

}


/* =========================================
   בדיקת התאמה
   ========================================= */

function checkMatch() {

    const isMatch = firstCard.dataset.id === secondCard.dataset.id;

    if (isMatch) {

        disableCards();

    } else {

        unflipCards();

    }

}


/* =========================================
   אם יש התאמה
   ========================================= */

function disableCards() {

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetTurn();

    checkWin();

}


/* =========================================
   אם אין התאמה
   ========================================= */

function unflipCards() {

    lockBoard = true;

    setTimeout(() => {

        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetTurn();

    }, 900);

}


/* =========================================
   איפוס תור
   ========================================= */

function resetTurn() {

    [firstCard, secondCard] = [null, null];
    lockBoard = false;

}


/* =========================================
   ניצחון
   ========================================= */

function checkWin() {

    const matchedCards = document.querySelectorAll(".card.flip");

    if (matchedCards.length === cardsData.length) {

        setTimeout(() => {

            winnerEl.classList.remove("hidden");

        }, 500);

    }

}


/* =========================================
   משחק מחדש
   ========================================= */

function restartGame() {

    location.reload();

}


/* =========================================
   הפעלה ראשונה
   ========================================= */

createBoard();