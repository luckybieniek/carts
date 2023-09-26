import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

import Login from "./Login/Login";
import Home from "./Home/Home";
import { LoggedUserProvider } from "./Shared/Context/LoggedUserContext";
import { CongSettingsProvider } from "./Shared/Context/CongSettingsContext";
import { LanguageProvider } from "./Shared/Context/LanguageContext";

import "./React.css";

export default function HelloReact() {
    const [loggedIn, setLoggedIn] = useState(location.pathname == "/");

    const [loggedUser, setLoggedUser] = useState({});

    const [minOnShift, setMinOnShift] = useState(2);
    const congSettingsValue = { minOnShift, setMinOnShift };
    // ❗❗👆 TODO:  get these settings from backend once endpoint available!!

    const [language, setLanguage] = useState("pl");
    const languageValue = { language, setLanguage };
    // ❗❗👆 TODO:  put this setting  in cookies!!

    useEffect(() => {
        getLoggedUser();
    }, []);

    useEffect(() => {}, [language]);

    const getLoggedUser = async () => {
        try {
            const response = await axios.get("/user", {
                params: { with: ["roles"] },
            });
            console.log(response.data);
            setLoggedUser(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const loginHandler = () => {
        setLoggedIn(true);
        getLoggedUser();
        getCurrentAvailability();
        history.pushState("", "", "/");
    };

    return (
        <div className="app_container">
            <LoggedUserProvider value={loggedUser}>
                <LanguageProvider value={languageValue}>
                    <CongSettingsProvider value={congSettingsValue}>
                        {!loggedIn ? (
                            <Login onLoginChange={loginHandler} />
                        ) : (
                            <Home />
                        )}
                    </CongSettingsProvider>
                </LanguageProvider>
            </LoggedUserProvider>
        </div>
    );
}

if (document.getElementById("app")) {
    ReactDOM.render(<HelloReact />, document.getElementById("app"));
}
