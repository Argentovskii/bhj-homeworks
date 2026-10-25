
const form = document.querySelector('form');
const progress = document.getElementById('progress');

//const uploadUrl = 'https://students.netoservices.ru/nestjs-backend/upload'; //- не работает
const uploadUrl = 'https://api.testingapis.com/api/echo';

progress.value = 0;
progress.max = 1;

form.addEventListener('submit', event => {
  event.preventDefault();

  const fileInput = form.querySelector('input[type="file"]');

  if (!fileInput || !fileInput.files.length) {
    alert('Сначала выберите файл для загрузки.');
    return;
  }

  const formData = new FormData(form);
  const xhr = new XMLHttpRequest();

  progress.value = 0;

  // Отслеживаем прогресс отправки файла
  xhr.upload.addEventListener('progress', event => {
    if (event.lengthComputable) {
      progress.value = event.loaded / event.total;
    }
  });

  // Загрузка завершилась
  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
      progress.value = 1;
      alert('Файл успешно загружен!');
      console.log('Ответ сервера:', xhr.responseText);
    } else {
      alert(`Ошибка загрузки: HTTP ${xhr.status}`);
      console.error(xhr.responseText);
    }
  });

  // Ошибка сети или соединения
  xhr.addEventListener('error', () => {
    alert('Ошибка сети. Не удалось загрузить файл.');
  });

  xhr.addEventListener('abort', () => {
    alert('Загрузка отменена.');
  });

  // Отправляем форму
  xhr.open('POST', uploadUrl);
  xhr.send(formData);
});
