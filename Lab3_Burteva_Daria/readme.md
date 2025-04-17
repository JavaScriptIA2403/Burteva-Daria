# Лабораторная №3 
## Запуск проекта
- Открытие файла `index.html`
- Открытие консоли браузера, чреез `F12` или `контекстное меню->код элемента`

## Цель лабораторной работы
Познакомиться с классами и объектами в JavaScript, научиться создавать классы, использовать конструкторы и методы, а также реализовать наследование.

## Условие работы
Создать консольное приложение, моделирующее систему инвентаря, где можно добавлять предметы, изменять их свойства и управлять ими.

## Шаг 1. Создание класса `Item`
Создайте класс Item, который будет представлять предмет в инвентаре.

### Поля класса:
- `name` – название предмета.
- `weight` – вес предмета.
- `rarity` – редкость предмета (common, uncommon, rare, legendary).
### Методы:
- `getInfo()` – возвращает строку с информацией о предмете.
- `setWeight(newWeight)` – изменяет вес предмета.

```js
/**
 * Класс, представляющий предмет в инвентаре.
 */
class Item {
  /**
   * Конструктор для создания нового предмета.
   * @param {string} name - Название предмета.
   * @param {number} weight - Вес предмета.
   * @param {'common' | 'uncommon' | 'rare' | 'legendary'} rarity - Редкость предмета.
   */
  constructor(name, weight, rarity) {
    this.name = name;
    this.weight = weight;
    this.rarity = rarity;
  }

  /**
   * Получает информацию о предмете.
   * @returns {string} Информация о предмете.
   */
  getInfo() {
    return `Name: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
  }

  /**
   * Устанавливает новый вес предмета.
   * @param {number} newWeight - Новый вес.
   */
  setWeight(newWeight) {
    this.weight = newWeight;
  }
}
```

## Шаг 2. Создание класса `Weapon`
Создаю класс Weapon, который расширяет Item.

### Дополнительные поля:
- `damage` – урон оружия.
- `durability` – прочность (от 0 до 100).
Методы:
- `use()` – уменьшает durability на 10 (если `durability` > 0).
- `repair()` – восстанавливает durability до 100.

```js
/**
 * Класс, представляющий оружие (наследуется от Item).
 */
class Weapon extends Item {
  /**
   * Конструктор для создания нового оружия.
   * @param {string} name - Название оружия.
   * @param {number} weight - Вес оружия.
   * @param {'common' | 'uncommon' | 'rare' | 'legendary'} rarity - Редкость оружия.
   * @param {number} damage - Урон оружия.
   * @param {number} durability - Прочность оружия.
   */
  constructor(name, weight, rarity, damage, durability) {
    super(name, weight, rarity);
    this.damage = damage;
    this.durability = durability;
  }

  /**
   * Использует оружие (уменьшает прочность на 10).
   */
  use() {
    if (this.durability > 0) {
      this.durability -= 10;
      if (this.durability < 0) this.durability = 0;  // не даем прочности быть меньше 0
    }
  }

  /**
   * Ремонтирует оружие (восстанавливает прочность до 100).
   */
  repair() {
    this.durability = 100;
  }

  /**
   * Получает информацию об оружии.
   * @returns {string} Информация о оружии.
   */
  getInfo() {
    return `${super.getInfo()}, Damage: ${this.damage}, Durability: ${this.durability}`;
  }
}
```

## Шаг 3. Тестирование
1. Создайте несколько объектов классов Item и Weapon.
2. Вызовите их методы, чтобы убедиться в правильности работы.

```js
// Создаем несколько предметов
const shield = new Item("Shield", 5.0, "common");
console.log(shield?.getInfo());  // Информация о щите

const axe = new Weapon("Battle Axe", 6.0, "rare", 25, 80);
console.log(axe?.getInfo());  // Информация о топоре
axe.use();
axe.use();  // Используем топор дважды
console.log(`Axe durability after use: ${axe?.durability}`);
axe.repair();  // Ремонтируем топор
console.log(`Axe durability after repair: ${axe?.durability}`);
```

## Шаг 4. Дополнительное задание
1. Опциональная цепочка (?.) – используйте ее при доступе к свойствам объекта, чтобы избежать ошибок.
2. Создание функции-конструктора:
    - Перепишите классы Item и Weapon, используя функции-конструкторы вместо class.

```js
/**
 * Функция-конструктор Item
 * @constructor
 * @param {string} name - Название предмета.
 * @param {number} weight - Вес предмета.
 * @param {'common' | 'uncommon' | 'rare' | 'legendary'} rarity - Редкость предмета.
 */
function ItemFunc(name, weight, rarity) {
  this.name = name;
  this.weight = weight;
  this.rarity = rarity;
}

ItemFunc.prototype.getInfo = function () {
  return `Name: ${this.name}, Weight: ${this.weight}, Rarity: ${this.rarity}`;
};

ItemFunc.prototype.setWeight = function (newWeight) {
  this.weight = newWeight;
};

/**
 * Функция-конструктор Weapon
 * @constructor
 * @param {string} name
 * @param {number} weight
 * @param {'common' | 'uncommon' | 'rare' | 'legendary'} rarity
 * @param {number} damage
 * @param {number} durability
 */
function WeaponFunc(name, weight, rarity, damage, durability) {
  ItemFunc.call(this, name, weight, rarity);
  this.damage = damage;
  this.durability = durability;
}

// Наследование от ItemFunc
WeaponFunc.prototype = Object.create(ItemFunc.prototype);
WeaponFunc.prototype.constructor = WeaponFunc;

WeaponFunc.prototype.use = function () {
  if (this.durability > 0) {
    this.durability -= 10;
    if (this.durability < 0) this.durability = 0;
  }
};

WeaponFunc.prototype.repair = function () {
  this.durability = 100;
};

WeaponFunc.prototype.getInfo = function () {
  return `${ItemFunc.prototype.getInfo.call(this)}, Damage: ${this.damage}, Durability: ${this.durability}`;
};
```

## Контрольные вопросы
1. Какое значение имеет this в методах класса?
    #### Ответ: this в методах класса — это ссылка на текущий объект (экземпляр класса).
2. Как работает модификатор доступа # в JavaScript?
    #### Ответ: # (приватные поля) — делают свойства/методы доступными только внутри класса
3. В чем разница между классами и функциями-конструкторами?
    #### Ответ: 
    - Cинтаксис написания (`class Item {}` и `function Item() {}`) 
    - Разница в наследовании (для класса - `extends`, для функции - `Weapon.prototype = Object.create(Item.prototype)` с последующим изменением прототипа конструктора на исходный) \n
    - Вызов родительских конструкторов (в классах функция `super()`, в функциях `Item.call()`).

    ## Использованные источники
- [MoodleUSM](https://moodle.usm.md/mod/page/view.php?id=300750)
- [Stack Overflow](https://ru.stackoverflow.com/questions/789389/Как-в-markdown-сделать-ссылку-для-перехода-к-заголовку)
- [GitHub](https://gist.github.com/asabaylus/3071099#start-of-content)