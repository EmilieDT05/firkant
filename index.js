const box = document.getElementById('square'); //henter ut square div

// Plasserer firkanten på midten av skjermen ved start
const boxWidth = box.offsetWidth;
const boxHeight = box.offsetHeight;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
let posX = (screenWidth - boxWidth) / 2;
let posY = (screenHeight - boxHeight) / 2;


box.style.transform = `translate(${posX}px, ${posY}px)`;

//når key blir aktivert blir posX og posY oppdtatert
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'ArrowUp') {
        posY = Math.max(posY - 10, 0);
    } else if (key === 'ArrowDown') {
        posY = Math.min(posY + 10, screenHeight - boxHeight);
    } else if (key === 'ArrowLeft') {
        posX = Math.max(posX - 10, 0);
    } else if (key === 'ArrowRight') {
        posX = Math.min(posX + 10, screenWidth - boxWidth);
    }
    box.style.transform = `translate(${posX}px, ${posY}px)`;
});