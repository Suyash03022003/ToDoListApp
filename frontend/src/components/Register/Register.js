import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Register.module.css';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            axios.post("https://to-do-list-app-plum.vercel.app/user", formData)
                .then(res => {
                    window.alert("Registered Successfully");
                    navigate("/");
                })
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={styles.mainLoginDiv}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h1>Register</h1>
                <div className={styles.userInputWrp} style={{ marginBottom: '5px' }}>
                    <input
                        type="text"
                        name="name"
                        onChange={handleInputChange}
                        className={styles.inputText}
                        required
                    />
                    <span className={styles.floatingLabel}>Enter Name</span>
                </div>
                <div className={styles.userInputWrp}>
                    <input
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        className={styles.inputText}
                        required
                    />
                    <span className={styles.floatingLabel}>Enter Email</span>
                </div>
                <div className={styles.userInputWrp} style={{ marginBottom: '5px' }}>
                    <input
                        type="text"
                        name="password"
                        onChange={handleInputChange}
                        className={styles.inputText}
                        required
                    />
                    <span className={styles.floatingLabel}>Set Password</span>
                </div>
                <Link to="/">Already a User, Login!</Link>
                <input type="submit" id={styles.btn} value="Login" />
            </form>
        </div>
    )
}

export default Register