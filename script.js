const addBtn = document.querySelector('#addBtn');
const foodNameInput = document.querySelector('#food-text-input'); // твой input для названия еды
const foodFileInput = document.querySelector('#food-file-input'); // твой input для загрузки фото
const foodItems = document.querySelector('#food-list'); // контейнер для еды

addBtn.addEventListener('click', function (event) {
  event.preventDefault(); // чтобы форма не отправлялась и страница не перезагружалась

  const foodNameValue = foodNameInput.value.trim();
  const file = foodFileInput.files[0];

  if (!foodNameValue || !file) {
    alert('Пожалуйста, введите название еды и загрузите фото');
    return;
  }

  const reader = new FileReader();

  reader.onload = function(e) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('food-item');

    const newImg = document.createElement('img');
    newImg.src = e.target.result; // изображение из файла
    newImg.alt = foodNameValue;

    const infoDiv = document.createElement('div');

    const newName = document.createElement('p');
    newName.classList.add('food-name');
    newName.innerText = foodNameValue;

    const newRating = document.createElement('p');
    newRating.classList.add('food-rating');
    newRating.innerText = '⭐ 5/5'; // можно менять логику рейтинга по желанию

    infoDiv.appendChild(newName);
    infoDiv.appendChild(newRating);

    newDiv.appendChild(newImg);
    newDiv.appendChild(infoDiv);

    foodItems.appendChild(newDiv);

    // Очистка формы после добавления
    foodNameInput.value = '';
    foodFileInput.value = '';
  };

  reader.readAsDataURL(file);
});