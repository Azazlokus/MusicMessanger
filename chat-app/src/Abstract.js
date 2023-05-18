
class Button {
    render() {
        throw new Error('Метод render() должен быть реализован.');
    }
}

class Checkbox {
    render() {
        throw new Error('Метод render() должен быть реализован.');
    }
}


class MaterialButton extends Button {
    render() {
        console.log('Отрисовка кнопки в стиле Material Design');

    }
}

class MaterialCheckbox extends Checkbox {
    render() {
        console.log('Отрисовка чекбокса в стиле Material Design');
        // Реализация отрисовки чекбокса в стиле Material Design
    }
}


class IOSButton extends Button {
    render() {
        console.log('Отрисовка кнопки в стиле iOS');
        // Реализация отрисовки кнопки в стиле iOS
    }
}

class IOSCheckbox extends Checkbox {
    render() {
        console.log('Отрисовка чекбокса в стиле iOS');
        // Реализация отрисовки чекбокса в стиле iOS
    }
}


class UIFactory {
    createButton() {
        throw new Error('Метод createButton() должен быть реализован.');
    }

    createCheckbox() {
        throw new Error('Метод createCheckbox() должен быть реализован.');
    }
}


class MaterialUIFactory extends UIFactory {
    createButton() {
        return new MaterialButton();
    }

    createCheckbox() {
        return new MaterialCheckbox();
    }
}


class IOSUIFactory extends UIFactory {
    createButton() {
        return new IOSButton();
    }

    createCheckbox() {
        return new IOSCheckbox();
    }
}


function createUI(factory) {
    const button = factory.createButton();
    const checkbox = factory.createCheckbox();

    button.render();
    checkbox.render();
}


console.log('=== Создание UI в стиле Material Design ===');
const materialUIFactory = new MaterialUIFactory();
createUI(materialUIFactory);


console.log('=== Создание UI в стиле iOS ===');
const iosUIFactory = new IOSUIFactory();
createUI(iosUIFactory);
