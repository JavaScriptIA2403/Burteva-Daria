// Шаг 1. Создание класса Item

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
  
  // Шаг 2. Создание класса Weapon
  
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
  
  // Шаг 3. Тестирование
  
  // Создаем несколько предметов
  const sword = new Item("Steel Sword", 3.5, "rare");
  console.log(sword.getInfo());  // Информация о предмете
  
  const shield = new Item("Shield", 5.0, "common");
  console.log(shield?.getInfo());  // Информация о щите
  
  const axe = new Weapon("Battle Axe", 6.0, "rare", 25, 80);
  console.log(axe?.getInfo());  // Информация о топоре
  axe.use();
  axe.use();  // Используем топор дважды
  console.log(`Axe durability after use: ${axe?.durability}`);
  axe.repair();  // Ремонтируем топор
  console.log(`Axe durability after repair: ${axe?.durability}`);
  
  // Шаг 4. Переписывание с использованием функций-конструкторов
  
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
  
  // Тестирование функций-конструкторов
  
  const swordFunc = new WeaponFunc("Steel Sword (Func)", 3.5, "rare", 20, 100);
  console.log(swordFunc.getInfo());  // Информация о предмете через функцию-конструктор
  swordFunc.use();  // Используем оружие
  console.log(`Weapon durability after use: ${swordFunc.durability}`);
  swordFunc.repair();  // Ремонтируем оружие
  console.log(`Weapon durability after repair: ${swordFunc.durability}`);