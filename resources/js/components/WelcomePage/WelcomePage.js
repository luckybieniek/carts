import React, { useContext, useEffect, useState } from "react";

import "./WelcomePage.css";
import "../Shared/Section.css";

import LoggedUserContext from "../Shared/Context/LoggedUserContext";

import LanguageContext from "../Shared/Context/LanguageContext";
import textContent from "../../language.json";

const WelcomeScreen = () => {
    const loggedUser = useContext(LoggedUserContext);

    const { language } = useContext(LanguageContext);
    const currentTextContent = textContent[language].welcome;

    return (
        <div className="welcome_home">
            <h3 className="section_header">
                {currentTextContent.welcome} {loggedUser.name?.split(" ")[0]}!
            </h3>
            <p className="instructions_text">
                {currentTextContent.paragraph_1}
            </p>
            <p className="instructions_text">
                {currentTextContent.paragraph_2}
            </p>
        </div>
    );
};

export default WelcomeScreen;
