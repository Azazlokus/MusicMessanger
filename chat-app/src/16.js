
class Character {
    constructor(name, type, health, strength) {
        this.name = name;
        this.type = type;
        this.health = health;
        this.strength = strength;
    }

    getInfo() {
        console.log(`Character: ${this.name}, Type: ${this.type}, Health: ${this.health}, Strength: ${this.strength}`);
    }
}


class CharacterFactory {
    constructor() {
        this.characters = {};
    }

    getCharacter(type) {
        if (!this.characters[type]) {
            switch (type) {
                case 'warrior':
                    this.characters[type] = new Character('Warrior', 'Warrior', 100, 10);
                    break;
                case 'mage':
                    this.characters[type] = new Character('Mage', 'Mage', 80, 5);
                    break;
                case 'archer':
                    this.characters[type] = new Character('Archer', 'Archer', 90, 8);
                    break;
                default:
                    throw new Error(`Invalid character type: ${type}`);
            }
        }
        return this.characters[type];
    }
}

// Использование
const characterFactory = new CharacterFactory();

// Создание персонажей с общими характеристиками
const warrior1 = characterFactory.getCharacter('warrior');
const warrior2 = characterFactory.getCharacter('warrior');
const mage1 = characterFactory.getCharacter('mage');
const mage2 = characterFactory.getCharacter('mage');
const archer1 = characterFactory.getCharacter('archer');
const archer2 = characterFactory.getCharacter('archer');

// Вывод информации о персонажах
warrior1.getInfo();
warrior2.getInfo();
mage1.getInfo();
mage2.getInfo();
archer1.getInfo();
archer2.getInfo();
