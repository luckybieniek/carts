import React, { useState, useEffect, useContext } from "react";
import Button from "../Button/Button";
import "./ShiftCard.css";
import CongSettingsContext from "../Context/CongSettingsContext";
import LanguageContext from "../Context/LanguageContext";
import textContent from "../../../language.json";

const ShiftCard = ({
    location,
    startTime,
    endTime,
    time_slot_id,
    selected,
    day,
    color,
    availability_id,
    shiftCardDataContent,
    availablePublishers,
    publishersOnShift,
}) => {
    const [cardData, setCardData] = useState("");
    const [availablePublishersData, setAvailablePublishersData] = useState({});

    const { minOnShift } = useContext(CongSettingsContext);

    const { language } = useContext(LanguageContext);
    const currentTextContent = textContent[language].shift_card;

    useEffect(() => {
        setCardData(shiftCardDataContent);
        setAvailablePublishersData(availablePublishers);
    }, [availablePublishers]);

    // ❗❗ BELOW ONLY IN CASE WE USE 'ALWAYS AVAILABLE' OPTION:
    // const statusColorMap = {
    //     // 1: currentTextContent.my_availability.status_available,
    //     // 2: currentTextContent.my_availability.status_always_available,
    //     1: "dostépny",
    //     2: "zawsze dostépny",
    //     // 3: "Niedostępny",
    // };
    // const getStatusName = (statusColorNo) =>
    //     statusColorMap[statusColorNo] || "";

    // const myAvailabilityDataContent = (
    //     <div className={`shiftcard_row ${color === null && "hide_status"}`}>
    //         <div className="status_container_user">
    //             <span className="status">{getStatusName(color)}</span>
    //             <span>
    //                 {currentTextContent.my_availability.status_available}
    //             </span>
    //         </div>
    //     </div>
    // );

    const myAvailabilityDataContent = (
        <div className={`shiftcard_row ${color === null && "hide_status"}`}>
            <div className="status_container_user">
                <span className="status">
                    {" "}
                    {currentTextContent.my_availability.status_available}
                </span>
            </div>
        </div>
    );

    const assignShiftsDataContent = (
        <div className={`shiftcard_row`}>
            <div className="status_divider_line">
                <div className="status_container_admin">
                    <span className="status_label">
                        {currentTextContent.assign_shifts.available}
                        {availablePublishersData?.length}
                    </span>
                </div>
                <div className="status_container_admin">
                    <span className="status_label">
                        {currentTextContent.assign_shifts.assigned}
                        {publishersOnShift?.length}
                    </span>
                </div>
                <div className="status_divider_line">
                    <div className="status">
                        {publishersOnShift?.map((publisher) => (
                            <p
                                className="status_publisher_name"
                                key={publisher.id}
                            >
                                {publisher.user.name}
                            </p>
                        ))}
                    </div>
                    {color === 2 && (
                        <div className={"status_label"}>
                            <p className="status_alert">
                                {
                                    currentTextContent.assign_shifts
                                        .status_incomplete
                                }
                            </p>
                        </div>
                    )}

                    {color === 5 && (
                        <div className={"status_label"}>
                            <p className="status_alert">
                                {
                                    currentTextContent.assign_shifts
                                        .status_not_enough_available
                                }
                            </p>
                        </div>
                    )}

                    {color === null && (
                        <div className={"status_label"}>
                            <p className="status_alert">
                                {
                                    currentTextContent.assign_shifts
                                        .status_none_available
                                }
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const congScheduleDataContent = (
        <div className={`shiftcard_row ${color === null && "hide_status"}`}>
            <div className="status_container_admin">
                <div className="status_divider_line">
                    <div className="status">
                        {publishersOnShift?.map((publisher) => (
                            <p key={publisher.id}>{publisher.user.name}</p>
                        ))}
                    </div>
                    {publishersOnShift?.length < minOnShift && (
                        <div className="status_label">
                            <p className="status_alert">
                                {currentTextContent.cong_schedule.incomplete}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    const userScheduleDataContent = (
        <div className={`shiftcard_row ${color === null && "hide_status"}`}>
            <div className="status_container_admin">
                <div className="status">
                    {publishersOnShift?.map((publisher) => (
                        <p key={publisher.id}>{publisher.user.name}</p>
                    ))}
                </div>
                {publishersOnShift?.length < minOnShift && (
                    <div className="status_label">
                        <p className="status_alert">
                            {currentTextContent.user_schedule.incomplete}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );

    const manageShiftsDataContent = (
        <div className={`shiftcard_row`}>
            <div className="status_container_admin">
                <span className="delete_shift">
                    {" "}
                    {currentTextContent.manage_shift.delete_shift}
                </span>
            </div>
        </div>
    );

    return (
        <div
            className={`shiftcard color${color}`}
            onClick={() =>
                selected(
                    location?.name,
                    startTime,
                    endTime,
                    time_slot_id,
                    day,
                    availability_id,
                    availablePublishersData,
                    publishersOnShift
                )
            }
        >
            <div className="shiftcard_container">
                <div className="shiftcard_row">
                    <div className="shiftcard_location">{location?.name}</div>
                </div>
                <div className="shiftcard_row">
                    <div className="shiftcard_hours">
                        {startTime} - {endTime}
                    </div>
                </div>

                {cardData === "myAvailability"
                    ? myAvailabilityDataContent
                    : cardData === "assignShifts"
                    ? assignShiftsDataContent
                    : cardData === "congSchedule"
                    ? congScheduleDataContent
                    : cardData === "userSchedule"
                    ? userScheduleDataContent
                    : cardData === "manageShifts"
                    ? manageShiftsDataContent
                    : ``}

                {/* BELOW TEMPORARY >> FOR REF ONLY */}
                {/* <div className="shiftcard_row">
                    <div className="shiftcard_id">shift_id: {time_slot_id}</div>
                </div> */}
            </div>
        </div>
    );
};

export default ShiftCard;
