const addBtn = document.querySelector('#addBtn');
const foodNameInput = document.querySelector('#food-text-input');
const foodFileInput = document.querySelector('#food-file-input');
const ratingSelect = document.querySelector('#food-rating-select');
const foodItems = document.querySelector('#food-list');

// Создаём кнопку обновления и добавляем её на страницу
const refreshBtn = document.createElement('button');
refreshBtn.textContent = 'Обновить блюдо';
refreshBtn.style.marginTop = '10px';
refreshBtn.style.width = '100%';
refreshBtn.style.maxWidth = '360px';
refreshBtn.style.padding = '12px 20px';
refreshBtn.style.fontSize = '16px';
refreshBtn.style.color = 'white';
refreshBtn.style.background = 'linear-gradient(90deg, rgba(21, 183, 212, 1) 0%, rgba(30, 123, 189, 1) 50%, rgba(83, 237, 121, 1) 100%)';
refreshBtn.style.border = '2px solid darkmagenta';
refreshBtn.style.borderRadius = '20px';
refreshBtn.style.cursor = 'pointer';
refreshBtn.style.display = 'block';
refreshBtn.style.margin = '10px auto 0';

const formContainer = document.querySelector('.food-add-container');
formContainer.appendChild(refreshBtn);

// Функция загрузки блюд из localStorage
function getFoodsFromStorage() {
  const stored = localStorage.getItem('foods');
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

// Сохранение в localStorage
function saveFoodsToStorage(foods) {
  localStorage.setItem('foods', JSON.stringify(foods));
}

// Отрисовка списка блюд
function loadFoods() {
  foodItems.innerHTML = '';

  const foods = getFoodsFromStorage();
  if (foods.length === 0) {
    return;
  }

  foods.forEach(food => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('food-item');

    const newImg = document.createElement('img');
    newImg.src = food.image;
    newImg.alt = food.name;

    const infoDiv = document.createElement('div');

    const newName = document.createElement('p');
    newName.classList.add('food-name');
    newName.innerText = food.name;

    const userRating = document.createElement('p');
    userRating.classList.add('food-rating');
    userRating.innerText = 'Your rating: ' + '⭐ '.repeat(food.userRating).trim() + ` ${food.userRating}/5`;

    const communityRatingValue = Math.floor(Math.random() * 5) + 1;
    const communityRating = document.createElement('p');
    communityRating.classList.add('food-rating');
    communityRating.innerText = 'Community rating: ' + '⭐ '.repeat(communityRatingValue).trim() + ` ${communityRatingValue}/5`;

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '🗑 Удалить';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      deleteFood(food.id);
    });

    infoDiv.appendChild(newName);
    infoDiv.appendChild(userRating);
    infoDiv.appendChild(communityRating);
    infoDiv.appendChild(deleteBtn);

    newDiv.appendChild(newImg);
    newDiv.appendChild(infoDiv);

    foodItems.appendChild(newDiv);
  });
}

// Добавление блюда
addBtn.addEventListener('click', function (event) {
  event.preventDefault();

  const foodNameValue = foodNameInput.value.trim();
  const file = foodFileInput.files[0];
  const ratingValue = ratingSelect.value;

  if (!foodNameValue || !file || !ratingValue) {
    alert('Пожалуйста, заполните все поля и выберите рейтинг');
    return;
  }

  const reader = new FileReader();

  reader.onload = function (e) {
    const foods = getFoodsFromStorage();

    const newFood = {
      id: Date.now(),
      name: foodNameValue,
      image: e.target.result,
      userRating: parseInt(ratingValue),
    };

    foods.push(newFood);
    saveFoodsToStorage(foods);
    loadFoods();

    foodNameInput.value = '';
    foodFileInput.value = '';
    ratingSelect.value = '';
  };

  reader.readAsDataURL(file);
});

// Удаление блюда по id
function deleteFood(id) {
  const foods = getFoodsFromStorage();
  const filtered = foods.filter(food => food.id !== id);
  saveFoodsToStorage(filtered);
  loadFoods();
}

// Обновление блюда
refreshBtn.addEventListener('click', async () => {
  const foods = getFoodsFromStorage();
  if (foods.length === 0) {
    alert('Список блюд пуст.');
    return;
  }

  let message = 'Введите номер блюда для редактирования:\n';
  foods.forEach((food, index) => {
    message += `${index + 1}: ${food.name}\n`;
  });

  let choice = prompt(message);
  if (!choice) return;

  choice = parseInt(choice);
  if (isNaN(choice) || choice < 1 || choice > foods.length) {
    alert('Неверный номер.');
    return;
  }

  const foodToEdit = foods[choice - 1];

  const newName = prompt('Новое название блюда:', foodToEdit.name);
  if (newName === null) return;

  let newRating = prompt('Новый рейтинг (1-5):', foodToEdit.userRating);
  if (newRating === null) return;

  newRating = parseInt(newRating);
  if (isNaN(newRating) || newRating < 1 || newRating > 5) {
    alert('Некорректный рейтинг. Используется старый.');
    newRating = foodToEdit.userRating;
  }

  const changePhoto = confirm('Хотите изменить фото? (OK — выбрать новое фото, Отмена — оставить старое)');

  if (changePhoto) {
    try {
      const newImage = await selectNewImage();
      if (!newImage) {
        alert('Фото не выбрано. Используется старое фото.');
        finishEdit(foodToEdit, newName, newRating, foodToEdit.image);
      } else {
        finishEdit(foodToEdit, newName, newRating, newImage);
      }
    } catch {
      alert('Фото не выбрано. Используется старое фото.');
      finishEdit(foodToEdit, newName, newRating, foodToEdit.image);
    }
  } else {
    finishEdit(foodToEdit, newName, newRating, foodToEdit.image);
  }
});

// Асинхронный выбор нового изображения — исправленный вариант
function selectNewImage() {
  return new Promise((resolve, reject) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.position = 'fixed';
    fileInput.style.left = '-10000px';

    document.body.appendChild(fileInput);

    fileInput.addEventListener('change', () => {
      if (!fileInput.files || fileInput.files.length === 0) {
        document.body.removeChild(fileInput);
        reject();
        return;
      }

      const file = fileInput.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        document.body.removeChild(fileInput);
        resolve(e.target.result);
      };

      reader.onerror = () => {
        document.body.removeChild(fileInput);
        reject(new Error('Ошибка чтения файла'));
      };

      reader.readAsDataURL(file);
    });

    fileInput.click();
  });
}

// Применяем изменения и сохраняем
function finishEdit(foodToEdit, newName, newRating, newImage) {
  const foods = getFoodsFromStorage();
  const idx = foods.findIndex(f => f.id === foodToEdit.id);
  if (idx === -1) {
    alert('Ошибка: блюдо не найдено.');
    return;
  }
  foods[idx].name = newName;
  foods[idx].userRating = newRating;
  foods[idx].image = newImage;

  saveFoodsToStorage(foods);
  loadFoods();
  alert('Блюдо обновлено!');
}

// Загрузка списка при старте
loadFoods();
