import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthentication from "../hooks/useAuthentication";
import SettingIcon from "../assets/setting-icon.svg";
import LogOutIcon from "../assets/logout-icon.svg";

function NavBar() {
    const navigate = useNavigate();
    const { token, setToken, saveToken } = useAuthentication();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setToken(false)
        navigate('/register')
    };

    return (
        <div className="nav-bar-container">
            <div className="main-nav-container">
                <button
                    className="nav-component main-nav-component"
                    onClick={() => navigate("/")}
                >
                    DashBoard
                </button>
                <button
                    className="nav-component main-nav-component"
                    onClick={() => navigate("/analysis")}
                >
                    Analysis
                </button>
                <button
                    className="nav-component main-nav-component"
                    onClick={() => navigate("/reminder")}
                >
                    Reminder
                </button>
            </div>
            <div className="sub-nav-container">
                <button className="nav-component">
                    <img className="nav-bar-icons" src={SettingIcon} alt="" />{" "}
                    Setting
                </button>
                <button className="nav-component" onClick={handleLogout}>
                    <img className="nav-bar-icons" src={LogOutIcon} alt="" />
                    Logout
                </button>
            </div>
        </div>
    );
}

export default NavBar;
