<script>
// === СЛУЖЕБНАЯ ФУНКЦИЯ ПРОВЕРКИ, НАХОДИТСЯ ЛИ ЭЛЕМЕНТ В ПОЛЕ ЗРЕНИЯ ===
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  // Элемент полностью видим, если:
  // 1. Верхняя граница <= высоты окна (выше или на уровне нижнего края окна)
  // 2. Нижняя граница >= 0 (ниже или на уровне верхнего края окна)
  // 3. Левая граница <= ширины окна
  // 4. Правая граница >= 0
  const isVisible = (
    rect.top <= windowHeight &&
    rect.bottom >= 0 &&
    rect.left <= windowWidth &&
    rect.right >= 0
  );

  return isVisible;
}

// === ОСНОВНАЯ ЛОГИКА ===
const revealElements = document.querySelectorAll('.reveal');

function handleScroll() {
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;

  revealElements.forEach((el) => {
    const rect = el.getBoundingClientRect();

    // Проверяем, находится ли элемент в поле зрения
    if (isElementInViewport(el)) {
      // Присваиваем класс reveal_active — анимация (transition) включится автоматически
      el.classList.add('reveal_active');
    } else {
      // Если элемент вышел из области видимости — убираем класс
      el.classList.remove('reveal_active');
    }
  });
}

// === ЗАПУСК СЛУШАТЕЛЯ ПРОКРУТКИ ===
window.addEventListener('scroll', handleScroll);

// === ДЕБАУНСИНГ (важно, чтобы не было лагов при быстром скролле) ===
let scrollTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(handleScroll, 10);
});

// === ИНИЦИАЛЬНАЯ ПРОВЕРКА (на случай, если страница загружена с прокруткой) ===
handleScroll();

// === Дополнительно: при загрузке страницы с уже видимыми элементами они тоже оживут ===
document.addEventListener('DOMContentLoaded', () => {
  // Поскольку handleScroll уже вызван выше, ничего делать не нужно
});
</script>
