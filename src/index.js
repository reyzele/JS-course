/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
  let newArr = [];

  for (let i = 0; i < array.length; i++) {
    newArr.push(fn(array[i], i, array))
  }

  return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  let result = 0;

  if (initial === undefined) {
    initial = array[0];

    for (let i = 1; i < array.length; i++) {
      result = fn(initial, array[i], i, array);
      initial = result;
    }
  } else {
    for (let i = 0; i < array.length; i++) {
      result = fn(initial, array[i], i, array);
      initial = result;
    }
  }

  return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  let arr = [];

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      let UpperCase = key.toUpperCase();

      arr.push(UpperCase);
    }
  }

  return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
  let arr = [];

  if (from === undefined) {
    from = 0;
  }

  if (to === undefined) {
    to = array.length;
  }

  if (from < 0) {
    from = array.length + from;
    if (from < 0) {
      from = 0;
    }
  }

  if (to > array.length) {
    to = array.length;
  }

  if (to < 0) {
    to = array.length + to;
  }

  for (let i = from; i < to; i++) {
    arr.push(array[i]);
  }

  return arr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
}

export {
  forEach,
  map,
  reduce,
  upperProps,
  slice,
  createProxy
};
