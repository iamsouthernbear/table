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
    // alert(xhr.responseText);
    jsoooon = JSON.parse(xhr.responseText);
    // addTable(myJson);
    // myJson.sort(sortNum);
    addTable(jsoooon);
  };
};

// Отправка запроса
xhr.send();










// Сортировка по столбцам
let status = {};

function resetStatus () {
  for (let key in status) {
    status[key] = '';
  }
};

function sortNum (a, b) {
  const col = event.currentTarget.dataset.col;
  return a[col] - b[col];
}

function sortStr (a, b) {
  const col = event.currentTarget.dataset.col;
  if (a[col] > b[col]) return 1;
  if (a[col] < b[col]) return -1;
  return 0;
}

function sortCol () {
  const table = document.querySelector('table');
  const col = event.currentTarget.dataset.col;
  const type = event.currentTarget.dataset.type;
  table.remove();

  if (status[col] == 'sorted') {
    jsoooon.reverse();
    addTable(jsoooon);
    console.log('ok');
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

  // if (type == 'string') {
  //   jsoooon.sort(sortStr);
  //   addTable(jsoooon);
  //   status[col] = 'sorted';
  //   console.log(status[col]);
  // } else {
  //   jsoooon.sort(sortNum);
  //   addTable(jsoooon);
  // };

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

  // Создаем таблицу
  const table = document.createElement('table');
  table.className = 'table table-bordered text-center';
  body.appendChild(table);

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
  for (let i = 0; i < responseText.length; i++) {
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
