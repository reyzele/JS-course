/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');
var cookieObj = {};

filterNameInput.addEventListener('keyup', function () {
  let proxyObj = {};

  for (let key in cookieObj) {
    if (key.includes(filterNameInput.value) || cookieObj[key].includes(filterNameInput.value)) {

      proxyObj[key] = cookieObj[key];
    }
  }
  drawTable(proxyObj);
});

addButton.addEventListener('click', () => {
  if (addNameInput.value === '' || addValueInput.value === '') {
    return;
  }

  document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  addNameInput.value = '';
  addValueInput.value = '';
  getCookies();
});

addNameInput.addEventListener('change', () => {
  if (addNameInput.value) {
    addButton.dispatchEvent(new Event('click'))
  }
});

addValueInput.addEventListener('change', () => {
  if (addValueInput.value) {
    addButton.dispatchEvent(new Event('click'))
  }
});

function getCookies() {
  if (document.cookie != '') {
    cookieObj = document.cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');

      prev[name] = value;

      return prev;
    }, {})
  } else {
    cookieObj = {};
  }

  if (filterNameInput.value) {
    filterNameInput.dispatchEvent(new Event('keyup'))
  } else {
    drawTable(cookieObj);
  }
}

function drawTable(obj) {
  listTable.innerHTML = '';
  for (let key in obj) {
    if (obj) {
      listTable.innerHTML += `<tr><th>${key}</th>
                                  <th>${obj[key]}</th>
                                  <th><button>Удалить</button></th>
                              </tr>`;
    }
  }
}

listTable.addEventListener('click', (e) => {
  var target = e.target;

  if (target.tagName != 'BUTTON') {
    return;
  }

  while (target != this) {
    if (target.tagName === 'TH') {
      let name = target.closest('th').previousElementSibling.previousElementSibling.innerHTML;

      document.cookie = `${name} = '' + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';`;
      getCookies();
    }

    if (target.tagName === 'TR') {
      let elem = target.closest('tr');

      elem.remove();

      return;
    }
    target = target.parentNode;
  }
})

window.addEventListener('load', () => {
  getCookies();
})