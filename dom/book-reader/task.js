
const book = document.getElementById('book');

// Находим кнопки изменения размера шрифта
const fontSizeControls = document.querySelectorAll('.font-size');

fontSizeControls.forEach(control => {
  control.addEventListener('click', event => {
    event.preventDefault();

    // Убираем активный класс со всех кнопок размера
    fontSizeControls.forEach(item => {
      item.classList.remove('font-size_active');
    });

    // Делаем выбранную кнопку активной
    control.classList.add('font-size_active');

    // Убираем прежний размер шрифта
    book.classList.remove('book_fs-small', 'book_fs-big');

    // Добавляем класс в зависимости от выбранного размера
    if (control.dataset.size === 'small') {
      book.classList.add('book_fs-small');
    } else if (control.dataset.size === 'big') {
      book.classList.add('book_fs-big');
    }
  });
});

// Изменение цвета текста
const textColorControls = document.querySelectorAll('[data-text-color]');

textColorControls.forEach(control => {
  control.addEventListener('click', event => {
    event.preventDefault();

    // Убираем активный класс со всех вариантов цвета текста
    textColorControls.forEach(item => {
      item.classList.remove('color_active');
    });

    // Активируем выбранный цвет
    control.classList.add('color_active');

    // Убираем прежние настройки цвета текста
    book.classList.remove(
      'book_color-black',
      'book_color-gray',
      'book_color-whitesmoke'
    );

    // Добавляем класс выбранного цвета
    const color = control.dataset.textColor;

    if (color !== 'black') {
      book.classList.add(`book_color-${color}`);
    }
  });
});

// Изменение цвета фона
const backgroundColorControls = document.querySelectorAll('[data-bg-color]');

backgroundColorControls.forEach(control => {
  control.addEventListener('click', event => {
    event.preventDefault();

    // Убираем активный класс со всех вариантов фона
    backgroundColorControls.forEach(item => {
      item.classList.remove('color_active');
    });

    // Активируем выбранный фон
    control.classList.add('color_active');

    // Убираем прежние настройки фона
    book.classList.remove(
      'book_bg-black',
      'book_bg-gray',
      'book_bg-white'
    );

    // Добавляем класс выбранного фона
    const color = control.dataset.bgColor;

    if (color !== 'white') {
      book.classList.add(`book_bg-${color}`);
    }
  });
});
