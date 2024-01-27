// IANA'S FUNCTIONS
// Function to start the game and redirect to game.html
// function startGame() {
//     // Redirect to game.html
//     window.location.href = "game.html";
// }



const questions = [
    {
        number: 1,
        question:"1. What is the difference between assets and liabilities?",
        options: ["Assets are money owed, liabilities are owned assets.", "Assets are owned assets, liabilities are money owed.", "Assets and liabilities are the same thing.", "There is no difference between assets and liabilities."],
        rightAnswer: "Assets are owned assets, liabilities are money owed.",
        tip: "Remember, assets are things you own that hold value (like property or investments), while liabilities are debts or obligations you owe to others (like loans or mortgages).",
    },

    {
        number: 2,
        question:"2. What does the term 'Compound Interest' refer to?",
        options: ["Interest calculated only once.", "Interest calculated on the initial principal, plus the accumulated interest.", "Interest paid in advance.", "Interest calculated without any fees."],
        rightAnswer: "Interest calculated on the initial principal, plus the accumulated interest.",
        tip: "Think of compound interest as 'interest on interest'. It's the interest earned on the initial principal amount and also on the accumulated interest.",
        
    },
    {
        number: 3,
        question:"3. What is the purpose of a credit score?",
        options: ["To measure your ability to save money.", "To assess your ability to invest wisely.", "To evaluate your risk as a borrower.", "To determine your income stability."],
        rightAnswer: "To evaluate your risk as a borrower.",
        tip: "A credit score assesses your creditworthiness and reliability as a borrower based on your credit history, not your ability to save or invest.",
        
    },
    {
        number: 4,
        question:"4. What does a zero-based budgeting approach entail?",
        options: ["Spending without keeping track of expenses.", "Allocating every pound of income towards a specific expense or savings category.", "Having a budget surplus.", "Spending more than what is earned."],
        rightAnswer: "Allocating every pound of income towards a specific expense or savings category.",
        tip: "Zero-based budgeting means assigning every pound of income to an expense or savings category, leaving no money unallocated.",
        
    },
    {
        number: 5,
        question:"5. What does the '50/30/20 rule' refer to in budgeting?",
        options: ["A guideline for saving money.", "A budget allocation strategy: 50% needs, 30% wants, 20% savings.", "A way to manage investments.", "A rule for borrowing money."],
        rightAnswer: "A budget allocation strategy: 50% needs, 30% wants, 20% savings.",
        tip: "The 50/30/20 rule suggests allocating 50% of your income to needs (essential expenses), 30% to wants (non-essential expenses), and 20% to savings or debt repayment.",
        
    },
    {
        number: 6,
        question:"6. Why is it essential to track expenses in a budget?",
        options: ["To ensure overspending.", "To identify areas to save money.", "To spend more freely", "To increase debts.",],
        rightAnswer: "To identify areas to save money.",
        tip: "Tracking expenses helps identify spending habits, areas to cut back, and ensures better financial control and planning.",
        
    },
    {
        number: 7,
        question:"7. What is the difference between stocks and bonds?",
        options: ["Stocks represent ownership in a company, while bonds are loans to companies or governments.", "Stocks are more stable than bonds.", "Stocks have guaranteed returns, while bonds don't.", "Bonds represent ownership in a company, while stocks are loans to companies or governments."],
        rightAnswer: "Stocks represent ownership in a company, while bonds are loans to companies or governments.",
        tip: "Stocks represent ownership in a company, while bonds are debt securities where you lend money to an entity (like a company or government) in exchange for periodic interest payments.",
        
    },
    {
        number: 8, 
        question:"8. What is the concept of diversification in investment?",
        options: ["Investing only in one type of asset.", "Investing in multiple assets to spread risk.", "Investing without any strategy.", "Investing only in high-risk assets."],
        rightAnswer: "Investing in multiple assets to spread risk.",
        tip: "Diversification involves spreading investments across various asset classes to reduce overall risk; it's the idea of not putting all your eggs in one basket.",
        
    },
    {
        number: 9,
        question:"9. What does the term 'ROI' stand for in investments?",
        options: ["Return on Insurance.", "Return on Investment.", "Risk of Investment.", "Return on Interest."],
        rightAnswer: "Return on Investment.",
        tip: "ROI stands for Return on Investment, measuring the profitability of an investment relative to its cost.",
        
    },
    {
        number: 10,
        question:"10. What does 'buying low and selling high' refer to in the context of investing?",
        options: ["Buying and selling quickly.", "Buying assets at a low price and selling them at a higher price later.", "Buying expensive assets and selling them at a lower price.", "Buying and selling without any profit strategy."],
        rightAnswer: "Buying assets at a low price and selling them at a higher price later.",
        tip: "'Buy low, sell high' is a strategy where you aim to purchase assets when their price is low and sell them later when their value increases, aiming for profit.",
        
    },
]
let currentQuestionIndex = 0;

function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const messageContainer = document.getElementById("message-container");
    const tipContainer = document.getElementById("tip-container");

    const currentQuestion = questions[currentQuestionIndex];

    messageContainer.textContent = "";

    while (questionContainer.firstChild) {
        questionContainer.removeChild(questionContainer.firstChild);
    }

    // Cria um parágrafo para a pergunta
    const questionParagraph = document.createElement("p");
    questionParagraph.textContent = currentQuestion.question;

    // Adiciona o parágrafo ao questionContainer
    questionContainer.appendChild(questionParagraph);

    // Exibe as opções de resposta
    optionsContainer.innerHTML = currentQuestion.options.map((option, index) => {
        return `<button onclick="checkAnswer(${index})">${option}</button>`;
    }).join('');
}

function checkAnswer(answerIndex) {
    const currentQuestion = questions[currentQuestionIndex];

    if (currentQuestion.options[answerIndex] === currentQuestion.rightAnswer) {
        // Resposta correta
        displayMessage("Congratulations! You got it right!", "green");
        // Adiciona um breve atraso antes de avançar para a próxima pergunta
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                enableOptionsButtons(); // Reativa os botões para a próxima pergunta
                displayQuestion();
            } else {
                // Se todas as perguntas foram respondidas, exibe a mensagem de parabéns
                displayMessage("Congratulations! You completed the quiz. Your secret code word is MONEY.", "blue");
            }
        }, 2000);
        const tipContainer = document.getElementById("tip-container");
        tipContainer.textContent = "";
    } else {
        // Resposta incorreta
        displayMessage("Incorrect! Try again.", "red");
        // Exibe a dica
        displayTip(currentQuestion.tip);
        // Adiciona um atraso antes de reativar os botões para garantir que a mensagem de erro seja exibida
        setTimeout(() => {
            enableOptionsButtons();
        }, 1000);
    }
}





// function nextQuestion() {
//     enableOptionsButtons();
//     const tipContainer = document.getElementById("tip-container");
//     tipContainer.textContent = "";
//     displayQuestion();
// }





function displayTip(tipText) {
    const tipContainer = document.getElementById("tip-container");
    tipContainer.textContent = `Tip: ${tipText}`;
}

function displayMessage(message, color) {
    const messageContainer = document.getElementById("message-container");
    messageContainer.innerHTML = `<p style="color: ${color};">${message}</p>`;
}

function disableOptionsButtons() {
    const optionsButtons = document.querySelectorAll("#options-container button");
    optionsButtons.forEach(button => {
        button.disabled = true;
        // Você também pode adicionar estilos para indicar visualmente que as opções estão desativadas
    });
}

function enableOptionsButtons() {
    const optionsButtons = document.querySelectorAll("#options-container button");
    optionsButtons.forEach(button => {
        button.disabled = false;
        // Limpar estilos adicionados anteriormente, se houver
    });
}

// Função para reativar os botões e limpar a dica quando o jogador tentar novamente
function nextQuestion() {
    const tipContainer = document.getElementById("tip-container");
    tipContainer.textContent = "";
    displayQuestion();
    enableOptionsButtons(); // Certifique-se de reativar os botões ao exibir a próxima pergunta
}


displayQuestion();
