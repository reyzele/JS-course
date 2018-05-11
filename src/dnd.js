/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
  let newDiv = document.createElement('div');
  let randomWidth = Math.floor(Math.random() * window.innerWidth);
  let randomHeight = Math.floor(Math.random() * window.innerHeight);
  let r = Math.floor(Math.random() * (256)).toString(16);
  let g = Math.floor(Math.random() * (256)).toString(16);
  let b = Math.floor(Math.random() * (256)).toString(16);
  let randomPositionLeft = Math.floor(Math.random() * (window.innerWidth - randomWidth));
  let randomPositionTop = Math.floor(Math.random() * (window.innerHeight - randomHeight));

  var testDigit = function () {
    for (const digit of arguments) {
      if (digit.length < 2) {
        r = '0' + r;
      }
    }
  }

  testDigit(r, g, b);
  let randomColor = r + g + b;

  newDiv.classList.add('draggable-div');
  newDiv.style.cssText = `position: absolute; 
                          left: ${randomPositionLeft}px; 
                          top: ${randomPositionTop}px;
                          width: ${randomWidth}px; 
                          height: ${randomHeight}px; 
                          background-color: #${randomColor};`


  return newDiv;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
  target.addEventListener('mousedown', function (e) {
    var coords = getCoords(target);
    var shiftX = e.pageX - coords.left;
    var shiftY = e.pageY - coords.top;

    moveAt(e);

    function moveAt(e) {
      target.style.left = e.pageX - shiftX + 'px';
      target.style.top = e.pageY - shiftY + 'px';
    }

    document.onmousemove = function (e) {
      moveAt(e);
    };

    target.onmouseup = function () {
      document.onmousemove = null;
    };

  })

  target.ondragstart = function () {
    return false;
  };

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  // создать новый div
  const div = createDiv();

  // добавить на страницу
  homeworkContainer.appendChild(div);
  // назначить обработчики событий мыши для реализации D&D
  addListeners(div);
  // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
  // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
  createDiv
};
