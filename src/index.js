/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунд

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  let toSec = seconds * 1000;

  var promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, toSec);
  })

  return promise;
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
  var xhr = new XMLHttpRequest;

  xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
  xhr.responseType = 'json';
  xhr.send();

  var promise = new Promise((resolve, reject) => {
    xhr.addEventListener('load', () => {
      if (xhr.status >= 400) {
        reject('Произошла ошибка');
      } else {
        let SortArr = xhr.response.sort((a, b) => {
          if (a.name < b.name) { 
            return -1;
          }
          if (a.name > b.name) { 
            return 1;
          }
            
          return 0;
        });

        return resolve(SortArr);
      }
    })
  })

  return promise;
}

export {
  delayPromise,
  loadAndSortTowns
};
