let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#you-scr");
const compScorePara = document.querySelector("#comp-scr");

const genCompChoice = () => {
    const options = ["rock" , "paper" , "scissor"];
    const randIdx = Math.floor(Math.random() * 3 );   
    return options[randIdx];
}

const drawGame = () => {
    console.log("game was draw");
         msg.innerText = "game was draw .play again.";
         msg.style.backgroundColor = "darkslateblue";
}

const showWinnner = (userwin , userChoice ,compChoice) => {
    if(userwin) {
        console.log("you win!");
        msg.innerText = `you win!  your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
        userScore++;
        userScorePara.innerText = userScore;
    } else {
        console.log("you lose");
        msg.innerText = `you lose ${compChoice} beats your ${userChoice}`;
        msg.style.backgroundColor = "red";
        compScore++;
        compScorePara.innerText = compScore;
    }
}

 const playGame = (userChoice) => {
  const compChoice = genCompChoice();
  if (userChoice === compChoice){
    drawGame();
  } else {
    let userWin = true;
    if ( userChoice === "rock") {
        userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
        userWin = compChoice === "scssior" ? false : true;
    } else {
        userWin = compChoice === "rock" ? false : true;
    }
    showWinnner(userWin , userChoice , compChoice);
  }
}

choices.forEach((choice) => {
    choice.addEventListener("click" , () =>{
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});