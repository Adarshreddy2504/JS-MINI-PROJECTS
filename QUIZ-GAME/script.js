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
    },
    {
        question:"Who invented JavaScript?",
        answers:[
            {text:"Brendan Eich",correct:true},
            {text:"James Gosling",correct:false},
            {text:"Guido van Rossum",correct:false},
            {text:"Dennis Ritchie",correct:false},
        ]
    },
    {
        question:"Which HTML tag is used to insert an image?",
        answers:[
            {text:"<image>",correct:false},
            {text:"<img>",correct:true},
            {text:"<src>",correct:false},
            {text:"<picture>",correct:false},
        ]
    },
    {
        question:"Which language is used for styling web pages?",
        answers:[
            {text:"HTML",correct:false},
            {text:"Python",correct:false},
            {text:"CSS",correct:true},
            {text:"Java",correct:false},
        ]
    },
    {
        question:"Which company developed Java?",
        answers:[
            {text:"Microsoft",correct:false},
            {text:"Sun Microsystems",correct:true},
            {text:"Google",correct:false},
            {text:"IBM",correct:false},
        ]
    },
    {
        question:"Which planet is known as the Red Planet?",
        answers:[
            {text:"Mars",correct:true},
            {text:"Jupiter",correct:false},
            {text:"Saturn",correct:false},
            {text:"Venus",correct:false},
        ]
    },
    {
        question:"Which is the largest mammal?",
        answers:[
            {text:"Elephant",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Giraffe",correct:false},
            {text:"Shark",correct:false},
        ]
    },
    {
        question:"How many continents are there?",
        answers:[
            {text:"5",correct:false},
            {text:"6",correct:false},
            {text:"7",correct:true},
            {text:"8",correct:false},
        ]
    },
    {
        question:"Which gas do plants absorb?",
        answers:[
            {text:"Oxygen",correct:false},
            {text:"Nitrogen",correct:false},
            {text:"Carbon Dioxide",correct:true},
            {text:"Hydrogen",correct:false},
        ]
    },
    {
        question:"Which is the fastest land animal?",
        answers:[
            {text:"Tiger",correct:false},
            {text:"Horse",correct:false},
            {text:"Cheetah",correct:true},
            {text:"Lion",correct:false},
        ]
    },
    {
        question:"Who wrote Romeo and Juliet?",
        answers:[
            {text:"William Shakespeare",correct:true},
            {text:"Charles Dickens",correct:false},
            {text:"Leo Tolstoy",correct:false},
            {text:"Mark Twain",correct:false},
        ]
    },
    {
        question:"Which is the largest desert in the world?",
        answers:[
            {text:"Sahara",correct:false},
            {text:"Antarctica",correct:true},
            {text:"Arabian",correct:false},
            {text:"Gobi",correct:false},
        ]
    },
    {
        question:"Which programming language runs in the browser?",
        answers:[
            {text:"Python",correct:false},
            {text:"Java",correct:false},
            {text:"JavaScript",correct:true},
            {text:"C++",correct:false},
        ]
    },
    {
        question:"What does CSS stand for?",
        answers:[
            {text:"Creative Style Sheets",correct:false},
            {text:"Computer Style Sheets",correct:false},
            {text:"Cascading Style Sheets",correct:true},
            {text:"Colorful Style Sheets",correct:false},
        ]
    },
    {
        question:"Which HTML element creates a hyperlink?",
        answers:[
            {text:"<link>",correct:false},
            {text:"<a>",correct:true},
            {text:"<href>",correct:false},
            {text:"<url>",correct:false},
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
