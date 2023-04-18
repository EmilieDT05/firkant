//Hente ut div´s, Starter ved midten (blir endret)
const box = document.getElementById('square');
const enemyBox = document.getElementById('enemy');
const pointCountElement = document.getElementById('point-count');
let posX = 0,
    posY = 0,
    points = 1;

function moveBox() {
    box.style.transform = `translate(${posX}px, ${posY}px)`;
}


//Endrer posisjonen på fienden, opptaterer fiendens posisjon
function randomPosition() {
    const screenWidth = window.innerWidth; //Begrenser omeråde for skjerm
    const screenHeight = window.innerHeight; //Begrenser omeråde for skjerm
    const enemyBoxWidth = enemyBox.offsetWidth; //Begrenser omeråde for skjerm
    const enemyBoxHeight = enemyBox.offsetHeight; //Begrenser omeråde for skjerm
    const enemyMinX = 0;
    const enemyMaxX = screenWidth - enemyBoxWidth;
    const enemyMinY = 0;
    const enemyMaxY = screenHeight - enemyBoxHeight;
    const randomX = Math.floor(Math.random() * (enemyMaxX - enemyMinX + 1)) + enemyMinX;
    const randomY = Math.floor(Math.random() * (enemyMaxY - enemyMinY + 1)) + enemyMinY;
    return {
        x: randomX,
        y: randomY
    };
}

function moveEnemyBox() {
    const newPos = randomPosition();
    enemyBox.style.transform = `translate(${newPos.x}px, ${newPos.y}px)`;
}

//Legger til poeng
function updatePoints() {
    points++; // +1 poeng
    pointCountElement.textContent = points; // Fyller ut på poengskala
}

//Fjerner poeng hvis kollidert
function subtractPoints() {
    points -= 10; // Fjerner 10 poeng
    pointCountElement.classList.add('lost-points');
    setTimeout(() => {
        pointCountElement.classList.remove('lost-points');
    }, 500);

    // Sjekker posisjon til firkantene og finner ut om de har kollidert 
}

function checkCollisions() {
    const boxRect = box.getBoundingClientRect();
    const enemyRect = enemyBox.getBoundingClientRect();
    if (boxRect.left < enemyRect.right &&
        boxRect.right > enemyRect.left &&
        boxRect.top < enemyRect.bottom &&
        boxRect.bottom > enemyRect.top) {
        subtractPoints();
    }
}

// Flytter på firkant, ved bruk av piltaster
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'ArrowUp') {
        posY = Math.max(posY - 30, 0);
    } else if (key === 'ArrowDown') {
        posY = Math.min(posY + 30, window.innerHeight - box.offsetHeight);
    } else if (key === 'ArrowLeft') {
        posX = Math.max(posX - 30, 0);
    } else if (key === 'ArrowRight') {
        posX = Math.min(posX + 30, window.innerWidth - box.offsetWidth);
    }
    moveBox();
    checkCollisions();
});

//Kjører "moveEnebyBox" og legger til poeng hvert sekund
setInterval(moveEnemyBox, 1000);
setInterval(updatePoints, 1000);
