let questions = [
    { q: "What is the parallel dimension called?", o: ["Dark World","Upside Down","Void","Mind Zone"], a: 1 },
    { q: "Eleven's favorite food?", o: ["Pizza","Burger","Waffles","Cake"], a: 2 },
    { q: "Which town is Stranger Things set in?", o: ["Hawkins","Riverdale","Sunnydale","Hill Valley"], a: 0 },
    { q: "Who is possessed by the Mind Flayer?", o: ["Mike","Will","Lucas","Dustin"], a: 1 },
    { q: "Main monster of Season 1?", o: ["Vecna","Mind Flayer","Demogorgon","Spider"], a: 2 },
    { q: "Max escapes Vecna using which song?", o: ["Africa","Thriller","Running Up That Hill","Take On Me"], a: 2 },
    { q: "What is Eleven's real name?", o: ["Jane Hopper", "Jane Ives", "Jane Wheeler", "Jane Byers"], a: 1 },
    { q: "Who is the police chief of Hawkins?", o: ["Bob Newby", "Jim Hopper", "Ted Wheeler", "Billy Hargrove"], a: 1 },
    { q: "Which character works at Scoops Ahoy?", o: ["Steve", "Jonathan", "Eddie", "Lucas"], a: 0 },
    { q: "Who is Dustin’s girlfriend from camp?", o: ["Max", "Robin", "Suzie", "Nancy"], a: 2 },
    { q: "Which game do the kids love to play?", o: ["Chess", "Dungeons & Dragons", "Monopoly", "Scrabble"], a: 1 },
    { q: "What mall appears in Season 3?", o: ["Hawkins Mall", "Starcourt Mall", "Central Mall", "Mega Mall"], a: 1 },
    { q: "Who is Max’s stepbrother?", o: ["Steve", "Billy", "Jonathan", "Eddie"], a: 1 },
    { q: "What number is tattooed on Eleven’s arm?", o: ["010", "011", "012", "013"], a: 1 },
    { q: "What year does Season 1 take place?", o: ["1981", "1983", "1985", "1987"], a: 1 },
    { q: ""}
];

/* Shuffle */
questions.sort(() => Math.random() - 0.5);

let i = 0, score = 0, time = 20, timerInterval;

/* Elements */
const introSound = document.getElementById("introSound");
const bgMusic = document.getElementById("bgMusic");
const clickSound = document.getElementById("clickSound");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");

const app = document.getElementById("app");
const startScreen = document.getElementById("startScreen");
const quiz = document.getElementById("quiz");
const result = document.getElementById("result");
const question = document.getElementById("question");
const options = document.querySelectorAll(".option");
const timerEl = document.getElementById("timer");
const progressFill = document.getElementById("progressFill");
const nextBtn = document.getElementById("nextBtn");
const finalScore = document.getElementById("finalScore");
const gradeEl = document.getElementById("grade");

/* Intro */
window.onload = () => {
    introSound.play();
    setTimeout(() => app.classList.remove("hidden"), 3500);
};

/* Start */
document.getElementById("startBtn").onclick = () => {
    clickSound.play();
    bgMusic.play();
    startScreen.classList.add("hidden");
    quiz.classList.remove("hidden");
    loadQuestion();
};

function loadQuestion() {
    resetTimer();
    question.textContent = questions[i].q;
    options.forEach((btn, idx) => {
    btn.textContent = questions[i].o[idx];
    btn.disabled = false;
    btn.style.background = "transparent";
    });
  progressFill.style.width = ((i) / questions.length) * 100 + "%";
    nextBtn.style.display = "none";
}

function resetTimer() {
    clearInterval(timerInterval);
    time = 20;
    timerEl.textContent = time;
    timerInterval = setInterval(() => {
    time--;
    timerEl.textContent = time;
    if (time === 0) {
        clearInterval(timerInterval);
        wrongSound.play();
        nextBtn.style.display = "inline-block";
        options.forEach(btn => btn.disabled = true);
    }
    }, 1000);
}

function checkAnswer(choice) {
    clearInterval(timerInterval);
    options.forEach(btn => btn.disabled = true);
    if (choice === questions[i].a) {
    score++;
    correctSound.play();
    options[choice].style.background = "green";
    } else {
    wrongSound.play();
    options[choice].style.background = "darkred";
    options[questions[i].a].style.background = "green";
    }
    nextBtn.style.display = "inline-block";
}

function nextQuestion() {
    clickSound.play();
    i++;
    if (i < questions.length) {
    loadQuestion();
    } else {
    showResult();
    }
}

function showResult() {
    quiz.classList.add("hidden");
    result.classList.remove("hidden");
    finalScore.textContent = `You scored ${score} out of ${questions.length}`;

  let percent = (score / questions.length) * 100;
    if (percent >= 80) gradeEl.textContent = "🔥 Excellent!";
    else if (percent >= 50) gradeEl.textContent = "🙂 Good Job!";
    else gradeEl.textContent = "😈 Try Again!";
}