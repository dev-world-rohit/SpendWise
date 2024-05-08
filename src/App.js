import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpForm from "./pages/SignUpForm";
import LoginForm from "./pages/LoginForm";
import useAuthentication from "./hooks/useAuthentication";
import DashBoardPage from "./pages/DashBoardPage";
import AnalysisPage from "./pages/AnalysisPage";
import ReminderPage from "./pages/ReminderPage";

function App() {
    const { token, getToken } = useAuthentication();

    useEffect(() => {
        getToken();
    }, [token]);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<SignUpForm />} />
                    <Route
                        path="/"
                        element={
                            token ? (
                                <DashBoardPage />
                            ) : (
                                <Navigate to="/register" />
                            )
                        }
                    />
                    {/* <Route path="/" element={<DashBoardPage />} /> */}
                    <Route path="/analysis" element={<AnalysisPage />} />
                    <Route path="/reminder" element={<ReminderPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
