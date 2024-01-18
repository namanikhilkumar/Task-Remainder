const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/tasks', (req, res) => {
    fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const tasks = JSON.parse(data);
        res.json(tasks);
    });
});

app.post('/tasks', (req, res) => {
    const newTask = req.body;

    fs.readFile('tasks.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const tasks = JSON.parse(data);
        tasks.push(newTask);

        fs.writeFile('tasks.json', JSON.stringify(tasks), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            res.json(tasks);
        });
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
