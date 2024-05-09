import React, { useState, useEffect } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import axios from "axios";
import DashBoradReminderCard from "./DashBoradReminderCard";

function DashBoardReminder() {
    const [reminder, setReminder] = useState([]);
    const { token, url } = useAuthentication();

    useEffect(() => {
        const handleSubmit = async (e) => {
            await axios({
                url: url + "/get_reminder_dashboard",
                method: "GET",
                headers: {
                    authorization: "Bearer " + token,
                },
                data: {},
            })
                .then((res) => {
                    setReminder(res.data);
                })
                .catch((err) => {
                    console.error("Error adding expense:", err);
                });
        };

        handleSubmit();
    }, []);

    return (
        <div>
            <div className="dashboard-reminders dashboard-first-container dashboard-border-radius dashboard-reminder-container">
                {reminder.map((item, index) => (
                    <DashBoradReminderCard
                        key={item.id}
                        date={item.date}
                        name={item.reminder_name}
                    />
                ))}
            </div>
        </div>
    );
}

export default DashBoardReminder;
