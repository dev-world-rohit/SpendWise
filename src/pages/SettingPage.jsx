import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import { FaArrowLeft } from "react-icons/fa";

function Setting() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const { token, setToken, url } = useAuthentication();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if (token) {
    //         navigate("/");
    //     }
    // }, [token, navigate]);

    useEffect(() => {
        const handleSubmit = async (e) => {
            await axios({
                url: url + "/get_name_phone",
                method: "GET",
                headers: {
                    authorization: "Bearer " + token,
                },
                data: {},
            })
                .then((res) => {
                    setName(res.data.name);
                    setPhone(res.data.phone);
                })
                .catch((err) => {
                    console.error("Error adding expense:", err);
                });
        };

        handleSubmit();
    }, [token, url]);

    const handleRegistration = (e) => {
        e.preventDefault();

        if (!name || !phone) {
            alert("Please fill all fields");
        } else {
            axios({
                url: url + "/change_name_phone",
                method: "POST",
                headers: {
                    authorization: "Bearer " + token,
                },
                data: { name, phone },
            })
                .then((res) => {
                    alert("Phone and Name Changes Successfully")
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };


    const navigateToRegistration = () => {
        navigate("/");
    };

    return (
        <div className="setting-page">
            <h1>
                <div className="login-page">
                    <button
                        onClick={navigateToRegistration}
                        className="anchor-button"
                    >
                        <FaArrowLeft className="setting-arrow-icon" />
                    </button>
                    Setting
                </div>
            </h1>
            <div>
                <button
                    onClick={() => {
                        setToken(false);
                        localStorage.clear();
                        navigate("/forgetpassword")}}
                    anchor-button
                    className="anchor-button setting-anchor-button"
                >
                    Forget Password
                </button>
            </div>
            <div onSubmit={handleRegistration} className="setting-options">
                <form className="setting-form">
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
                    <button type="submit" className="btn primary-btn setting-button">
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Setting;
