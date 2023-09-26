import React from "react";
import "./Button.css";

const Button = ({ color, onClick, buttonText }) => {
    return (
        <button className={"button " + color} onClick={onClick}>
            {buttonText}
        </button>
    );
};

export default Button;
