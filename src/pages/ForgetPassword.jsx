import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";

function ForgetPassword() {
    const [activate, setActivate] = useState(true);
    const [otp, setOtp] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");

    const { token, setToken, saveToken, url } = useAuthentication();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const handleRegistration = (e) => {
        e.preventDefault();

        if (!email) {
            alert("Please fill all fields");
        } else {
            axios({
                url: url + "/forget_password_login",
                method: "POST",
                headers: {
                    authorization: "bearer",
                },
                data: { email, otp, password },
            })
                .then((res) => {
                    setToken(res.data.access_token);
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
            url: url + "/forget_password_otp",
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

    return (
        <div className="registration-container">
            {activate && (
                <div className="registration-form-div half-size-div">
                    <form onSubmit={handleOtp} className="registration-form">
                        <h1 className="main-heading">Forget Password</h1>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn primary-btn">
                            Register
                        </button>
                    </form>
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

                        <input
                            type="text"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Confirm Password"
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <button type="submit" className="btn primary-btn">
                            Confirm
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ForgetPassword;
