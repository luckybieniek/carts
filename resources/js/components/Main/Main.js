import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import "./Main.css";

import WelcomePage from "../WelcomePage/WelcomePage";
import UserAvailability from "../UserAvailability/UserAvailability";
import UserSchedule from "../UserSchedule/UserSchedule";
import CongSchedule from "../CongSchedule/CongSchedule";
import AssignShifts from "../AssignShifts/AssignShifts";
import ManageShifts from "../ManageShifts/ManageShifts";
import MyAccount from "../MyAccount/MyAccount";
import Administration from "../Administration/Administration";
// import CongSettings from "../CongSettings/CongSettings";
// import ManageUsers from "../ManageUsers/ManageUsers";

import LanguageContext from "../Shared/Context/LanguageContext";
import textContent from "../../language.json";

const Main = ({ showMain, linkSetShowMain }) => {
    const getWeek = () => moment().startOf("isoWeek");
    const [currentWeek, setCurrentWeek] = useState(getWeek());

    const { language } = useContext(LanguageContext);
    const currentTextContent = textContent[language].main;
    useEffect(() => {}, [language]);

    const toCurrentWeek = () => setCurrentWeek(getWeek());

    const dayNamesTextContent = currentTextContent?.weekdays;

    const dayMap = {
        1: dayNamesTextContent.mon,
        2: dayNamesTextContent.tue,
        3: dayNamesTextContent.wed,
        4: dayNamesTextContent.thu,
        5: dayNamesTextContent.fri,
        6: dayNamesTextContent.sat,
        7: dayNamesTextContent.sun,
    };

    const getDayName = (dayNo) => {
        return dayNo === 1 ? (
            <div>
                <p className="day_name">{dayMap[1]}</p>
                <p className="day_date">{moment(currentWeek).format("LL")}</p>
            </div>
        ) : (
            <div>
                <p className="day_name">{dayMap[dayNo]} </p>
                <p className="day_date">
                    {moment(currentWeek)
                        .add(dayNo - 1, "days")
                        .format("LL")}
                </p>
            </div>
        );
    };

    const getDayNameOnly = (dayNo) => {
        return (
            <div>
                <p className="day_name">{dayMap[dayNo]} </p>
            </div>
        );
    };

    const getDayNameStringOnly = (dayNo) => dayMap[dayNo];

    return (
        <div className="main">
            {showMain === "showWelcome" && (
                <WelcomePage linkSetShowMain={linkSetShowMain} />
            )}
            {showMain === "showUserAvailability" && (
                <UserAvailability
                    currentWeek={currentWeek}
                    setCurrentWeek={setCurrentWeek}
                    getDayName={getDayName}
                    toCurrentWeek={toCurrentWeek}
                />
            )}
            {showMain === "showUserSchedule" && (
                <UserSchedule
                    currentWeek={currentWeek}
                    setCurrentWeek={setCurrentWeek}
                    getDayName={getDayName}
                    toCurrentWeek={toCurrentWeek}
                    linkSetShowMain={linkSetShowMain}
                />
            )}
            {showMain === "showCongSchedule" && (
                <CongSchedule
                    currentWeek={currentWeek}
                    setCurrentWeek={setCurrentWeek}
                    getDayName={getDayName}
                    toCurrentWeek={toCurrentWeek}
                    linkSetShowMain={linkSetShowMain}
                />
            )}
            {showMain === "showMyAccount" && (
                <MyAccount linkSetShowMain={linkSetShowMain} />
            )}
            {showMain === "showAssignShifts" && (
                <AssignShifts
                    currentWeek={currentWeek}
                    setCurrentWeek={setCurrentWeek}
                    getDayName={getDayName}
                    toCurrentWeek={toCurrentWeek}
                />
            )}
            {showMain === "showManageShifts" && (
                <ManageShifts
                    currentWeek={currentWeek}
                    setCurrentWeek={setCurrentWeek}
                    getDayName={getDayName}
                    toCurrentWeek={toCurrentWeek}
                    getDayNameOnly={getDayNameOnly}
                    getDayNameStringOnly={getDayNameStringOnly}
                />
            )}
            {showMain === "showAdministration" && <Administration />}
            {/* {showMain === "showManageUsers" && <ManageUsers />}
            {showMain === "showCongSettings" && <CongSettings />} */}
        </div>
    );
};

export default Main;
