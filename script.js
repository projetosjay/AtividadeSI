const questions = [
    {
        question: "Qual é a capital da França?",
        options: [ "Londres", "Berlim","Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Qual é a fórmula química da água?",
        options: [ "CO2", "O2", "N2","H2O"],
        correct: 3
    },
    {
        question: "Quem escreveu 'Hamlet'?",
        options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
        correct: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', () => {
    showQuestion();

    document.getElementById('next-btn').addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="option"]:checked');
        if (selectedOption) {
            const answer = parseInt(selectedOption.value);
            if (answer === questions[currentQuestionIndex].correct) {
                score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showResults();
            }
        } else {
            alert('Por favor, selecione uma opção.');
        }
    });
});

function showQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');

    questionElement.textContent = questions[currentQuestionIndex].question;
    optionsElement.innerHTML = '';

    questions[currentQuestionIndex].options.forEach((option, index) => {
        const optionElement = document.createElement('button');
        optionElement.innerHTML = `
            <input type="radio" name="option" value="${index}" id="option${index}">
            <label for="option${index}">${option}</label>
        `;
        optionsElement.appendChild(optionElement);
    });
}

async function showResults() {
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const scoreElement = document.getElementById('score');
    const ipElement = document.getElementById('ip');
    const ipListElement = document.getElementById('ip-list');

    scoreElement.textContent = score;
    
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    const userIp = data.ip;

    ipElement.textContent = userIp;

    // Save IP to localStorage
    let ipList = JSON.parse(localStorage.getItem('ipList')) || [];
    ipList.push(userIp);
    localStorage.setItem('ipList', JSON.stringify(ipList));

    // Display IP list
    ipListElement.textContent = ipList.join(', ');

    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
}