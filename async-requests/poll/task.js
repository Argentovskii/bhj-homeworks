
const API_URL = 'https://students.netoservices.ru/nestjs-backend/poll';  // Нет доступа к этому URL

const pollTitle = document.querySelector('#poll__title');
const pollAnswers = document.querySelector('#poll__answers');

// Загружаем опрос
// fetch(API_URL)
// Временные данные для проверки интерфейса:
Promise.resolve({
  ok: true,
  json: () => Promise.resolve({
    id: 1,
    data: {
      title: 'Ваш любимый герой?',
      answers: ['Мистер Чеснок', 'Принцесса Дыня']
    }
  })
})
// Ошибка 502 , шлюз не получил корректный ответ от сервера.
  .then(response => {
    if (!response.ok) {
      throw new Error(`Ошибка загрузки опроса: ${response.status}`);
    }

    return response.json();
  })
  .then(poll => {
    pollTitle.textContent = poll.data.title;
    pollAnswers.replaceChildren();

    poll.data.answers.forEach((answer, index) => {
      const button = document.createElement('button');

      button.classList.add('poll__answer');
      button.textContent = answer;

      button.addEventListener('click', () => {
        sendVote(poll.id, index);
      });

      pollAnswers.appendChild(button);
    });
  })
  .catch(error => {
    console.error(error);
    pollTitle.textContent = 'Не удалось загрузить опрос. Попробуйте обновить страницу.';
  });


// Отправляем голос и получаем результаты
function sendVote(pollId, answerIndex) {
  const buttons = pollAnswers.querySelectorAll('.poll__answer');

  // Не даём отправить несколько голосов одновременно
  buttons.forEach(button => {
    button.disabled = true;
  });

  const body = new URLSearchParams({
    vote: pollId,
    answer: answerIndex
  });

  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка отправки голоса: ${response.status}`);
      }

      return response.json();
    })
    .then(result => {
      alert('Спасибо, ваш голос засчитан!');

      // Показываем результаты голосования
      pollAnswers.replaceChildren();

      result.stat.forEach(item => {
        const resultItem = document.createElement('div');

        resultItem.classList.add('poll__result');
        resultItem.textContent =
          `${item.answer} — ${item.votes} голосов`;

        pollAnswers.appendChild(resultItem);
      });
    })
    .catch(error => {
      console.error(error);
      alert('Не удалось отправить голос. Попробуйте ещё раз.');

      buttons.forEach(button => {
        button.disabled = false;
      });
    });
}
