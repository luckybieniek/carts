import React, { useEffect, useContext } from "react";
import axios from "axios";
import "./Header.css";
import logo from "../../../img/lca_logo.png";

import LoggedUserContext from "../Shared/Context/LoggedUserContext";

import LanguageContext from "../Shared/Context/LanguageContext";
import textContent from "../../language.json";

const Header = () => {
    const loggedUser = useContext(LoggedUserContext);

    const { language, setLanguage } = useContext(LanguageContext);
    const currentTextContent = textContent[language].header;

    useEffect(() => {}, [language]);

    const logoutHandler = () => {
        axios
            .delete("/sign-out")
            .then((res) => location.reload())
            .catch((error, statusCode, res) => console.log(error.response));
    };

    return (
        <div className="header">
            <h3>
                <img className="header_logo_img" src={logo} alt="LTA logo" />{" "}
            </h3>

            <div className="header_login_controls">
                <span className="header_logged_text">
                    {currentTextContent.language}
                    <select
                        onChange={(e) => {
                            setLanguage(e.target.value);
                            console.log(language);
                        }}
                        defaultValue={language}
                    >
                        <option value="pl">
                            {currentTextContent.select_language_pl}
                        </option>
                        <option value="en">
                            {currentTextContent.select_language_en}
                        </option>
                    </select>
                </span>{" "}
                <span className="header_logged_text">
                    {currentTextContent.logged_as}
                    <span className="header_logged_user">
                        {loggedUser.name}
                    </span>
                </span>{" "}
                <button className="header_logout_btn" onClick={logoutHandler}>
                    {currentTextContent.log_out}
                </button>
            </div>
        </div>
    );
};

export default Header;
