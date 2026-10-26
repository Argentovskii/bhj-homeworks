
const rotators = document.querySelectorAll('.rotator');

rotators.forEach(rotator => {
  const cases = rotator.querySelectorAll('.rotator__case');

  if (cases.length === 0) {
    return;
  }

  // Находим активное объявление
  let activeIndex = Array.from(cases).findIndex(item =>
    item.classList.contains('rotator__case_active')
  );

  if (activeIndex === -1) {
    activeIndex = 0;
    cases[activeIndex].classList.add('rotator__case_active');
  }

  function showNextCase() {
    // Скрываем текущее объявление
    cases[activeIndex].classList.remove('rotator__case_active');

    // Переходим к следующему, а после последнего — к первому
    activeIndex = (activeIndex + 1) % cases.length;

    const nextCase = cases[activeIndex];

    // Устанавливаем цвет, если он указан
    const color = nextCase.dataset.color;
    if (color) {
      nextCase.style.color = color;
    }

    // Показываем следующее объявление
    nextCase.classList.add('rotator__case_active');

    // Скорость до следующего переключения
    const speed = Number(nextCase.dataset.speed) || 1000;

    setTimeout(showNextCase, speed);
  }

  // Применяем цвет первого объявления
  const firstColor = cases[activeIndex].dataset.color;
  if (firstColor) {
    cases[activeIndex].style.color = firstColor;
  }

  // Запускаем ротатор с учётом скорости активного объявления
  const initialSpeed = Number(cases[activeIndex].dataset.speed) || 1000;
  setTimeout(showNextCase, initialSpeed);
});
