import React, { useState, useEffect, useContext } from "react";

import "../Shared/Section.css";
import axios from "axios";

import ShiftCard from "../Shared/ShiftCard/ShiftCard";
import Spinner from "../Shared/Spinner/Spinner";
import Modal from "../Shared/Modal/Modal";
import Button from "../Shared/Button/Button";
import WeekBrowser from "../Shared/WeekBrowser/WeekBrowser";

import LoggedUserContext from "../Shared/Context/LoggedUserContext";
import CongSettingsContext from "../Shared/Context/CongSettingsContext";
import LanguageContext from "../Shared/Context/LanguageContext";
import textContent from "../../language.json";

const UserAvailability = ({
    currentWeek,
    setCurrentWeek,
    getDayName,
    toCurrentWeek,
}) => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedShift, setSelectedShift] = useState({});
    const [availabilities, setAvailabilities] = useState([]);

    const loggedUser = useContext(LoggedUserContext);

    const { language } = useContext(LanguageContext);
    const currentTextContent = textContent[language].user_availability;
    useEffect(() => {}, [language]);

    useEffect(() => {}, [availabilities]);

    useEffect(() => {
        !showModal && getTimeSlots();
        !showModal && getAvailability();
    }, [currentWeek, showModal]);

    const availableDays = [
        ...new Set(timeSlots.map((slot) => slot.day)),
    ].sort();

    const getTimeSlots = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get("/entity/time-slot", {
                params: { with: ["location"] },
            });
            setTimeSlots(response.data);
        } catch (error) {
            console.log(error.response);
        } finally {
            setIsLoading(false);
        }
    };

    const getAvailability = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/entity/availability", {
                params: {
                    user_id: loggedUser.id,
                    week_occurring: currentWeek.format("DD/MM/YYYY"),
                },
            });
            setAvailabilities(response.data);
        } catch (error) {
            console.log(error.response);
        } finally {
            setIsLoading(false);
        }
    };

    const modalDisplayHandler = (
        location,
        startTime,
        endTime,
        time_slot_id,
        day,
        availability_id
    ) => {
        setSelectedShift({
            location: location,
            startTime: startTime,
            endTime: endTime,
            time_slot_id: time_slot_id,
            day: day,
            availability_id: availability_id,
        });

        showModal ? setShowModal(false) : setShowModal(true);
    };

    const updateAvailabilityEndpoint = (
        availableOnceData,
        availableAlwaysData
    ) => {
        setIsLoading(true);
        const shiftExists = selectedShift.availability_id !== undefined;

        if (shiftExists) {
            axios
                .put("/entity/availability", {
                    available: availableOnceData,
                    always_available: availableAlwaysData,
                    id: selectedShift.availability_id,
                })
                .then((res) => {
                    setShowModal(false);
                })
                .catch((error, statusCode, res) => {
                    console.log(error.response);
                })
                .finally(() => setIsLoading(false));
        } else {
            axios
                .post("/entity/availability", {
                    available: availableOnceData,
                    always_available: availableAlwaysData,
                    week_occurring: currentWeek.format("DD/MM/YYYY"),
                    time_slot_id: selectedShift.time_slot_id,
                })
                .then((res) => {
                    setShowModal(false);
                })
                .catch((error, statusCode, res) => {
                    console.log(error.response);
                })
                .finally(() => setIsLoading(false));
        }
    };

    const availableOnceHandler = () => {
        updateAvailabilityEndpoint(1, 0);
    };

    // to be added/modified later:
    // const availableAlwaysHandler = () => {
    //     updateAvailabilityEndpoint(1, 1);
    // };

    const availableNotHandler = () => {
        updateAvailabilityEndpoint(0, 0);
    };

    const slotModalContent = (
        <div className="modal_content">
            <h1 className="modal_header">{getDayName(selectedShift.day)}</h1>
            <h1 className="modal_header">
                {selectedShift.location} {selectedShift.startTime} {" - "}
                {selectedShift.endTime}
            </h1>

            <div className="modal_body">
                <p>
                    {currentTextContent.modal_content.select_your_availability}
                </p>
                <div className="modal_options_container">
                    <Button
                        buttonText={
                            currentTextContent.modal_content.available_btn
                        }
                        color="green"
                        onClick={availableOnceHandler}
                    />
                    {/* <Button
                    buttonText="Jestem dostępny na tę zmianę regularnie (co tydzień)"
                    color="orange"
                    onClick={availableAlwaysHandler}
                /> */}
                    <Button
                        buttonText={
                            currentTextContent.modal_content.unavailable_btn
                        }
                        color="red"
                        onClick={availableNotHandler}
                    />
                    <br />
                    <Button
                        color="settings_btn"
                        buttonText={currentTextContent.modal_content.return_btn}
                        onClick={modalDisplayHandler}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {showModal && (
                <Modal
                    showModal={modalDisplayHandler}
                    content={slotModalContent}
                />
            )}

            <div className="section_container">
                <h3 className="section_header">
                    {currentTextContent.title_header}
                </h3>
                <div className="section_line_divider"></div>
                <p className="section_para">
                    {currentTextContent.section_intro}
                </p>
                <div className="section_grid_container">
                    <WeekBrowser
                        currentWeek={currentWeek}
                        setCurrentWeek={setCurrentWeek}
                        toCurrentWeek={toCurrentWeek}
                    />

                    {isLoading && <Spinner />}
                    <div className="section_slots_grid">
                        {availableDays.map((availableDay) => {
                            return (
                                <div
                                    key={availableDay}
                                    className="section_slots_grid__day"
                                >
                                    <h3 className="section_slots__day_name">
                                        {getDayName(availableDay)}
                                    </h3>

                                    {timeSlots.map((slot) => {
                                        let slotColor = null;

                                        let currentAvailability =
                                            availabilities.find(
                                                (availability) =>
                                                    availability.time_slot_id ===
                                                    slot.id
                                            ) ?? {};

                                        if (
                                            currentAvailability.available ===
                                                1 &&
                                            currentAvailability.always_available ===
                                                0
                                        ) {
                                            slotColor = 1;
                                        } else if (
                                            currentAvailability.available ===
                                                1 &&
                                            currentAvailability.always_available ===
                                                1
                                        ) {
                                            slotColor = 2;
                                        } else if (
                                            currentAvailability.available === 0
                                        ) {
                                            null;
                                        } else {
                                            null;
                                        }

                                        return (
                                            slot.day === availableDay && (
                                                <ShiftCard
                                                    key={slot.id}
                                                    time_slot_id={slot.id}
                                                    location={slot.location}
                                                    startTime={slot.start_time}
                                                    endTime={slot.end_time}
                                                    day={slot.day}
                                                    selected={
                                                        modalDisplayHandler
                                                    }
                                                    color={slotColor}
                                                    availability_id={
                                                        currentAvailability.id
                                                    }
                                                    shiftCardDataContent="myAvailability"
                                                />
                                            )
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserAvailability;
