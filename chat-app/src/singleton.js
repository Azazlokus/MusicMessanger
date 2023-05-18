class DatabaseConnection {
    constructor() {
        if (DatabaseConnection.instance) {
            throw new Error("Ошибка");
        }

        const firebaseConfig = {apiKey: "AIzaSyBsC4V1h_sGbGovYHmDqXy8nGpSSQRvQKQ",
            authDomain: "test-18039.firebaseapp.com",
            databaseURL: "https://test-18039-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "test-18039",
            storageBucket: "test-18039.appspot.com",
            messagingSenderId: "1005674394356",
            appId: "1:1005674394356:web:cc9f2a49998e0f9a2ba4a1"
        };

        DatabaseConnection.instance = this;
    }

    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }

    connect() {
        console.log('Подключение к базе данных...');
        console.log('Подключение установлено!');
    }

    disconnect() {
        console.log('Отключение от базы данных...');
        console.log('Отключение выполнено!');
    }
}

const connection1 = DatabaseConnection.getInstance();
const connection2 = DatabaseConnection.getInstance();

connection1.connect();
connection2.disconnect();

try {
    const connection3 = new DatabaseConnection();
} catch (error) {
    console.log(error.message);
}