import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import "../Shared/Section.css";
import ShiftCard from "../Shared/ShiftCard/ShiftCard";
import Spinner from "../Shared/Spinner/Spinner";
import Modal from "../Shared/Modal/Modal";
import Button from "../Shared/Button/Button";
import WeekBrowser from "../Shared/WeekBrowser/WeekBrowser";

import CongSettingsContext from "../Shared/Context/CongSettingsContext";

import LanguageContext from "../Shared/Context/LanguageContext";
import textContent from "../../language.json";

const CongSchedule = ({
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
    const [assignedPublishers, setAssignedPublishers] = useState([]);
    const { minOnShift } = useContext(CongSettingsContext);

    const { language } = useContext(LanguageContext);
    const currentTextContent = textContent[language].cong_schedule;
    useEffect(() => {}, [language]);

    useEffect(() => {
        !showModal && getTimeSlots();
        !showModal && getAvailability();
        !showModal && getAssignedPublishers();
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
        try {
            const response = await axios.get("/entity/availability", {
                params: {
                    // user_id: loggedUser.id,
                    with: ["user"],
                    week_occurring: currentWeek.format("DD/MM/YYYY"),
                },
            });
            setAvailabilities(response.data);
        } catch (error) {
            console.log(error.response);
        }
    };

    const getAssignedPublishers = async () => {
        setIsLoading(true);

        try {
            const response = await axios.get("/entity/shift");
            setAssignedPublishers(response.data);
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
        availability_id,
        availablePublishers,
        publishersOnShift
    ) => {
        setSelectedShift({
            location: location,
            startTime: startTime,
            endTime: endTime,
            time_slot_id: time_slot_id,
            day: day,
            availability_id: availability_id,
            availablePublishers: availablePublishers,
            publishersOnShift: publishersOnShift,
        });

        console.log(publishersOnShift);
        showModal ? setShowModal(false) : setShowModal(true);
    };

    // ❗❗❗ TODO: add dynamic color change for Captain

    const slotModalContent = (
        <div className="modal_content">
            <h1 className="modal_header">{getDayName(selectedShift.day)}</h1>
            <h1 className="modal_header">
                {selectedShift.location} {selectedShift.startTime} {" - "}
                {selectedShift.endTime}
            </h1>

            <div className="modal_body">
                <p>Osoby przydzielone na tę zmianę: </p>

                <div className="modal_options_container">
                    <ul>
                        {selectedShift.publishersOnShift?.map((publisher) => {
                            return (
                                <li key={publisher.user_id}>
                                    {publisher.user.name} (
                                    {publisher.user.phone_number})
                                </li>
                            );
                        })}
                    </ul>

                    <br />
                    <Button
                        color="grey"
                        buttonText="Powrót"
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
                    {currentTextContent.section_tip_1}{" "}
                    {currentTextContent.section_tip_2}{" "}
                    <span
                        className="in_para_section_link"
                        onClick={() => linkSetShowMain("showUserAvailability")}
                    >
                        {currentTextContent.link_my_availability}.
                    </span>
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

                                        const slotAvailability =
                                            availabilities?.filter(
                                                (availability) =>
                                                    availability.time_slot_id ===
                                                        slot.id &&
                                                    availability.available === 1
                                            );

                                        const publishersOnShift =
                                            slotAvailability?.filter(
                                                (availability) =>
                                                    assignedPublishers.find(
                                                        (asssignedPub) =>
                                                            asssignedPub.availability_id ===
                                                            availability.id
                                                    )
                                            );

                                        if (
                                            publishersOnShift.length <
                                            minOnShift
                                        ) {
                                            slotColor = null;
                                        } else if (
                                            publishersOnShift.length >=
                                            minOnShift
                                        ) {
                                            slotColor = 1;
                                        } else {
                                            null;
                                        }

                                        return slotColor !== null
                                            ? slot.day === availableDay && (
                                                  <ShiftCard
                                                      key={slot.id}
                                                      time_slot_id={slot.id}
                                                      location={slot.location}
                                                      startTime={
                                                          slot.start_time
                                                      }
                                                      endTime={slot.end_time}
                                                      day={slot.day}
                                                      selected={
                                                          modalDisplayHandler
                                                      }
                                                      color={slotColor}
                                                      availablePublishers={
                                                          slotAvailability
                                                      }
                                                      publishersOnShift={
                                                          publishersOnShift
                                                      }
                                                      shiftCardDataContent="congSchedule"
                                                  />
                                              )
                                            : null;
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

export default CongSchedule;
