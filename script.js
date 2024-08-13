const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {Text: "Shark", correct: false},
            {Text: "Blue Whale", correct: true},
            {Text: "Elephant", correct: false},
            {Text: "Rat", correct: false},
        ]
    },
    {
        question: "What is the state language of Bangladesh?",
        answers: [
            {Text: "Bangla", correct: true},
            {Text: "English", correct: false},
            {Text: "Mandarin", correct: false},
            {Text: "Turkish", correct: false},
        ]
    },
    {
        question: "Which is the largest river in the world?",
        answers: [
            {Text: "Suez", correct: false},
            {Text: "Amudoria", correct: true},
            {Text: "Nile", correct: true},
            {Text: "Hoangho", correct: false},
        ]
    },
    {
        question: "Who is the president of USA?",
        answers: [
            {Text: "Kamala Haris", correct: false},
            {Text: "Donald Trump", correct: false},
            {Text: "Barak Obama", correct: false},
            {Text: "Joe Biden", correct: true},
        ]
    }
];
const questionElement = document.getElementById("question");
const anwerButtons = document.getElementById("anwer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML =  answer.Text;
        button.classList.add("btn");
        anwerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
    
}

function resetState(){
    nextButton.style.display = "none";
    while(anwerButtons.firstChild){
        anwerButtons.removeChild(anwerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(anwerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Yor scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }

}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

