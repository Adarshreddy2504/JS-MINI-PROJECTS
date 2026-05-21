//DOM ELEMENTS
const startScreen=document.getElementById("start-screen");
const quizScreen=document.getElementById("quiz-screen");
const resultScreen=document.getElementById("result-screen");
const startButton=document.getElementById("start-btn");
const restartButton=document.getElementById("restart-btn");
const progressBar=document.getElementById("progress");
const questiontext=document.getElementById("question-text");
const currentQuestion=document.getElementById("current-question");
const totalQuestions=document.getElementById("total-question");
const answersContainer=document.getElementById("answers-container");
const scorespan=document.getElementById("score");
const totalScore=document.getElementById("final-score");
const maxScore=document.getElementById("max-score");
const resultMsg=document.getElementById("result-message");


//QUESTION ARRAY
const quizQuestions=[
    {//question 1
        question:"What is the largest country in the world by area?",
        answers:[
            {text:"USA" , correct:false},
            {text:"China" , correct:false},
            {text:"Russia" , correct:true},
            {text:"Canada" , correct:false},
        ]
    },
    {//question 2
        question:"Which is the smallest ocean in the world?",
        answers:[
            {text:"Indian" , correct:false},
            {text:"Atlantic" , correct:false},
            {text:"Southern" , correct:false},
            {text:"Arctic" , correct:true},
        ]
    },
    {//question 3
        question:"What is the capital of Japan?",
        answers:[
            {text:"Tokyo" , correct:true},
            {text:"Osaka" , correct:false},
            {text:"Kyoto" , correct:false},
            {text:"Hiroshima" , correct:false},
        ]
    },
    {//question 4
        question:"Which city is known as the Silicon Valley of India?",
        answers:[
            {text:"Mumbai" , correct:false},
            {text: "Bengaluru" , correct:true},
            {text: "Hyderabad" , correct:false},
            {text:"Pune" , correct:false},
        ]
    },
    {//question 5
        question:"Which country is known as the Land of the Rising Sun?",
        answers:[
            {text:"China" , correct:false},
            {text: "Japan" , correct:true},
            {text: "South Korea" , correct:false},
            {text:"Thailand", correct:false},
        ]
    },
    {//question 6
        question:"Which is the longest river in the world?",
        answers:[
            {text:"Amazon" , correct:false},
            {text: "Yangtze" , correct:false},
            {text: "Nile" , correct:true},
            {text:"Mississippi" , correct:false},
        ]
    }
];

let currentQuestionIndex=0;
let score=0;
let answerDisabled=false;

totalQuestions.textContent=quizQuestions.length;
maxScore.textContent=quizQuestions.length;

//BUTTONS
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click",restartQuiz);


//QUiz start
function startQuiz(){
    console.log("quiz started");

    currentQuestionIndex=0;
    score=0;
    scorespan.textContent=0;

    startScreen.classList.remove("active");   //removing active class from startscreen
    quizScreen.classList.add("active")        //adding active class to quiz screen
    showQuestion();
}

function showQuestion(){
    answerDisabled=false;
    const currentQuestion=quizQuestions[currentQuestionIndex];
    document.getElementById("current-question").textContent=currentQuestionIndex+1;
    const progressPercent=(currentQuestionIndex/quizQuestions.length)*100;
    progressBar.style.width=progressPercent+"%";
    questiontext.textContent=currentQuestion.question;

    answersContainer.innerHTML="";
    currentQuestion.answers.forEach(answer =>{               
        const button=document.createElement("button")       //adding answer button 
        button.textContent=answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct=answer.correct;
        button.addEventListener("click",selectAnswer);
        answersContainer.appendChild(button);

    })

function selectAnswer(event){
    //optimization check
    if(answerDisabled) return

    answerDisabled=true
    const selectedButton=event.target;
    const isCorrect=selectedButton.dataset.correct === "true"   //checking if selected button is true

    Array.from(answersContainer.children).forEach((button)=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        else if(button === selectedButton){
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score++;
        scorespan.textContent=score
    }

    setTimeout(() =>{
        currentQuestionIndex++;

        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        }
        else{
            showResults()
        }
    },1000)
}
function showResults(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    totalScore.textContent=score;
    const percentage=(score/quizQuestions.length)*100

    if(percentage===100){
        resultMsg.textContent="Perfect! You're a Genius!"
    }
    else if(percentage >=80){
        resultMsg.textContent="Great Job! You know Your stuff!"
    }
    else if(percentage >=60){
        resultMsg.textContent="Great Effort! Keep Learning!"
    }
    else if(percentage >=40){
        resultMsg.textContent="Not Bad! Try again to Improve!"
    }
    else{
        resultMsg.textContent="Keep Studying! You'll get Better!"
    }
}

}
function restartQuiz(){
    resultScreen.classList.remove('active')
    startQuiz();
}
