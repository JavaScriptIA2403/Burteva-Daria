# Индивидуальный проект `Burteva Daria IA2403`

## Оглавление

* [Запуск проекта](#запуск-проекта)
* [Описание проекта](#описание-проекта)
* [Функциональные модули](#функциональные-модули)
* [Вызов и использование](#вызов-и-использование)
* [Технические детали](#технические-детали)
* [Источники](#источники)

## Запуск проекта

* Откройте проект в редакторе Visual Studio Code.
* Убедитесь, что установлено расширение **Live Server**.
* Откройте файл `index.html` с помощью Live Server (кнопка **Go Live** внизу или правый клик → «Open with Live Server»).
# Индивидуальный проект по дисциплине **«JavaScript»**


## Описание проекта

Цель проекта — реализовать веб-приложение "To-Do List" на **Vanilla JavaScript** с возможностью:

* Добавления новых задач.
* Отметки задач как выполненных.
* Удаления задач.
* Фильтрации задач по статусу (все/выполненные/невыполненные).
* Поиска задач по тексту.

В проекте не используются сторонние библиотеки и фреймворки — только **чистый JavaScript**, **HTML** и **CSS**.


## Функциональные модули

### `main.js`

```js
import { setupUI, renderTasks } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  setupUI();
  renderTasks();
});
```

* Подключает UI-логику.

После загрузки документа вызывает `setupUI()` и `renderTasks()` для отрисовки начального интерфейса.


### `taskManager.js`

Обрабатывает все действия с данными:

* `addTask(text)` — добавляет задачу.

* `deleteTask(id)` — удаляет задачу по id.

* `toggleTask(id)` — переключает статус задачи (выполнена / не выполнена).

* `getTasks(filter, search)` — возвращает отфильтрованный и отсортированный массив задач.

Все задачи хранятся в `localStorage`, чтобы сохранялись между перезагрузками страницы.


### `ui.js`

Связан с интерфейсом:

* `renderTasks()` — очищает и заполняет список задач в DOM на основе фильтра и строки поиска.

* `setupUI()` — добавляет обработчики событий:

       * Отправка формы добавляет новую задачу.

       * Поиск фильтрует задачи по ключевым словам.

       * Выбор фильтра (все / активные / выполненные) также влияет на отображение.

```js
form.onsubmit = e => {
  e.preventDefault();
  const value = input.value.trim();
  if (value === '') return alert('Введите задачу!');
  addTask(value);
  input.value = '';
  renderTasks();
};
```

## Вызов и использование

**Добавление задачи:**
Введите текст задачи в поле и нажмите "Добавить".
![Добавление](1.png)

**Отметить как выполненную:**
Нажмите на задачу — она зачеркнется и пометится зеленым фоном.
![Выполненная](2.png)

**Удаление задачи:**
Нажмите кнопку "Удалить" рядом с нужной задачей.
![Удаление](3.png)

**Фильтрация задач:**
Выберите из выпадающего списка нужный статус (все/выполненные/невыполненные).
![Фильтрация](4.png)

**Поиск:**
Введите часть текста — останутся только соответствующие задачи.
![Поиск](5.png)


## Технические детали

1. **HTML и CSS**

   * Статическая HTML-структура без изменений.
   * Полностью кастомизированный внешний вид через CSS.
   * Использованы фиксированные размеры (в пикселях), градиенты, тени, скругления, анимации при наведении.

2. **JavaScript (ES6-модули)**

   * Проект разбит на 3 модуля: `main.js`, `taskManager.js`, `ui.js`.
   * Используется `import/export` для разделения логики.

3. **Работа с DOM**

   * Динамическое создание элементов (`createElement`, `appendChild`).
   * Обновление интерфейса при действиях пользователя.

4. **Локальное хранилище**

   * Данные сохраняются в `localStorage`.
   * При перезагрузке задачи подгружаются автоматически.

5. **Основная логика**

   * Добавление, удаление, выполнение задач.
   * Поиск по названию и фильтрация по статусу.

6. **События**

   * Обработчики на `submit`, `click`, `input`, `change`.

7. **Валидация**

   * Проверка на пустой ввод задачи перед добавлением.


## Источники

* [JavaScript.info](https://learn.javascript.ru/)
* [MDN Web Docs](https://developer.mozilla.org/ru/)
* [Stack Overflow](https://stackoverflow.com/)
* Условия индивидуального проекта (Moodle + GitHub)
