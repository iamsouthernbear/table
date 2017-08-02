const xhr = new XMLHttpRequest();

// Формирование запроса
xhr.open('GET', 'http://localhost:3000/');

let jsoooon;

// Действия по получению всех данных по запросу
xhr.onreadystatechange = function () {

  if (xhr.readyState != 4) return;

  if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    jsoooon = JSON.parse(xhr.responseText);
    addTable(jsoooon);
    pagination();
  };
};

// Отправка запроса
xhr.send();






// Пагинация
let perPageSelector = 10;

const editPerPageSelector = function () {
  const lightning = document.querySelectorAll('.perPage');
  const table = document.querySelector('table');
  const bottomBar = document.querySelector('.bottomBar');
  const perPage = event.currentTarget.value;
  perPageSelector = perPage;
  table.remove();
  while (bottomBar.firstChild) {
    bottomBar.removeChild(bottomBar.firstChild);
  };
  addTable(jsoooon);
  pagination();
  for (let i = 0; i < lightning.length; i++) {
    lightning[i].style.backgroundColor = 'white';
  };
  let target = event.currentTarget;
  target.style.backgroundColor = 'red';
};

function selectPage () {
  const lastPageSelector = document.querySelector('.bottomBar').lastChild.innerHTML;
  const table = document.querySelector('table');
  let tbody = document.querySelector('tbody');
  tbody.remove();
  const btnPageSelector = event.currentTarget.value;
  tbody = document.createElement('tbody');
  table.appendChild(tbody);

  const firstPoint = +btnPageSelector * perPageSelector;
  let lastPoint = (+btnPageSelector + 1) * perPageSelector;

  if (lastPoint/perPageSelector == lastPageSelector) {
    lastPoint = jsoooon.length;
  }
  // Заполняем тело таблицы
  for (let i = firstPoint; i < lastPoint; i++) {
    const tr = document.createElement('tr');

    Object.keys(jsoooon[i]).forEach(function (key) {
      const element = jsoooon[i];
      const td = document.createElement('td');
      td.innerHTML = element[key];
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  };

  const lightning = document.querySelectorAll('.pageSelector');
  for (let i = 0; i < lightning.length; i++) {
    lightning[i].style.backgroundColor = 'white';
  };
  const target = event.currentTarget;
  target.style.backgroundColor = 'red';
};

// Рисуем кнопки переключения страниц
function pagination () {
  const body = document.querySelector('body');
  const bottomBar = document.querySelector('.bottomBar');
  const btnPageAmount = Math.ceil(jsoooon.length/perPageSelector);
  for (let i = 0; i < btnPageAmount; i++) {
    const btnPageSelector = document.createElement('button');
    btnPageSelector.setAttribute('class', 'btn btn-default pageSelector');
    btnPageSelector.setAttribute('value', i);
    btnPageSelector.setAttribute('onclick', 'selectPage()');
    btnPageSelector.innerHTML = i + 1;
    bottomBar.insertAdjacentElement('beforeEnd', btnPageSelector);
  };
};





// Сортировка по столбцам
let status = {};

// Обнуляем статус
function resetStatus () {
  for (let key in status) {
    status[key] = '';
  }
};

// Сортировка чисел
function sortNum (a, b) {
  const col = event.currentTarget.dataset.col;
  return a[col] - b[col];
}

// Сортировка строк
function sortStr (a, b) {
  const col = event.currentTarget.dataset.col;
  if (a[col] > b[col]) return 1;
  if (a[col] < b[col]) return -1;
  return 0;
}

// Функция сортировки, срабатывает при клике на header столбца
function sortCol () {
  const table = document.querySelector('table');
  const col = event.currentTarget.dataset.col;
  const type = event.currentTarget.dataset.type;
  table.remove();

  if (status[col] == 'sorted') {
    jsoooon.reverse();
    addTable(jsoooon);
  } else {
    if (type == 'string') {
      jsoooon.sort(sortStr);
      addTable(jsoooon);
      resetStatus();
      status[col] = 'sorted';
    } else {
      jsoooon.sort(sortNum);
      addTable(jsoooon);
      resetStatus();
      status[col] = 'sorted';
    };
  }
};





// Поиск по таблице
function search () {
  const input = document.querySelector('input');
  const filter = input.value.toUpperCase();
  const table = document.querySelector('table');

  for (let i = 0; i < table.rows.length; i++) {
    for (let j = 0; j < table.rows[i].cells.length; j++) {
      table.rows[i].cells[j].style.backgroundColor = 'white';
      table.rows[i].cells[j].style.color = 'black';
      if (table.rows[i].cells[j].innerHTML.toUpperCase().indexOf(filter) > -1 && filter != '') {
        table.rows[i].cells[j].style.backgroundColor = 'red';
        table.rows[i].cells[j].style.color = 'white';
      };
    };
  };
};





// Рисуем таблицу
function addTable (responseText) {
  const body = document.querySelector('body');
  const bottom = document.querySelector('.bottom');
  // Создаем таблицу
  const table = document.createElement('table');
  table.className = 'table table-bordered text-center';
  body.insertBefore(table, bottom);

  // Создаем header таблицы
  const thead = document.createElement('thead');
  table.appendChild(thead);

  // Заполняем header таблицы
  Object.keys(responseText[0]).forEach(function (key) {
    const td = document.createElement('td');
    td.setAttribute('data-col', key);
    td.setAttribute('onclick', 'sortCol()');
    // Присвоение data-атрибута для делегирования
    if (key == 'id' || key == 'age') {
      td.setAttribute('data-type', 'number');
    } else {
      td.setAttribute('data-type', 'string');
    };

    td.innerHTML = '<td>' + key + '</td>';
    thead.appendChild(td);
  });

  // Создаем тело таблицы
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  // Заполняем тело таблицы
  for (let i = 0; i < perPageSelector; i++) {
    const tr = document.createElement('tr');

    Object.keys(responseText[i]).forEach(function (key) {
      const element = responseText[i];
      const td = document.createElement('td');
      td.innerHTML = element[key];
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  };
};
