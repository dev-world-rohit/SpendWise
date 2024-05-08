import React, { useState, useEffect } from "react";
import TagBasedExpense from "./dashboard/TagBasedExpense";
import TotalOverview from "./dashboard/TotalOverview";
import DashBoardReminder from "./dashboard/DashBoardReminder";
import ExpenseAddForm from "./dashboard/ExpenseAddForm";
import useAuthentication from "../hooks/useAuthentication";
import axios from "axios";

function formatDate(date) {
    const formattedDate = new Date(date);

    const options = {
        weekday: "long", // "Monday"
        day: "numeric", // "22"
        month: "long", // "April"
        year: "numeric", // "2024"
    };
    return formattedDate.toLocaleDateString("en-GB", options);
}

function DashBoard() {
    const { token } = useAuthentication();
    const[change, setChange] = useState();
    const [name, setName] = useState("");
    const currentDate = formatDate(new Date());

    useEffect(() => {
        async function handleName() {
            try {
                const response = await axios({
                    url: "http://127.0.0.1:5000/name",
                    method: "GET",
                    headers: {
                        authorization: "Bearer " + token,
                    },
                });
                setName(response.data.name);
            } catch (err) {
                console.error("Error fetching name:", err);
            }
        }

        handleName();
    }, [token]);

    function handleChange(value){
        setChange(value);
    }

    return (
        <div className="main-dashboard-container">
            <div className="main-dashboard-hello">Hello, {name}👋</div>
            <div className="main-dashboard-date">{currentDate}</div>
            <div className="main-dashboard-display-div">
                <div className="sub-dashboard">
                    <TotalOverview />
                    <TagBasedExpense />
                </div>
                <div className="sub-dashboard">
                    <DashBoardReminder />
                    <ExpenseAddForm handleForm={handleChange} />
                </div>
            </div>
        </div>
    );
}

export default DashBoard;
