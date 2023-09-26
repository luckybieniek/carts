import React, { useContext, useEffect } from "react";
import axios from "axios";
import "./Menu.css";
import Button from "../Shared/Button/Button";

import LoggedUserContext from "../Shared/Context/LoggedUserContext";

import LanguageContext from "../Shared/Context/LanguageContext";
import textContent from "../../language.json";

const Menu = ({ setSelectedMain }) => {
    const loggedUser = useContext(LoggedUserContext);

    const { language } = useContext(LanguageContext);
    const currentTextContent = textContent[language].menu;

    useEffect(() => {}, [language]);

    return (
        <div className="menu">
            <Button
                buttonText={currentTextContent.my_availability}
                onClick={() => {
                    setSelectedMain("showUserAvailability");
                }}
            />
            <Button
                buttonText={currentTextContent.my_schedule}
                onClick={() => {
                    setSelectedMain("showUserSchedule");
                }}
            />
            <Button
                buttonText={currentTextContent.cong_schedule}
                onClick={() => {
                    setSelectedMain("showCongSchedule");
                }}
            />
            <Button
                buttonText={currentTextContent.my_account}
                onClick={() => {
                    setSelectedMain("showMyAccount");
                }}
            />
            <Button
                buttonText={currentTextContent.help}
                onClick={() => {
                    setSelectedMain("showWelcome");
                }}
            />
            {loggedUser.roles?.length >= 1 && (
                <>
                    <Button
                        buttonText={currentTextContent.assign_shifts}
                        color="settings_orange"
                        onClick={() => {
                            setSelectedMain("showAssignShifts");
                        }}
                    />
                    <Button
                        buttonText={currentTextContent.manage_shifts}
                        color="settings_orange"
                        onClick={() => {
                            setSelectedMain("showManageShifts");
                        }}
                    />
                </>
            )}

            {loggedUser.roles?.length === 2 && (
                <>
                    {/* <Button
                        buttonText={currentTextContent.manage_users}
                        color="settings_orange"
                        onClick={() => {
                            setSelectedMain("showManageUsers");
                        }}
                    />
                    <Button
                        buttonText={currentTextContent.cong_settings}
                        color="settings_orange"
                        onClick={() => {
                            setSelectedMain("showCongSettings");
                        }}
                    /> */}
                    <Button
                        buttonText={currentTextContent.administration}
                        color="settings_orange"
                        onClick={() => {
                            setSelectedMain("showAdministration");
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default Menu;
