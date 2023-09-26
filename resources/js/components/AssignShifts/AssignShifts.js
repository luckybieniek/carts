import React, { useState, useEffect, useContext } from "react";

import "../Shared/Section.css";
import axios from "axios";

import ShiftCard from "../Shared/ShiftCard/ShiftCard";
import Spinner from "../Shared/Spinner/Spinner";
import Modal from "../Shared/Modal/Modal";
import Button from "../Shared/Button/Button";
import WeekBrowser from "../Shared/WeekBrowser/WeekBrowser";

import CongSettingsContext from "../Shared/Context/CongSettingsContext";

import LanguageContext from "../Shared/Context/LanguageContext";
import textContent from "../../language.json";

const AssignShifts = ({
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
    const currentTextContent = textContent[language].assign_shifts;
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
        availablePublishers
    ) => {
        setSelectedShift({
            location: location,
            startTime: startTime,
            endTime: endTime,
            time_slot_id: time_slot_id,
            day: day,
            availability_id: availability_id,
            availablePublishers: availablePublishers,
        });
        showModal ? setShowModal(false) : setShowModal(true);
    };

    const assignPublisherHandler = async (publisher) => {
        setIsLoading(true);
        axios
            .post("/entity/shift", {
                organisation_id: 1, //❗ TODO: make dynamic later!
                availability_id: publisher.id,
                captain: 0, //❗ TODO: make dynamic later!
            })
            .then((res) => {
                getAssignedPublishers();
            })
            .catch((error, statusCode, res) => {
                console.log(error.response);
            })
            .finally(() => setIsLoading(false));
    };

    // TODO: create logic:
    const removePublisherHandler = async (publisher) => {
        const findIdToDelete = assignedPublishers.find(
            (assignment) => assignment.availability_id === publisher.id
        ).id;

        setIsLoading(true);
        axios
            .delete("/entity/shift", { params: { id: findIdToDelete } })
            .then((res) => {
                getAssignedPublishers();
            })
            .catch((error, statusCode, res) => {
                console.log(error.response);
            })
            .finally(() => setIsLoading(false));
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
                    {currentTextContent.modal_content.available_pubs}{" "}
                    <span>{selectedShift.availablePublishers?.length}</span>
                </p>

                <div className="modal_options_container">
                    {selectedShift.availablePublishers?.map((publisher) => {
                        const isAssigned = assignedPublishers.find(
                            (assignment) =>
                                assignment.availability_id === publisher.id
                        );

                        return (
                            <Button
                                key={publisher.user_id}
                                buttonText={publisher.user.name}
                                color={isAssigned ? "green" : "grey"}
                                onClick={() =>
                                    !isAssigned
                                        ? assignPublisherHandler(
                                              publisher,
                                              selectedShift
                                          )
                                        : removePublisherHandler(
                                              publisher,
                                              selectedShift
                                          )
                                }
                            />
                        );
                    })}

                    <br />
                    <Button buttonText="Powrót" onClick={modalDisplayHandler} />
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

                                        const publishersAvailability =
                                            availabilities.filter(
                                                (availability) =>
                                                    availability.time_slot_id ===
                                                        slot.id &&
                                                    availability.available === 1
                                            );

                                        const publishersOnShift =
                                            publishersAvailability?.filter(
                                                (availability) =>
                                                    assignedPublishers.find(
                                                        (asssignedPub) =>
                                                            asssignedPub.availability_id ===
                                                            availability.id
                                                    )
                                            );

                                        publishersOnShift.length >= minOnShift
                                            ? (slotColor = 1)
                                            : publishersAvailability.length <
                                                  minOnShift &&
                                              publishersAvailability.length > 0
                                            ? (slotColor = 5)
                                            : publishersOnShift.length <
                                                  minOnShift &&
                                              publishersAvailability.length >=
                                                  minOnShift
                                            ? (slotColor = 2)
                                            : publishersOnShift.length <
                                                  minOnShift &&
                                              publishersAvailability.length >= 1
                                            ? (slotColor = 2)
                                            : null;

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
                                                    availablePublishers={
                                                        publishersAvailability
                                                    }
                                                    publishersOnShift={
                                                        publishersOnShift
                                                    }
                                                    shiftCardDataContent="assignShifts"
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

export default AssignShifts;
