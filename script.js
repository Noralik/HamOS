// Получаем ссылки на элементы формы по их ID
const addBtn = document.querySelector('#addBtn'); // Кнопка "Добавить"
const foodNameInput = document.querySelector('#food-text-input'); // Поле ввода названия блюда
const foodFileInput = document.querySelector('#food-file-input'); // Поле загрузки изображения
const ratingSelect = document.querySelector('#food-rating-select'); // Выпадающий список для выбора рейтинга
const foodItems = document.querySelector('#food-list'); // Контейнер для добавленных блюд

// Добавляем обработчик события "клик" на кнопку добавления
addBtn.addEventListener('click', function (event) {
  event.preventDefault(); // Отменяем стандартное поведение кнопки (например, отправку формы)

  // Получаем значения из полей ввода
  const foodNameValue = foodNameInput.value.trim(); // Название блюда без лишних пробелов
  const file = foodFileInput.files[0]; // Выбранный файл (изображение)
  const ratingValue = ratingSelect.value; // Значение рейтинга

  // Проверяем, все ли поля заполнены
  if (!foodNameValue || !file || !ratingValue) {
    alert('Пожалуйста, заполните все поля и выберите рейтинг'); // Сообщение об ошибке
    return; // Прерываем выполнение функции, если есть незаполненные поля
  }

  // Создаем объект FileReader для чтения содержимого файла
  const reader = new FileReader();

  // Задаем, что делать после загрузки файла
  reader.onload = function (e) {
    // Создаем основной контейнер для нового элемента блюда
    const newDiv = document.createElement('div');
    newDiv.classList.add('food-item'); // Добавляем класс для стилизации

    // Создаем элемент изображения
    const newImg = document.createElement('img');
    newImg.src = e.target.result; // Устанавливаем изображение из загруженного файла
    newImg.alt = foodNameValue; // Альтернативный текст - название блюда

    // Создаем контейнер для текста (название и рейтинг)
    const infoDiv = document.createElement('div');

    // Элемент с названием блюда
    const newName = document.createElement('p');
    newName.classList.add('food-name');
    newName.innerText = foodNameValue;

    // Элемент с рейтингом
    const newRating = document.createElement('p');
    newRating.classList.add('food-rating');
    // Формируем строку с рейтингом: звезды + числовое значение
    newRating.innerText = '⭐ '.repeat(ratingValue).trim() + ` ${ratingValue}/5`;

    // Добавляем название и рейтинг в контейнер infoDiv
    infoDiv.appendChild(newName);
    infoDiv.appendChild(newRating);

    // Добавляем изображение и текстовый блок в основной контейнер
    newDiv.appendChild(newImg);
    newDiv.appendChild(infoDiv);

    // Добавляем весь новый элемент на страницу (в список блюд)
    foodItems.appendChild(newDiv);

    // Очищаем форму после добавления
    foodNameInput.value = '';
    foodFileInput.value = '';
    ratingSelect.value = '';
  };

  // Читаем файл как Data URL (для использования в src изображения)
  reader.readAsDataURL(file);
});
