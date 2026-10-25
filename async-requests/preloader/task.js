
const loader = document.querySelector('#loader');
const items = document.querySelector('#items');

// const url = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses'; - !! недоступен !!
const url = 'https://www.cbr-xml-daily.ru/daily_json.js';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Ошибка сервера: ${response.status}`);
    }

    return response.json();
  })
  .then(data => {
    //Заменил API. в новом API список валют находится непосредственно в data.Valute,а не в data.response.Valute
    const currencies = data.Valute;

    Object.values(currencies).forEach(currency => {
      const item = document.createElement('div');
      item.classList.add('item');

      const code = document.createElement('div');
      code.classList.add('item__code');
      code.textContent = currency.CharCode;

      const value = document.createElement('div');
      value.classList.add('item__value');
      value.textContent = currency.Value;

      const currencyName = document.createElement('div');
      currencyName.classList.add('item__currency');
      currencyName.textContent = 'руб.';

      item.append(code, value, currencyName);
      items.append(item);
    });
  })
  .catch(error => {
    console.error('Не удалось загрузить курсы валют:', error);
    items.textContent = 'Не удалось загрузить курсы валют.';
  })
  .finally(() => {
    loader.classList.remove('loader_active');
  });
