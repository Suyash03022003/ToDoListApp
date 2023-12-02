import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar.js';
import NewTask from '../NewTask/NewTask.js';
import styles from './ToDoList.module.css';
import axios from 'axios';

const ToDoList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);

    const sortedTasks = tasks.slice().sort((a, b) => {
        if (a.isCompleted === b.isCompleted) {
            return 0;
        }
        return a.isCompleted ? 1 : -1;
    });

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://to-do-list-app-plum.vercel.app/toDos')
            .then((response) => {
                setTasks(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const deleteTask = (id) => {
        axios
            .delete(`https://to-do-list-app-plum.vercel.app/toDos/${id}`)
            .then((response) => {
                setTasks(tasks.filter(task => task._id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const handleTaskAdded = (newTask) => {
        setTasks([...tasks, newTask]);
    }

    const toggleCompletion = (id) => {
        setTasks((prevTasks) => {
            return prevTasks.map((task) => {
                if (task._id === id) {
                    const updatedTask = {
                        ...task,
                        isCompleted: !task.isCompleted
                    };
                    console.log(updatedTask.isCompleted);

                    axios
                        .put(`http://localhost:5000/toDos/${id}`, updatedTask)
                        .then((response) => {
                            console.log(response.data);
                        })
                        .catch((error) => {
                            console.log(error);
                        });

                    return updatedTask;
                }
                return task;
            });
        });
    };

    return (
        <>
            <Navbar />
            <div className={styles.toDoApp}>
                <h2>Tasks</h2>
                {loading ? (
                    <p style={{ marginTop: '40px', fontSize: '20px' }}>Loading</p>
                ) : tasks.length === 0 ? (
                    <p style={{ marginTop: '40px', fontSize: '20px' }}>No Tasks to do</p>
                ) : (
                    <>
                        <div className={styles.toDoTasks}>
                            {sortedTasks.map((task, index) => (
                                <div key={index} className={styles.separateTask}>
                                    <input
                                        className={styles.checkbox}
                                        type='checkbox'
                                        checked={task.isCompleted}
                                        onChange={() => toggleCompletion(task._id)}
                                    />
                                    <p
                                        className={`${styles.taskHeading} ${task.isCompleted ? styles.strikethrough : ''}`}
                                    >
                                        {task.taskName}
                                    </p>
                                    <p onClick={() => deleteTask(task._id)} className={styles.closeButton}>X</p>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <NewTask onTaskAdded={handleTaskAdded} />
        </>
    );
}

export default ToDoList;
