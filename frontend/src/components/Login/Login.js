import React, { useState } from 'react';
import { useCookies } from "react-cookie";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Login.module.css';

const Login = () => {
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);

    const [formData, setFormData] = useState({
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
            axios.post("https://to-do-list-app-plum.vercel.app/login", formData)
                .then(res => {
                    if (res.data.message === "Login successful!") {
                        setCookie('user', res.data.user, { path: '/' });
                        navigate("/todolist");
                    } else if (res.data.message === "User Not Registered!") {
                        alert(res.data.message);
                        navigate("/register");
                    } else {
                        alert(res.data.message);
                    }
                })
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={styles.mainLoginDiv}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h1>Login</h1>
                <div className={styles.userInputWrp} style={{ marginBottom: '5px' }}>
                    <input
                        type="text"
                        name="email"
                        onChange={handleInputChange}
                        className={styles.inputText}
                        required
                    />
                    <span className={styles.floatingLabel}>Enter Email</span>
                </div>
                <div className={styles.userInputWrp}>
                    <input
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                        className={styles.inputText}
                        required
                    />
                    <span className={styles.floatingLabel}>Enter Password</span>
                </div>
                <Link to="/register">Register Now</Link>
                <input type="submit" id={styles.btn} value="Login" />
            </form>
        </div>
    )
}

export default Login