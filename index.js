const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Middleware для обработки тела запроса в формате JSON
app.use(express.json());
app.get('/users', (req, res) => {
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ошибка сервера', err);
        } else {
            const users = JSON.parse(data);
            res.json(users);
        }
    });
});

// GET запрос для получения информации о конкретном пользователе
app.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ошибка сервера');
        } else {
            const users = JSON.parse(data);
            const user = users.find((u) => u.id === userId);

            if (user) {
                res.json(user);
            } else {
                res.status(404).send('Пользователь не найден');
            }
        }
    });
});

// POST запрос для создания нового пользователя
app.post('/users', (req, res) => {
    const newUser = req.body;

    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ошибка сервера');
        } else {
            const users = JSON.parse(data);
            users.push(newUser);

            fs.writeFile('users.json', JSON.stringify(users), (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Ошибка сервера');
                } else {
                    res.send('Пользователь успешно создан');
                }
            });
        }
    });
});

// PUT запрос для обновления информации о пользователе
app.put('/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ошибка сервера');
        } else {
            let users = JSON.parse(data);
            const userIndex = users.findIndex((u) => u.id === userId);

            if (userIndex !== -1) {
                users[userIndex] = { ...users[userIndex], ...updatedUser };

                fs.writeFile('users.json', JSON.stringify(users), (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Ошибка сервера');
                    } else {
                        res.send('Информация о пользователе обновлена');
                    }
                });
            } else {
                res.status(404).send('Пользователь не найден');
            }
        }
    });
});

// DELETE запрос для удаления пользователя
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;

    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Ошибка сервера');
        } else {
            let users = JSON.parse(data);
            const userIndex = users.findIndex((u) => u.id === userId);

            if (userIndex !== -1) {
                users.splice(userIndex, 1);

                fs.writeFile('users.json', JSON.stringify(users), (err) => {
                    if (err) {
                        console.error(err);
                        res.status(500).send('Ошибка сервера');
                    } else {
                        res.send('Пользователь удален');
                    }
                });
            } else {
                res.status(404).send('Пользователь не найден');
            }
        }
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
