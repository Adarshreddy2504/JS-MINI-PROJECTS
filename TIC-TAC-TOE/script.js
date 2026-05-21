let boxes= document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGame=document.querySelector("#new-game");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO=true;
let count=0;
//Wining patterns
const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

//start
boxes.forEach((box) => {
    box.addEventListener("click",()=>{
        if(turnO){     // 'O' Turn
            box.classList.add("O");
            box.innerText="O";
            turnO=false;
            count++;

        }
        else{
            box.classList.add("X");
            box.innerText="X";  // 'X' Turn
            turnO=true;
            count++;
        }
        box.disabled=true;

        checkwinner();    // Checking For Winning Pattren
    });
});


//Disabling the box after clicked
const disable=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

//enabling the boxes after new game started
const enable=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.classList.remove("O")
        box.classList.remove("X")
    }

}

//showing the winner
const showWinner =(winner)=>{
    msg.innerText=`Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disable();
}

//Draw condition
const draw =()=>{
    msg.textContent="Draw";
    msgContainer.classList.remove("hide");
    disable();
}

//checking the winner by winning pattern
const checkwinner=()=>{
    for(let pattern of winPattern){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;
        if(pos1 != "" && pos2 != "" && pos3 != ""){
            if(pos1===pos2 && pos2===pos3){
                showWinner(pos1);
                return;
            }
        }
    }
    if(count===9){
        draw();
    }
}

//reseting the game
const resetGame =()=>{
    turnO=true;
    count=0;
    enable();
    msgContainer.classList.add("hide");
}

newGame.addEventListener("click",resetGame)
resetBtn.addEventListener("click",resetGame)