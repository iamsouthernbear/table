const xhr = new XMLHttpRequest();

// Формирование запроса
xhr.open('GET', 'http://localhost:3000/');

// Действия по получению всех данных по запросу
xhr.onreadystatechange = function () {

  if (xhr.readyState != 4) return;

  if (xhr.status != 200) {
    alert(xhr.status + ': ' + xhr.statusText);
  } else {
    // alert(xhr.responseText);
    const myJson = JSON.parse(xhr.responseText);
    addTable(myJson);
  };
};

// Отправка запроса
xhr.send();





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
  for (let key in responseText[0]) {
    const td = document.createElement('td');

    // Присвоение data-атрибута для делегирования
    if (key == 'id' || key == 'age') {
      td.setAttribute('data-type', 'number');
    } else {
      td.setAttribute('data-type', 'string');
    };

    td.innerHTML = '<td>' + key + '</td>';
    thead.appendChild(td);
  };

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
