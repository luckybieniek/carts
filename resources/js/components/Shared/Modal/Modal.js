import React, { useEffect } from "react";
import "./Modal.css";
import Button from "../Button/Button";

const Modal = ({ showModal, content }) => {
    const closeOnESC = (e) => {
        if ((e.charCode || e.keyCode) === 27) {
            showModal();
        }
    };

    useEffect(() => {
        document.body.addEventListener("keydown", closeOnESC);
        return function cleanUp() {
            document.body.removeEventListener("keydown", closeOnESC);
        };
    }, []);

    return <div className="modal">{content}</div>;
};

export default Modal;
