import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import useAuthentication from "../../hooks/useAuthentication";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const repeatTime = [
    { value: "One Time", label: "One Time" },
    { value: "Every Day", label: "Every Day" },
    { value: "Every Week", label: "Every Week" },
    { value: "Every Month", label: "Every Month" },
    { value: "Every Year", label: "Every Year" },
];

function ReminderForm({data, handleData}) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { token, url } = useAuthentication();

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios({
            url: url + "/reminders",
            method: "POST",
            headers: {
                authorization: "Bearer " + token,
            },
            data: {
                reminder_name: name,
                price: price,
                repeat: selectedOption.value,
                date: selectedDate.toISOString().slice(0, 10),
                description: description,
            },
        })
            .then((res) => {
                console.log("Expense added successfully:", res.data);
                handleData(res.data)
            })
            .catch((err) => {
                console.error("Error adding expense:", err);
            });
    };

    return (
        <div className="expense-form dashboard-border-radius reminder-form-container">
            <form className="expense-add-form reminder-form" onSubmit={handleSubmit}>
                <h2 className="reminder-form-heading">Remaind Yourself</h2>
                <div className="expense-form-field">
                    <input
                        type="text"
                        placeholder="Reminder Name"
                        name="expenseName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="expense-form-field">
                    <input
                        type="number"
                        placeholder="Price"
                        name="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="expense-form-field">
                    <Select
                        value={selectedOption}
                        onChange={handleChange}
                        options={repeatTime}
                        placeholder="Repeatation Type"
                        className="select-tag"
                    />
                </div>

                <div className="expense-form-field">
                    <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select Date"
                        className="date-picker"
                    />
                </div>

                <div className="expense-form-field">
                    <textarea
                        placeholder="Description of the Reminder"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="add-expense-button expense-form-field"
                >
                    Add Reminder
                </button>
            </form>
        </div>
    );
}

export default ReminderForm;
