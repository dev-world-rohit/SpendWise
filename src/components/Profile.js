import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthentication from "../hooks/useAuthentication";

function Profile() {
    const [profileData, setProfileData] = useState("");

    const { token, setToken } = useAuthentication();

    useEffect(() => {
        getUsers();
    }, []);

    const email = localStorage.getItem("email");

    function getUsers() {
        axios({
            method: "GET",
            url: `http://127.0.0.1:5000/${email}`,
            headers: {
                Authorization: "Bearer " + token,
            },
        })
            .then((response) => {
                const res = response.data;
                res.access_token && setToken(res.access_token);
                setProfileData(
                    res.email
                );
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response);
                }
            });
    }

    return <div>
        DashBoard
        {profileData}
    </div>;
}

export default Profile;
