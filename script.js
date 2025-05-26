document.getElementById("food-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const input = document.getElementById("food-input");
    const foodName = input.value.trim();

    if (foodName === "") return;

    const foodList = document.getElementById("food-list");

    const item = document.createElement("div");
    item.className = "food-item";

    // Пустая картинка по умолчанию (можно заменить на иконку или ссылку)
    item.innerHTML = `
        <img src="tango.avif" alt="${foodName}">
        <div>
            <p class="food-name">${foodName}</p>
            <p class="food-rating">⭐ 5/5</p>
        </div>
    `;

    foodList.appendChild(item);
    input.value = "";
});
