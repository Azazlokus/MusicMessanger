
class Calculator {
    constructor(strategy) {
        this.strategy = strategy;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    executeStrategy(num1, num2) {
        return this.strategy.execute(num1, num2);
    }
}

// класс стратегии
class OperationStrategy {
    execute(num1, num2) {
        throw new Error('Метод execute() должен быть реализован.');
    }
}

// Конкретная стратегия сложения
class AdditionStrategy extends OperationStrategy {
    execute(num1, num2) {
        return num1 + num2;
    }
}

// Конкретная стратегия вычитания
class SubtractionStrategy extends OperationStrategy {
    execute(num1, num2) {
        return num1 - num2;
    }
}

// Конкретная стратегия умножения
class MultiplicationStrategy extends OperationStrategy {
    execute(num1, num2) {
        return num1 * num2;
    }
}



const calculator = new Calculator(new AdditionStrategy());

// Выполнение операции сложения
const result1 = calculator.executeStrategy(5, 3);
console.log(`Результат сложения: ${result1}`);

// Переключение на стратегию вычитания
calculator.setStrategy(new SubtractionStrategy());

// Выполнение операции вычитания
const result2 = calculator.executeStrategy(8, 4);
console.log(`Результат вычитания: ${result2}`);

// Переключение на стратегию умножения
calculator.setStrategy(new MultiplicationStrategy());

// Выполнение операции умножения
const result3 = calculator.executeStrategy(6, 2);
console.log(`Результат умножения: ${result3}`);
