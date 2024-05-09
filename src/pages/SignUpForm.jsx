import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import registration from "../assets/registration.svg";

function SignUpForm() {
    const [activate, setActivate] = useState(true);
    const [otp, setOtp] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [error, setError] = useState(null);

    const { token, setToken, saveToken, url } = useAuthentication();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token]);

    const handleRegistration = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
        }

        if (!name || !phone || !email || !password) {
            alert("Please fill all fields");
        } else {
            axios({
                url: url + "/signup",
                method: "POST",
                headers: {
                    authorization: "bearer",
                },
                data: { name, phone, email, password, otp },
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

    const handleOtp = (e) => {
        e.preventDefault();

        axios({
            url: url + "/otp",
            method: "POST",
            headers: {
                authorization: "asdf",
            },
            data: { email },
        })
            .then((res) => {
                if (res.data.error) {
                    alert(res.data.error);
                } else {
                    setActivate(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const navigateToRegistration = () => {
        navigate("/login");
    };

    return (
        <div className="registration-container">
            {activate && (
                <div className="registration-form-div half-size-div">
                    <form onSubmit={handleOtp} className="registration-form">
                        <h1 className="main-heading">Register</h1>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />

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

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <button type="submit" className="btn primary-btn">
                            Register
                        </button>
                    </form>
                    <div className="login-page">
                        Already Registered?
                        <button
                            onClick={navigateToRegistration}
                            className="anchor-button"
                        >
                            Login
                        </button>
                    </div>
                </div>
            )}
            {!activate && (
                <div className="registration-otp-div">
                    <form
                        onSubmit={handleRegistration}
                        className="registration-form"
                    >
                        <h1 className="main-heading">OTP Verification</h1>
                        <input
                            type="text"
                            placeholder="OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />

                        <button type="submit" className="btn primary-btn">
                            Verify
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default SignUpForm;
