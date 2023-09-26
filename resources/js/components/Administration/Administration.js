import React, { useState, useEffect, useContext } from "react";

import "../Shared/Section.css";
import axios from "axios";
import Spinner from "../Shared/Spinner/Spinner";
import Modal from "../Shared/Modal/Modal";
import Button from "../Shared/Button/Button";

import LoggedUserContext from "../Shared/Context/LoggedUserContext";
import CongSettingsContext from "../Shared/Context/CongSettingsContext";
import LanguageContext from "../Shared/Context/LanguageContext";
import textContent from "../../language.json";

const Administration = () => {
    const loggedUser = useContext(LoggedUserContext);

    const { language } = useContext(LanguageContext);
    const currentTextContent = textContent[language].administration;
    useEffect(() => {}, [language]);

    const [isLoading, setIsLoading] = useState(false);

    const [users, setUsers] = useState({});

    // User options states:
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [updatingUser, setUpdatingUser] = useState(false);
    const [newUserRole, setNewUserRole] = useState();

    // Add new user states:
    const [newUserData, setNewUserData] = useState({
        name: "",
        email: "",
        active: 1,
        organisation_id: loggedUser?.organisation_id,
    });
    const [submittingNewUser, setSubmittingNewUser] = useState(false);
    const [showNewUserFormError, setShowNewUserFormError] = useState(false);

    // Cong options states:
    const { minOnShift, setMinOnShift } = useContext(CongSettingsContext);

    useEffect(() => {}, [selectedUser, users, updatingUser]);

    useEffect(() => {
        !showModal && getUsers();
    }, [submittingNewUser, showModal]);

    const getUsers = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get("entity/user", {
                params: { with: ["roles"] },
            });

            console.log(response.data);

            const superAdmins = [];
            const shiftAdmins = [];
            const publishers = [];

            // below logic based on superAdmins automatically also being shiftAdmins
            response.data.forEach((user) =>
                user.roles?.length === 2
                    ? superAdmins.push(user)
                    : user.roles?.length === 1
                    ? shiftAdmins.push(user)
                    : publishers.push(user)
            );

            setUsers({
                super_admins: superAdmins,
                shift_admins: shiftAdmins,
                publishers: publishers,
            });
        } catch (error) {
            console.log(error.response);
        } finally {
            setIsLoading(false);
        }
    };

    const newUserNameDataHandler = (e) => {
        setNewUserData({ ...newUserData, name: e.target.value });
        console.log(newUserData);
    };

    const newUserEmailDataHandler = (e) => {
        setNewUserData({ ...newUserData, email: e.target.value });
        console.log(newUserData);
    };

    const newUserSumbmitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setSubmittingNewUser(true);
        console.log(newUserData);
        try {
            const response = await axios.post("/entity/user", {
                ...newUserData,
            });
            console.log(response);
            setSubmittingNewUser(false);
            setNewUserData({
                name: "",
                email: "",
                active: 1,
                organisation_id: loggedUser.organisation_id,
            });
        } catch (error) {
            console.log(error.response);

            setShowNewUserFormError(true);
        } finally {
            setIsLoading(false);
        }
    };

    //User management modal:

    const rolesOptions = [
        { 0: "Głosiciel" },
        { 1: "Administrator zboru" },
        { 2: "Administrator zmian" },
    ];

    const modalDisplayHandler = (user) => {
        setSelectedUser(user);
        // setCurrentRoles(selectedUser.roles);
        // console.log(currentRoles);

        showModal ? setShowModal(false) : setShowModal(true);
    };

    const submitNewUserRoleHandler = async (roleCode) => {
        setIsLoading(true);
        setUpdatingUser(true);

        // ❗❗ TODO: expand logic to add/remove roles
        if (roleCode !== 0) {
            try {
                await axios.post("/user-role", {
                    user_id: selectedUser.id,
                    role_id: roleCode,
                });
                console.log(response);
            } catch (error) {
                console.log(error.response);
            } finally {
                setUpdatingUser(false);
                setIsLoading(false);
            }
        } else {
            try {
                await axios.delete(
                    `/user-role/${selectedUser.id}`
                    // {
                    //     params: {
                    //         user_id: selectedUser.id,
                    //     },
                    // }
                );
                console.log(response);
                console.log("ZEROO");
            } catch (error) {
                console.log(error.response);
            } finally {
                setUpdatingUser(false);
                setIsLoading(false);
            }
        }
    };

    // const deleteUserRoleHandler = async (roleCode) => {
    //     setIsLoading(true);
    //     setUpdatingUser(true);

    //     // ❗❗ TODO: expand logic to add/remove roles

    //     try {
    //         await axios.delete("/user-role", {
    //             user_id: selectedUser.id,
    //             role_id: { roleCode },
    //         });
    //     } catch (error) {
    //         console.log(error.response);
    //     } finally {
    //         setUpdatingUser(false);
    //         setIsLoading(false);
    //     }
    // };

    const deactivateUserHandler = async () => {
        setIsLoading(true);
        setUpdatingUser(true);

        try {
            const response = await axios.put("/entity/user", null, {
                params: { id: selectedUser.id, active: 0 },
            });
            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        } finally {
            setUpdatingUser(false);
            setIsLoading(false);
        }
    };

    // ❗❗ TODO: Add dynamic language text content once logic completed:
    const modalContent = (
        <div className="modal_content">
            <h1 className="modal_header">
                Opcje użytkownika: {selectedUser.name}{" "}
            </h1>
            <div className="modal_body">
                {/* <div className="modal_options_container">
                    <p>Dodaj uprawnienia (kliknij, żeby dodać):</p>
                    <p
                        className="modal_click_option"
                        onClick={() => submitNewUserRoleHandler(2)}
                    >
                        Administrator Zmian
                    </p>
                    <p
                        className="modal_click_option"
                        onClick={() => submitNewUserRoleHandler(1)}
                    >
                        Administrator Zboru
                    </p>

                    <p
                        className="modal_click_option"
                        onClick={deactivateUserHandler}
                    >
                        Usuń użytkownika (deaktywacja konta)
                    </p>
                </div> */}
                {/*  */}

                <div className="modal_options_container">
                    <select
                        value={
                            selectedUser.roles?.length === 2
                                ? 1
                                : selectedUser.roles?.length === 1
                                ? 2
                                : 0
                        }
                        onChange={(e) => setNewUserRole(e.target.value)}
                    >
                        {rolesOptions.map((role) => (
                            <option value={Object.keys(role)}>
                                {Object.values(role)}
                            </option>
                        ))}
                    </select>

                    <Button
                        color="grey"
                        buttonText="Zmień uprawnienia"
                        onClick={() => submitNewUserRoleHandler(newUserRole)}
                    />
                </div>

                {/*  */}
                <div className="modal_options_container">
                    <p
                        className="modal_click_option"
                        onClick={deactivateUserHandler}
                    >
                        Usuń użytkownika (deaktywacja konta)
                    </p>
                </div>

                <div className="modal_options_container_column">
                    <Button
                        color="grey"
                        buttonText="Wróć"
                        onClick={modalDisplayHandler}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {showModal && (
                <Modal showModal={modalDisplayHandler} content={modalContent} />
            )}

            <div className="section_container">
                <h3 className="section_header">
                    {currentTextContent.title_header}
                </h3>
                <div className="section_line_divider"></div>
                <h3 className="section_header">
                    {currentTextContent.section_manage_users.section_header}
                </h3>
                <div className="settings_container">
                    <div className="settings_section">
                        <p className="settings_header">
                            {
                                currentTextContent.section_manage_users
                                    .settings_active_users.header
                            }
                        </p>
                        <p className="settings_label">
                            {
                                currentTextContent.section_manage_users
                                    .settings_active_users.paragraph
                            }
                        </p>

                        <p className="settings_header"></p>
                        <div className="settings_data_section">
                            {isLoading && <Spinner />}
                            <div className="settings_flex_blank">
                                <div className="settings_data_section">
                                    <p className="settings_subheader">
                                        {
                                            currentTextContent
                                                .section_manage_users
                                                .settings_active_users
                                                .publishers
                                        }
                                    </p>
                                    <ul>
                                        {users.publishers?.map((user) => (
                                            <li
                                                className={
                                                    "settings_data, settings_link"
                                                }
                                                key={user.id}
                                                onClick={() => {
                                                    modalDisplayHandler(user);
                                                }}
                                            >
                                                {user.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="settings_data_section">
                                    <p className="settings_subheader">
                                        {
                                            currentTextContent
                                                .section_manage_users
                                                .settings_active_users
                                                .cong_admins
                                        }
                                    </p>
                                    <ul>
                                        {users.super_admins?.map((user) => (
                                            <li
                                                className={
                                                    "settings_data, settings_link"
                                                }
                                                key={user.id}
                                                onClick={() => {
                                                    modalDisplayHandler(user);
                                                }}
                                            >
                                                {user.name}
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="settings_subheader">
                                        {
                                            currentTextContent
                                                .section_manage_users
                                                .settings_active_users
                                                .shift_admins
                                        }
                                    </p>
                                    <ul>
                                        {users.shift_admins?.map((user) => (
                                            <li
                                                className={
                                                    "settings_data, settings_link"
                                                }
                                                key={user.id}
                                                onClick={() => {
                                                    modalDisplayHandler(user);
                                                }}
                                            >
                                                {user.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="settings_section">
                        <p className="settings_header">
                            {
                                currentTextContent.section_manage_users
                                    .settings_add_user.header
                            }
                        </p>
                        {showNewUserFormError && (
                            <div className="error_container">
                                <p className="error_text">
                                    {
                                        currentTextContent.section_manage_users
                                            .settings_add_user.error
                                    }
                                </p>
                            </div>
                        )}
                        <form onSubmit={newUserSumbmitHandler}>
                            <div className="settings_data_section">
                                <p className="settings_label">
                                    {
                                        currentTextContent.section_manage_users
                                            .settings_add_user.label_name
                                    }
                                </p>
                                <input
                                    className="settings_input_field"
                                    placeholder=""
                                    type="text"
                                    value={newUserData.name}
                                    onChange={newUserNameDataHandler}
                                ></input>
                            </div>

                            <div className="settings_data_section">
                                <p className="settings_label">
                                    {
                                        currentTextContent.section_manage_users
                                            .settings_add_user.label_email
                                    }
                                </p>
                                <input
                                    className="settings_input_field"
                                    placeholder=""
                                    type="email"
                                    value={newUserData.email}
                                    onChange={newUserEmailDataHandler}
                                ></input>
                            </div>

                            <input
                                className="settings_button"
                                type="submit"
                                value={
                                    currentTextContent.section_manage_users
                                        .settings_add_user.add_user_btn
                                }
                            ></input>
                        </form>
                    </div>
                </div>
            </div>
            <h3 className="section_header">
                {currentTextContent.section_cong_settings.section_header}
            </h3>
            <div className="settings_container">
                <div className="settings_section">
                    <p className="settings_header">
                        {" "}
                        {
                            currentTextContent.section_cong_settings
                                .settings_shift_options.header
                        }
                    </p>

                    {/* ❗❗👇 TODO: Send these settings to backend once endpoint available!! */}
                    <div className="settings_data_section">
                        <p className="settings_label">
                            {
                                currentTextContent.section_cong_settings
                                    .settings_shift_options.min_pubs_on_shift
                            }
                            <select
                                defaultValue={minOnShift}
                                onChange={(e) => setMinOnShift(e.target.value)}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <span className="dev_red">
                                **[WIP - use Context]
                            </span>
                        </p>
                        <span className="dev_red">
                            **[WIP - opcje kapitanów??]
                        </span>
                    </div>
                </div>
                <div className="settings_section">
                    {" "}
                    <p className="settings_header">
                        {" "}
                        {
                            currentTextContent.section_cong_settings
                                .settings_privacy_options.header
                        }
                    </p>
                    <div className="settings_data_section">
                        <p className="settings_label">
                            {
                                currentTextContent.section_cong_settings
                                    .settings_privacy_options.show_phone_numbers
                            }{" "}
                            <span className="dev_red">
                                **[WIP - use Context]
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Administration;
