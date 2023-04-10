//Переменные
const apiKey = "b7626a4d7aaa4b48b0090622230704";
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const header = document.querySelector(".header");

function removeCard() {
  const prevCard = document.querySelector(".card");
  if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
  const html = `<div class="card">${errorMessage}</div>`;
  header.insertAdjacentHTML("afterend", html);
}

function showCard(name, country, temp, condition) {
  //Разметка для карточки
  const html = `<div class="card">
<h2 class="card-city">${name} <span>${country}</span></h2>

<div class="card-weather">
    <div class="card-value">${temp}<sup>°c</sup></div>
    <img class="card-img" src="./img/example.png" alt="Weather">
</div>

<div class="card-description">${condition}</div>
</div>`;

  //Отображаем карточку на странице
  header.insertAdjacentHTML("afterend", html);
}

async function getWeather(city) {
  //Делаем запрос на сервер
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  const response = await fetch(url);
  const data = await response.json();
  return data;
}

//Слушаем отправку формы
form.addEventListener("submit", async function (e) {
  //Отмена отправки формы
  e.preventDefault();

  //Берём значение из инпута(trim обрезает пробелы)
  let city = input.value.trim();

  //Получаем данные с сервера
  const data = await getWeather(city);

  //Проверка на ошибку в воде названия города
  if (data.error) {
    //Удаление старой карточки
    removeCard();

    showError(data.error.message);
  } else {
    removeCard();
    showCard(
      data.location.name,
      data.location.country,
      data.current.temp_c,
      data.current.condition.text
    );
  }
});
