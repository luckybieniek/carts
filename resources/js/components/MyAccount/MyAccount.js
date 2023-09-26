import React, { useState, useEffect, useContext } from "react";

import "../Shared/Section.css";

import Spinner from "../Shared/Spinner/Spinner";
import Button from "../Shared/Button/Button";
import Modal from "../Shared/Modal/Modal";

import LoggedUserContext from "../Shared/Context/LoggedUserContext";
import CongSettingsContext from "../Shared/Context/CongSettingsContext";
import LanguageContext from "../Shared/Context/LanguageContext";
import textContent from "../../language.json";
import axios from "axios";

const MyAccount = () => {
    const loggedUser = useContext(LoggedUserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [showModalChangeUserDetails, setShowModalChangeUserDetails] =
        useState(false);

    const [admins, setAdmins] = useState({});
    const [submittingNewData, setSubmittingNewData] = useState(false);

    const [updatedUserData, setUpdatedUserData] = useState({
        name: loggedUser.name,
        phone_number: loggedUser.phone_number,
    });

    const { language, setLanguage } = useContext(LanguageContext);
    const currentTextContent = textContent[language].my_account;

    useEffect(() => {
        !showModalChangeUserDetails && getAdmins();
    }, []);

    useEffect(() => {}, [
        language,
        admins,
        showModalChangeUserDetails,
        submittingNewData,
    ]);

    const getAdmins = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get("entity/user", {
                params: { with: ["roles"] },
            });

            console.log(response.data);

            const superAdmins = [];
            const shiftAdmins = [];
            const publishers = [];
            // below logic based on superAdmins always also being shiftAdmins

            response.data.forEach((user) =>
                user.roles?.length === 2
                    ? superAdmins.push(user)
                    : user.roles?.length === 1
                    ? shiftAdmins.push(user)
                    : publishers.push(user)
            );

            console.log(superAdmins);
            console.log(shiftAdmins);

            setAdmins({
                super_admins: superAdmins,
                shift_admins: shiftAdmins,
            });
        } catch (error) {
            console.log(error.response);
        } finally {
            setIsLoading(false);
        }
    };

    // ❗ TODO: finish logic

    const changeUserDetailsModalDisplayHandler = () => {
        showModalChangeUserDetails
            ? setShowModalChangeUserDetails(false)
            : setShowModalChangeUserDetails(true);

        // setUpdatedUserData({
        //     name: loggedUser.name,
        //     phone_number: loggedUser.phone_number,
        // });
    };

    const updateNameHandler = (e) => {
        setUpdatedUserData({ ...updatedUserData, name: e.target.value });
    };
    const updatePhoneHandler = (e) => {
        setUpdatedUserData({
            ...updatedUserData,
            phone_number: e.target.value,
        });
    };

    const submmitNewUserDetailsHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setSubmittingNewData(true);
        try {
            const response = await axios.put(`entity/user/`, null, {
                params: {
                    id: loggedUser.id,
                    name: updatedUserData.name,
                    phone_number: updatedUserData.phone_number,
                },
            });

            console.log(response);
        } catch (error) {
            console.log(error.response);
        } finally {
            setIsLoading(false);
            changeUserDetailsModalDisplayHandler();
            setSubmittingNewData(false);
            window.location.reload(false);
        }
    };

    // ❗ TODO: style the below
    const changeUserDetailsModalContent = (
        <div className="modal_content">
            <h1 className="modal_header">
                {currentTextContent.modal_content.header}
            </h1>
            <div className="modal_body">
                <form onSubmit={submmitNewUserDetailsHandler}>
                    <p>{currentTextContent.name}</p>
                    <input
                        placeholder={loggedUser.name}
                        type="text"
                        value={updatedUserData.name}
                        onChange={updateNameHandler}
                    ></input>

                    <p>{currentTextContent.phone}</p>
                    <input
                        placeholder={loggedUser.name}
                        type="text"
                        value={updatedUserData.phone_number}
                        onChange={updatePhoneHandler}
                    ></input>
                    <br></br>
                    <input
                        type="submit"
                        value={
                            currentTextContent.modal_content.update_details_btn
                        }
                        className="settings_btn"
                    ></input>
                    <p>{currentTextContent.modal_content.caution_refresh}</p>
                </form>
                <div className="modal_options_container_columns">
                    <Button
                        color="settings_btn"
                        buttonText={currentTextContent.modal_content.return_btn}
                        onClick={changeUserDetailsModalDisplayHandler}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {showModalChangeUserDetails && (
                <Modal
                    showModal={changeUserDetailsModalDisplayHandler}
                    content={changeUserDetailsModalContent}
                />
            )}

            <div className="section_container">
                <h3 className="section_header">
                    {currentTextContent.title_header}
                    <div className="section_line_divider"></div>
                </h3>

                <div className="settings_container">
                    <div className="settings_section">
                        <p className="settings_header">
                            {currentTextContent.header_user_info}
                        </p>
                        {isLoading && <Spinner />}
                        <div className="settings_data_section">
                            <p className="settings_label">
                                {" "}
                                {currentTextContent.name}
                            </p>
                            <p className="settings_data">{loggedUser.name} </p>
                        </div>
                        <div className="settings_data_section">
                            <p className="settings_label">
                                {currentTextContent.phone}
                            </p>
                            <p className="settings_data">
                                {loggedUser.phone_number}{" "}
                            </p>
                        </div>
                        <div className="settings_data_section">
                            <p className="settings_label">
                                {currentTextContent.congregation}
                            </p>
                            {/* ❗ TODO: make dynamic */}
                            <p className="settings_data">
                                Sheffield Polish
                                <span className="dev_red">
                                    [*WIP - make dynamic]
                                </span>
                            </p>
                        </div>
                        <br></br>
                        <div className="settings_data_section">
                            <Button
                                color="settings_btn"
                                buttonText={
                                    currentTextContent.change_details_btn
                                }
                                onClick={changeUserDetailsModalDisplayHandler}
                            />
                        </div>
                    </div>
                    <div className="settings_section">
                        <p className="settings_header">
                            {currentTextContent.header_acc_settings}
                        </p>
                        {isLoading && <Spinner />}
                        <div className="settings_data_section">
                            <p className="settings_label">
                                {currentTextContent.role}
                            </p>
                            <p className="settings_data">
                                {loggedUser.roles?.length === 2
                                    ? "Administrator zboru"
                                    : loggedUser.roles?.length === 1
                                    ? "Administrator zmian"
                                    : "Głosiciel"}
                            </p>
                        </div>
                        <div className="settings_data_section">
                            <p className="settings_label">
                                {currentTextContent.shift_admins}
                            </p>

                            <ul className="settings_data">
                                {admins.shift_admins?.map((admin) => (
                                    <li>
                                        {admin.name} (
                                        {currentTextContent.admin_contact}
                                        {admin.phone_number})
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="settings_data_section">
                            <p className="settings_label">
                                {currentTextContent.cong_admins}
                            </p>

                            <ul className="settings_data">
                                {admins.super_admins?.map((admin) => (
                                    <li>
                                        {admin.name} (
                                        {currentTextContent.admin_contact}
                                        {admin.phone_number})
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="settings_data_section">
                            <p className="settings_label">
                                {currentTextContent.email}
                            </p>
                            <p className="settings_data">{loggedUser.email}</p>
                        </div>
                        <div className="settings_data_section">
                            <p className="settings_label">
                                {currentTextContent.language}{" "}
                                <span className="dev_red">
                                    [*WIP - via cookies]
                                </span>
                            </p>

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
                        </div>
                        <p className="settings_link">
                            {currentTextContent.request_change_username}
                            <span className="dev_red">[*WIP]</span>
                        </p>
                        <p className="settings_link">
                            {currentTextContent.request_change_password}
                            <span className="dev_red">[*WIP]</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

/*
{
    const [offeredSlots, setOfferedSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getOfferedSlots();
    }, []);

    const getOfferedSlots = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get("/entity/availability", {
                params: { with: ["locations"] },
            });
            console.log(`availability response: ${response}`);
            setOfferedSlots(response.data);
        } catch (error) {
            console.log(error.response);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {isLoading && <Spinner />}

            <div>*WIP*</div>
        </div>
    );
};
*/
export default MyAccount;
