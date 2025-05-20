setInterval(function () {
    const img = document.createElement('img');
    const allImg = document.querySelectorAll('img');
    img.src = 'kafka.png';
    for (let i = 0; i < allImg.length; i++) {
      allImg[i].style.top = randomNumber(3, 97) + '%';
      allImg[i].style.left = randomNumber(3, 97) + '%';
    }
  
    img.addEventListener('click', function () {
      img.style.transform = 'scale(1.1) rotate(360deg)';
      document.body.style.backgroundColor = 'yellow';
      setTimeout(function () {
        img.remove();
        document.body.style.backgroundColor = 'white';
      }, 200);
    });
  
    document.body.append(img);
  }, 200);
  
  document.addEventListener("keypress", function(){
    const allImg = document.querySelectorAll('img');
    for (let i = 0; i < allImg.length; i++) {
        allImg[i].remove();
      }
  });
  
  const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  