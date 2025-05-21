const specter = document.querySelectorAll('.specter');
const h1 = document.querySelector('h1');
const h2 = document.querySelector('h2');
let score = 0;
let speed = 1000;

// старая версия
// function randomNumber = (min, max) => {
//  return Math.floor(Math.random() * (max - min)) + min;
//};

// новая версия
const randomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

for(let i = 0; i< specter.length; i++){
  specter[i].addEventListener('click', function() {
    //alert('dd');
    score += 1;
    h1.innerText ="Score: " + score;
    if(score % 2 == 0) {
      clearInterval(specterWork);
      speed -= 200;
      let speedForUser = 1000 + (1000 - speed);
      h2.innerText = "Speed: " + speedForUser + " Max speed 2000";
      specterWork = setInterval(specterMove, speed);
    }
    specter[i].style.transform = 'rotate(720deg)';
    document.body.backgroundColor = "green";
    setTimeout(() => (document.body.style.backgroundColor = "white"), 100);
  });
}
//////////////////////////////////
const specterMove = () => {
  const randomSpecterNumber = randomNumber(0, specter.length);
  specter[randomSpecterNumber].style.top = '-50px';
  setTimeout(() => (specter[randomSpecterNumber].style.zIndex = '1'), 200);
  setTimeout(function () {
    specter[randomSpecterNumber].style.zIndex = '-1';
    specter[randomSpecterNumber].style.top = '20px';
  }, 800);
}

let specterWork = setInterval(specterMove, speed);