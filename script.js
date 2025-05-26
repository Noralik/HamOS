const addBtn = document.querySelector('#addBtn');
const foodNameInput = document.querySelector('#food-text-input');
const foodFileInput = document.querySelector('#food-file-input');
const ratingSelect = document.querySelector('#food-rating-select');
const foodItems = document.querySelector('#food-list');

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
    const newDiv = document.createElement('div');
    newDiv.classList.add('food-item');

    const newImg = document.createElement('img');
    newImg.src = e.target.result;
    newImg.alt = foodNameValue;

    const infoDiv = document.createElement('div');

    const newName = document.createElement('p');
    newName.classList.add('food-name');
    newName.innerText = foodNameValue;

    const userRating = document.createElement('p');
    userRating.classList.add('food-rating');
    userRating.innerText = 'Your rating: ' + '⭐ '.repeat(ratingValue).trim() + ` ${ratingValue}/5`;

    const communityRatingValue = Math.floor(Math.random() * 5) + 1;
    const communityRating = document.createElement('p');
    communityRating.classList.add('food-rating');
    communityRating.innerText = 'Community rating: ' + '⭐ '.repeat(communityRatingValue).trim() + ` ${communityRatingValue}/5`;

    // 🔴 Кнопка удаления
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '🗑 Удалить';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      foodItems.removeChild(newDiv);
    });

    infoDiv.appendChild(newName);
    infoDiv.appendChild(userRating);
    infoDiv.appendChild(communityRating);
    infoDiv.appendChild(deleteBtn);

    newDiv.appendChild(newImg);
    newDiv.appendChild(infoDiv);

    foodItems.appendChild(newDiv);

    foodNameInput.value = '';
    foodFileInput.value = '';
    ratingSelect.value = '';
  };

  reader.readAsDataURL(file);
});
