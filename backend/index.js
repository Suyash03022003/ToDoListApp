import express from 'express';
import { PORT, mongodbURL } from './config.js'
import mongoose from 'mongoose';
import cors from "cors";
import { Task } from './models/toDoTask.js'

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Hello World!');
});

app.post('/toDos', async (request, response) => {
    try {
        if (
            !request.body.taskName
        ) {
            return response.status(400).send({
                message: 'Enter the required field!'
            });
        }

        const newTask = {
            taskName: request.body.taskName,
            isCompleted: request.body.isCompleted
        };

        const task = await Task.create(newTask);

        return response.status(201).send(task);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.get('/toDos', async (request, response) => {
    try {
        const tasks = await Task.find({});

        return response.status(200).json(tasks);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.delete('/toDos/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Task.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).json({ message: 'Task Not Found' });
        }
        return response.status(200).send({ message: 'Task deleted successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.put('/toDos/:id', async (request, response) => {
    try {
        if (
            !request.body.taskName
        ) {
            return response.status(400).send({
                message: 'Enter the required field!'
            });
        }

        const { id } = request.params;

        const result = await Task.findByIdAndUpdate(id, request.body);

        if(!result) {
            return response.status(404).json({ message: 'Task not found' });
        }

        return response.status(200).send({ message: 'Task updated successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

mongoose
    .connect(mongodbURL)
    .then(() => {
        console.log('App connected to the database');
        app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
    });