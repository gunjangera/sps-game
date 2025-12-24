let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#you-scr");
const compScorePara = document.querySelector("#comp-scr");

// Add click animation to choices
const animateChoice = (choiceElement) => {
    choiceElement.style.transform = "scale(0.9)";
    setTimeout(() => {
        choiceElement.style.transform = "";
    }, 200);
};

// Animate score update
const animateScore = (element) => {
    element.style.transform = "scale(1.5)";
    element.style.color = "#ffd700";
    setTimeout(() => {
        element.style.transform = "scale(1)";
        element.style.color = "";
    }, 300);
};

const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
}

const drawGame = () => {
    msg.innerText = `Game was a draw! Play again.`;
    msg.className = "draw";
    setTimeout(() => {
        msg.className = "";
    }, 2000);
}

const showWinner = (userWin, userChoice, compChoice) => {
    // Remove previous classes
    msg.classList.remove("win", "lose", "draw");
    
    if (userWin) {
        msg.innerText = `🎉 You Win! Your ${userChoice.toUpperCase()} beats ${compChoice.toUpperCase()}`;
        msg.classList.add("win");
        userScore++;
        userScorePara.innerText = userScore;
        animateScore(userScorePara);
        
        // Add celebration effect
        createConfetti();
    } else {
        msg.innerText = `😔 You Lose! ${compChoice.toUpperCase()} beats your ${userChoice.toUpperCase()}`;
        msg.classList.add("lose");
        compScore++;
        compScorePara.innerText = compScore;
        animateScore(compScorePara);
    }
}

const playGame = (userChoice) => {
    // Disable choices during animation
    choices.forEach(choice => {
        choice.style.pointerEvents = "none";
        choice.style.opacity = "0.5";
    });
    
    // Show "thinking" message
    msg.innerText = "🤔 Computer is thinking...";
    msg.classList.remove("win", "lose", "draw");
    
    setTimeout(() => {
        const compChoice = genCompChoice();
        
        if (userChoice === compChoice) {
            drawGame();
        } else {
            let userWin = true;
            if (userChoice === "rock") {
                userWin = compChoice === "paper" ? false : true;
            } else if (userChoice === "paper") {
                userWin = compChoice === "scissor" ? false : true;
            } else {
                userWin = compChoice === "rock" ? false : true;
            }
            showWinner(userWin, userChoice, compChoice);
        }
        
        // Re-enable choices
        setTimeout(() => {
            choices.forEach(choice => {
                choice.style.pointerEvents = "auto";
                choice.style.opacity = "1";
            });
        }, 500);
    }, 1000);
}

// Confetti effect for wins
const createConfetti = () => {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a8edea', '#ff9a9e', '#a1c4fd'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.boxShadow = '0 0 10px currentColor';
        
        document.body.appendChild(confetti);
        
        const animationDuration = Math.random() * 2 + 2;
        const animationDelay = Math.random() * 0.5;
        const horizontalMovement = (Math.random() - 0.5) * 200;
        
        confetti.style.animation = `confettiFall ${animationDuration}s ${animationDelay}s ease-out forwards`;
        confetti.style.setProperty('--horizontal', `${horizontalMovement}px`);
        
        setTimeout(() => {
            confetti.remove();
        }, (animationDuration + animationDelay) * 1000);
    }
}

// Add confetti animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) translateX(var(--horizontal)) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add click event listeners with animations
choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        animateChoice(choice.querySelector(".choice-inner"));
        playGame(userChoice);
    });
    
    // Add ripple effect on click
    choice.addEventListener("click", function(e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.style.position = "absolute";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255, 255, 255, 0.5)";
        ripple.style.transform = "scale(0)";
        ripple.style.animation = "ripple 0.6s ease-out";
        ripple.style.pointerEvents = "none";
        ripple.style.zIndex = "1000";
        
        this.style.position = "relative";
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);