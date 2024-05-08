import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { token, setToken, saveToken } = useAuthentication();

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    const handleRegistration = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("Please fill all fields");
        } else {
            axios({
                url: "http://127.0.0.1:5000/login",
                method: "POST",
                headers: {
                    authorization: "bearer",
                },
                data: { email, password },
            })
                .then((res) => {
                    setToken(res.data.access_token);
                    localStorage.setItem("email", email);
                    saveToken(res.data.access_token);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    const navigateToRegistration = () => {
        setToken(false);
        navigate('/register');
    };

    return (
        <div className="registration-container">
            <div className="registration-form-div half-size-div">
                <form
                    onSubmit={handleRegistration}
                    className="registration-form"
                >
                    <h1 className="main-heading">Login</h1>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" className="btn primary-btn">
                        Login
                    </button>
                </form>
                <div className="login-page">
                    Create an Account?{" "}
                    <button
                        onClick={navigateToRegistration}
                        anchor-button
                        className="anchor-button"
                    >
                        Register
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
