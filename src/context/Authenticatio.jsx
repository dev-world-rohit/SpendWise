import { createContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {


    function getToken() {
        const userToken = localStorage.getItem("token");
        return userToken;
    }

    const [token, setToken] = useState(getToken());

    function saveToken(userToken) {
        localStorage.setItem("token", userToken);
        setToken(userToken);
    }

    function removeToken() {
        localStorage.removeItem("token");
        setToken(null);
    }

    const valueToShare = {
        token,
        setToken,
        getToken,
        saveToken,
        removeToken,
    };

    return (
        <AuthContext.Provider value={valueToShare}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider };
export default AuthContext;
