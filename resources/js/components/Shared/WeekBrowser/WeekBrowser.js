import React, { useContext, useEffect } from "react";
import moment from "moment";
import "./WeekBrowser.css";

import LanguageContext from "../Context/LanguageContext";
import textContent from "../../../language.json";

const WeekBrowser = ({ currentWeek, setCurrentWeek, toCurrentWeek }) => {
    const { language } = useContext(LanguageContext);
    const currentTextContent = textContent[language].week_browser;
    useEffect(() => {}, [language]);

    const arrowIconNext = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
        </svg>
    );

    const arrowIconPrev = (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
        </svg>
    );

    const addWeek = () => setCurrentWeek(moment(currentWeek).add(1, "week"));
    const subtractWeek = () =>
        setCurrentWeek(moment(currentWeek).subtract(1, "week"));

    const thisWeek = moment().startOf("isoWeek").toString();
    const isCurrent = () => thisWeek == currentWeek.toString();

    return (
        <div className="weeks_container">
            <div className="weeks_btn" onClick={subtractWeek}>
                <span className="weeks_btn_text">
                    {currentTextContent.previous}
                </span>
                <div className="weeks_btn_icon">{arrowIconPrev}</div>
            </div>
            <div className="weeks_selected_week">
                <div>
                    <span className="week_label">
                        {currentTextContent.week_commencing}
                    </span>
                    <span className="week_data">
                        {currentWeek.locale(language).format("D MMMM YYYY")}
                    </span>
                </div>
                {!isCurrent() ? (
                    <span
                        className="return_current_week"
                        onClick={toCurrentWeek}
                    >
                        {currentTextContent.show_current_week}
                    </span>
                ) : (
                    <span className="current_week">
                        {" "}
                        {currentTextContent.current_week}
                    </span>
                )}
            </div>
            <div className="weeks_btn" onClick={addWeek}>
                <span className="weeks_btn_text">
                    {currentTextContent.next}
                </span>
                <div className="weeks_btn_icon">{arrowIconNext}</div>
            </div>
        </div>
    );
};

export default WeekBrowser;
