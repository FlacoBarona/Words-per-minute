const startBtn = document.getElementById('start-btn');
const userInput = document.getElementById('user-input');
const userText = document.getElementById('user-text'); // Contendrá el texto dinámico resaltado
const timeElement = document.getElementById('time');
const wpmElement = document.getElementById('wpm');

let startTime;
let timerInterval;
let isTyping = false;
let typedText = '';
let wordCount = 0;

// Lista de textos de ejemplo
const sampleTexts = [
    'Este es un texto de ejemplo que tendrás que escribir rápidamente.',
    'La programación es como escribir un libro, pero si no sabes qué hacer, el libro no te ayudará.',
    'Cuando escribes código, a veces las soluciones son simples y otras veces son complejas.',
    'Es importante practicar para mejorar nuestras habilidades de escritura y velocidad.',
    'Los teclados mecánicos tienen un sonido y una sensación únicos al escribir.'
];

startBtn.addEventListener('click', startTyping);
userInput.addEventListener('input', handleInput);

function startTyping() {
    if (isTyping) return; // No iniciar si ya estamos escribiendo
    isTyping = true;
    wordCount = 0;
    typedText = '';

    // Seleccionamos un texto aleatorio de la lista
    const randomIndex = Math.floor(Math.random() * sampleTexts.length);
    const selectedText = sampleTexts[randomIndex];

    userInput.value = '';
    userInput.focus();
    userText.innerHTML = highlightText('', selectedText); // Mostrar el texto inicial resaltado
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTime, 1000);
    startBtn.disabled = true;

    // Guardar el texto actual como referencia
    userText.setAttribute('data-original-text', selectedText);
}

function handleInput() {
    typedText = userInput.value;
    const originalText = userText.getAttribute('data-original-text'); // Obtener el texto original

    // Resaltamos los errores mientras el usuario escribe
    userText.innerHTML = highlightText(typedText, originalText);

    // Si el texto escrito es correcto y completo
    if (typedText === originalText) {
        clearInterval(timerInterval);
        isTyping = false;
        startBtn.disabled = false;

        // Muestra las palabras por minuto
        updateWPM();

        // Reinicia el campo de entrada y selecciona un nuevo texto
        userInput.value = '';
        startTyping(); // Llama de nuevo a startTyping para empezar con un nuevo texto
    }
}

function highlightText(userInputText, originalText) {
    let result = '';

    for (let i = 0; i < originalText.length; i++) {
        const userChar = userInputText[i] || '';
        const originalChar = originalText[i];

        if (userChar === originalChar) {
            result += `<span class="correct">${originalChar}</span>`;
        } else if (userChar) {
            result += `<span class="incorrect">${userChar}</span>`;
        } else {
            result += `<span class="missing">${originalChar}</span>`;
        }
    }

    return result;
}

function updateTime() {
    const timePassed = Math.floor((new Date().getTime() - startTime) / 1000);
    timeElement.textContent = timePassed;
}

function updateWPM() {
    const words = typedText.split(' ').length;
    const timeInMinutes = (new Date().getTime() - startTime) / 60000;
    const wpm = Math.floor(words / timeInMinutes);
    wpmElement.textContent = wpm;
}
