import React, { useState } from 'react';
import styles from './NewTask.module.css';
import axios from 'axios';

const NewTask = ({ onTaskAdded }) => {
    const [task, setTask] = useState("");

    const handleTextChange = (event) => {
        setTask(event.target.value);
    }

    const handleTaskSubmit = () => {
        if (task.length === 0) {
            window.alert("Please enter a task!");
        } else {
            let newTask = {
                taskName: task,
                isCompleted: false
            }
            axios
                .post('http://localhost:5000/toDos', newTask)
                .then((response) => {
                    const newTaskId = response.data._id;
                    newTask = {
                        _id: newTaskId,
                        taskName: task,
                        isCompleted: false
                    }
                    setTask("");
                    onTaskAdded(newTask);
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    return (
        <div className={styles.addTask}>
            <h2>New Task</h2>
            <input
                type="text"
                className={styles.inputTask}
                onChange={handleTextChange}
                placeholder="Add New Task"
                value={task}
            />
            <button
                className={styles.addTaskButton}
                onClick={handleTaskSubmit}
            >
                Add Task
            </button>
        </div>
    );
}

export default NewTask;
