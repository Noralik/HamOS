const playerField = document.querySelector('.playerField');
const enemyField = document.querySelector('.EnemyField');
let playerShips = 0;
const shipSet = [];
const computerShipSet = [];
const computerShips = [];
const userShips = [];

const randomFunction = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const genearteComputerShips = (shipsArr) => {
  for (let i = 0; i < 3; i++) {
    let randomShip = randomFunction(0, 12);
    if (computerShips.includes(randomShip)) {
      shipsArr.push(randomShip);
    } else {
      while (computerShips.includes(randomShip)) {
        randomShip = randomFunction(0, 12);
      }
      shipsArr.push(randomShip);
    }
  }
};

genearteComputerShips(computerShips);

const createBox = (number, parentElem, states, isComputer) => {
  for (let i = 0; i < number; i++) {
    states.push(false);
    const gameBlock = document.createElement('div');
    gameBlock.classList.add('block');
    if (!isComputer) {
      gameBlock.addEventListener('click', function () {
        if (playerShips < 3 && shipSet[i] != true) {
          createImg('1307865.png', gameBlock);
          playerShips++;
          userShips.push(i);
          shipSet[i] = true;
        }
      });
    } else {
      gameBlock.addEventListener('click', function () {
        if (shipSet[i] != true && computerShips.includes(i)) {
          createImg('111160871.png', gameBlock);
        }
        computerShipSet[i] = true;
        let computerSelectedShip = randomFunction(0, 12);
        if(userShips.includes(computerSelectedShip)) {
            gameBlock.src = 'brokenship.jpg';
            userShips.slice(userShips.indexOf(computerSelectedShip), 1)
        }
      });
    }
    parentElem.appendChild(gameBlock);
  }
};

const createImg = (link, parent) => {
  const gameImg = document.createElement('img');
  gameImg.src = link;
  gameImg.classList.add('PlayerImg');
  parent.appendChild(gameImg);
};

createBox(12, playerField, shipSet, false);
createBox(12, enemyField, computerShipSet, true);
