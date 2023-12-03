import express from 'express';
import { PORT, mongodbURL } from './config.js'
import mongoose from 'mongoose';
import cors from "cors";
import { Task } from './models/toDoTask.js'
import { User } from './models/user.js';

const app = express();

app.use(express.json());

app.use(cors());

// app.use(cors
//     ({
//         origin: 'https://localhost:3000',
//         method: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: []
//     })
// );

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
            isCompleted: request.body.isCompleted,
            user: request.body.user
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

app.get('/toDos/:id', async (request, response) => {
    try {
        const id = request.params.id; // Extract the id parameter from the request
        const tasks = await Task.find({ user: id });

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

        if (!result) {
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

        if (!result) {
            return response.status(404).json({ message: 'Task not found' });
        }

        return response.status(200).send({ message: 'Task updated successfully' });
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.post('/login', async (request, response) => {
    try {
        const { email, password } = request.body;
        
        const user = await User.findOne({ email });

        if (user) {
            if (password === user.password) {
                response.send({ message: "Login successful!", user: { id: user._id, name: user.name, email: user.email } });
            } else {
                response.send({ message: "Wrong Credentials!" });
            }
        } else {
            response.send({ message: "User Not Registered!" });
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

app.post('/user', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.email ||
            !request.body.password
        ) {
            return response.status(400).send({
                message: 'Enter all the required fields!'
            });
        }

        const newUser = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
        };

        const user = await User.create(newUser);

        return response.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.get('/user', async (request, response) => {
    try {
        const user = await User.find({});

        return response.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send({ message: error.message });
    }
});

app.get('/user/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const user = await User.findById(id);

        return response.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

app.delete('/user/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await User.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'User not found' });
        }
        return response.status(200).send({ message: 'User deleted successfully' });
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