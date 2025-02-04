alert("Play Game")
let userScore = 0;
let computerScore = 0;
const userScorePara = document.querySelector("#user-score")
const computerScorePara = document.querySelector("#comp-score")
const msg = document.querySelector("#msg");

const genComputerChoice = () => {
    const options = ["rock", "pepar", "Scissors"];
    const rndIdx = Math.floor(Math.random()*3);
    return options[rndIdx];
};
const drawGame = ()=>
{
    console.log("Game Was draw.");
    msg.innerText = "Match Draw!! Play Again"
    msg.style.backgroundColor = "grey";
}

const showWinner= (userWin ,userChoice,computerChoice) =>
{
    if(userWin)
    {
        userScore++;
        userScorePara.innerText = userScore;
        console.log("You win!.");
        msg.innerText = `You Win! Your ${userChoice} beats ${computerChoice}`
        msg.style.backgroundColor = "green";
        }
    else
    {
        console.log("You lose.");
        msg.innerText = `You Lost... ${computerChoice} beats Your ${userChoice}`
        msg.style.backgroundColor = "red";
        computerScore++;
        computerScorePara.innerText = computerScore;
    }
}

const playGame = (userChoice) => {
    console.log("User Choice:", userChoice);
    const computerChoice = genComputerChoice();
    console.log("Computer choice:",computerChoice);
    // generate computer choice --> Modular

    if(userChoice===computerChoice)
    {
        drawGame();
    }
    else
    {
        let userWin = true;
        if(userChoice=== "rock")
        {
            // pepar Scissors
            userwin = computerChoice ? false: true;
        }
        else if(userChoice==="pepar")
        {
            // rock Scissors
            userWin = computerChoice === "Scissors" ? false :true;
        }
        else{
            // rock pepar
            userWin = computerChoice === "rock" ? false :true;
        };
        showWinner(userWin ,userChoice,computerChoice);
    };
};

const choices = document.querySelectorAll(".choice");
choices.forEach((choice) => {
    console.log(choice);
    choice.addEventListener("click", () => {
        userChoice = choice.getAttribute("id")
        playGame(userChoice)
    });
});

