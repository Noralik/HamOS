const playerField = document.querySelector('.playerField');
const enemyField = document.querySelector('.enemyField');
let playerShips = 0
const shipSet = []
const ComputerShipSet = []


const createBox = (number, parentElem) => {
  for (let i = 0; i < number; i++) {
    const gameBlock = document.createElement('div');
    gameBlock.classList.add('block');
        gameBlock.addEventListener('click', function () {
            if (playerShips < 3 && shipSet[i] != true){
            createImg('1307865.png', gameBlock);
            playerShips++;
            shipSet[i] = true;
        }
    });
    parentElem.appendChild(gameBlock);
};
}

const createImg = (link, parent) => {
  const gameImg = document.createElement('img');
  gameImg.src = link;
  gameImg.classList.add('PlayerImg');
  parent.appendChild(gameImg);
};

createBox(12, playerField, shipSet);
createBox(12, enemyField, ComputerShipSet);
