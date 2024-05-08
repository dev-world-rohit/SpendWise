import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import useAuthentication from "../../hooks/useAuthentication";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const tags = [
    { value: "Housing", label: "Housing" },
    { value: "Transportation", label: "Transportation" },
    { value: "Food", label: "Food" },
    { value: "Health Care", label: "Health Care" },
    { value: "Personal Care", label: "Personal Care" },
    { value: "Debt", label: "Debt" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Lend", label: "Lend" },
    { value: "Miscellaneous", label: "Miscellaneous" },
];

function ExpenseAddForm({ handleForm }) {
    
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const { token } = useAuthentication();

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios({
            url: "http://127.0.0.1:5000/add_expense",
            method: "POST",
            headers: {
                authorization: "Bearer " + token,
            },
            data: {
                expense_name: name,
                price: price,
                tag: selectedOption.value,
                date: selectedDate.toISOString().slice(0, 10),
                description: description,
            },
        })
            .then((res) => {
                console.log("Expense added successfully:", res.data);
                handleForm(res.data);
            })
            .catch((err) => {
                console.error("Error adding expense:", err);
            });
    };

    return (
        <div className="expense-form dashboard-second-container dashboard-border-radius">
            <form className="expense-add-form" onSubmit={handleSubmit}>
                <div className="expense-form-field">
                    <input
                        type="text"
                        placeholder="Expense Name"
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
                        options={tags}
                        placeholder="Select a tag"
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
                        placeholder="Description of the payment"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="add-expense-button expense-form-field"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default ExpenseAddForm;
