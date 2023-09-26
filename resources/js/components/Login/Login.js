import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Login.css";
import logo from "../../../img/lca_logo.png";

const login = ({ onLoginChange }) => {
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [showLoginError, setShowLoginError] = useState(false);

    const emailChangeHandler = (e) => {
        setLoginData({ email: e.target.value, password: loginData.password });
    };
    const passwordChangeHandler = (e) => {
        setLoginData({ email: loginData.email, password: e.target.value });
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();

        axios
            .post("/sign-in", {
                email: loginData.email,
                password: loginData.password,
            })
            .then((res) => onLoginChange())
            .catch((error, statusCode, res) => {
                setShowLoginError(true);
                console.log(error.response);
            });
    };

    return (
        <div className="login">
            <img className="login_logo_img" src={logo} alt="LTA logo" />
            <h3 className="login_title">Logowanie</h3>

            <form className="login_form_container" onSubmit={formSubmitHandler}>
                {showLoginError && (
                    <div className="error_container">
                        <p className="error_text">
                            Nieprawidłowy email i/lub hasło.
                        </p>
                        <p className="error_text"> Spróbuj ponownie.</p>
                    </div>
                )}
                <div className="input_container">
                    <p className="login_input_label">Twój email:</p>
                    <input
                        className="login_input_field"
                        placeholder="email"
                        type="email"
                        onChange={emailChangeHandler}
                    ></input>
                </div>
                <div className="input_container">
                    <p className="login_input_label">Twoje hasło:</p>
                    <input
                        className="login_input_field"
                        placeholder="hasło"
                        type="password"
                        onChange={passwordChangeHandler}
                    ></input>
                </div>

                <input
                    className="login_button"
                    type="submit"
                    value="Zaloguj się"
                ></input>
            </form>
        </div>
    );
};

export default login;
