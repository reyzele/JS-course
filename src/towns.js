/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  filterBlock.style.display = 'none';
  loadingBlock.innerHTML = 'Загрузка...';

  return fetch(
    'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json'
  )
    .then(response => {
      loadingBlock.innerHTML = 'Загрузка...';

      return !response.ok ? response.error() : response;
    })
    .then(response => response.json())
    .then(data =>
      data.sort(
        (a, b) =>
          a.name < b.name ? -1 : a.name > b.name ? 1 : 0
      )
    )
    .catch(function () {
      let button = document.createElement('button');

      filterResult.innerHTML = '';
      button.addEventListener('click', () =>
        filterInput.dispatchEvent(new Event('keyup'))
      );
      button.append('Повторить');
      filterResult.append(
        'Не удалось загрузить города',
        document.createElement('br'),
        document.createElement('br')
      );
      filterResult.append(button);
    });
}

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {

  return chunk ? full.toLowerCase().includes(chunk.toLowerCase()) : false;
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

filterInput.addEventListener('keyup', function (e) {
  loadTowns().then(towns => {
    let target = e.target.value;

    filterResult.innerHTML = '';

    if (towns != undefined) {
      towns.forEach(element => {
        if (isMatching(element.name, target)) {
          let item = document.createElement('div');

          item.style.cursor = 'pointer';
          item.innerText = element.name;
          filterResult.appendChild(item);
          item.addEventListener('click', (e) => {
            let result = e.target.textContent;

            filterInput.value = result;
            filterResult.innerHTML = '';
          })
        }
      });
    } else {
      loadTowns();
    }
  });
});

export {
  loadTowns,
  isMatching
};
