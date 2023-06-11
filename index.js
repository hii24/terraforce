const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

let users = [];

// Получение списка пользователей
app.get('/users', (req, res) => {
    res.json(users);
});

// Получение информации о конкретном пользователе
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.find((u) => u.id === userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('Пользователь не найден');
    }
});

// Создание нового пользователя
app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.send('Пользователь успешно создан');
});

// Обновление информации о пользователе
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        res.send('Информация о пользователе обновлена');
    } else {
        res.status(404).send('Пользователь не найден');
    }
});

// Удаление пользователя
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.send('Пользователь удален');
    } else {
        res.status(404).send('Пользователь не найден');
    }
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
