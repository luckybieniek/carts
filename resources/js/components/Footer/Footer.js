import React, { useState, useEffect, useContext } from "react";
import "./Footer.css";

import Modal from "../Shared/Modal/Modal";
import Button from "../Shared/Button/Button";

import LanguageContext from "../Shared/Context/LanguageContext";
import textContent from "../../language.json";

const Footer = () => {
    const [showModal, setShowModal] = useState(false);

    const { language } = useContext(LanguageContext);
    const currentTextContent = textContent[language].footer;

    useEffect(() => {}, [language]);

    useEffect(() => {
        !showModal;
    }, [showModal]);

    const modalDisplayHandler = () =>
        showModal ? setShowModal(false) : setShowModal(true);

    const modalContent = (
        <div className="modal_content">
            <h1 className="modal_header">
                {currentTextContent.modal_content.header}
            </h1>
            <div className="modal_body">
                <p>{currentTextContent.modal_content.paragraph}</p>
                <Button
                    color="settings_btn"
                    buttonText={currentTextContent.modal_content.return_btn}
                    onClick={modalDisplayHandler}
                />
            </div>
        </div>
    );

    return (
        <div>
            {showModal && (
                <Modal showModal={modalDisplayHandler} content={modalContent} />
            )}
            <div className="footer">
                <span
                    className="footer_paragraph footer_link"
                    onClick={modalDisplayHandler}
                >
                    {currentTextContent.privacy_policy}
                </span>
                <span className="footer_paragraph">
                    {currentTextContent.copyright}
                </span>
            </div>
        </div>
    );
};

export default Footer;
