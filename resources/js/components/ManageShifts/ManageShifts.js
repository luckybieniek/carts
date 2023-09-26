import React, { useState, useEffect, useContext } from "react";

import "../Shared/Section.css";
import axios from "axios";

import ShiftCard from "../Shared/ShiftCard/ShiftCard";
import Spinner from "../Shared/Spinner/Spinner";
import Modal from "../Shared/Modal/Modal";
import Button from "../Shared/Button/Button";

import CongSettingsContext from "../Shared/Context/CongSettingsContext";

import LanguageContext from "../Shared/Context/LanguageContext";
import textContent from "../../language.json";

const ManageShifts = ({ getDayNameOnly, getDayNameStringOnly }) => {
    const [timeSlots, setTimeSlots] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showModalDeleteShift, setShowModalDeleteShift] = useState(false);
    const [showModalDeleteLocation, setShowModalDeleteLocation] =
        useState(false);
    const [selectedShift, setSelectedShift] = useState({});
    const [selectedLocation, setSelectedLocation] = useState({});
    const [formData, setFormData] = useState({
        location: "",
        day: "",
        start_time: "",
        end_time: "",
    });
    const [newShiftData, setNewShiftData] = useState({
        active: 1,
        frequency: 1,
        id: 1,
    });
    const [locations, setLocations] = useState([]);
    const [submittingNewShift, setSubmittingNewShift] = useState(false);
    const [newLocationData, setNewLocationData] = useState({
        name: "",
        maps_url: null,
        colour: null,
        organisation_id: "",
    });

    const [showNewShiftFormError, setShowNewShiftFormError] = useState(false);
    const [showNewLocationFormError, setShowNewLocationFormError] =
        useState(false);

    const { language } = useContext(LanguageContext);
    const currentTextContent = textContent[language].manage_shifts;
    useEffect(() => {}, [language]);

    useEffect(() => {
        setShowNewShiftFormError(false);
    }, [formData]);

    useEffect(() => {
        setShowNewLocationFormError(false);
    }, [newLocationData]);

    useEffect(() => {
        !showModalDeleteShift && !showModalDeleteLocation && getTimeSlots();
        !showModalDeleteShift && !showModalDeleteLocation && getLocations();
    }, [showModalDeleteShift, showModalDeleteLocation, submittingNewShift]);

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

    const getLocations = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/entity/location", {});
            setLocations(response.data);
        } catch (error) {
            console.log(error.response);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteShiftModalDisplayHandler = (
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
        showModalDeleteShift
            ? setShowModalDeleteShift(false)
            : setShowModalDeleteShift(true);
    };

    const deleteLocationModalDisplayHandler = (locationId, locationName) => {
        setSelectedLocation({
            id: locationId,
            name: locationName,
        });

        showModalDeleteLocation
            ? setShowModalDeleteLocation(false)
            : setShowModalDeleteLocation(true);
    };

    const newShiftSubmitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setSubmittingNewShift(true);

        console.log(newShiftData);

        try {
            const response = await axios.post("/entity/time-slot", {
                ...newShiftData,
            });
            setSubmittingNewShift(false);
            setFormData({
                location: "",
                day: "",
                start_time: "",
                end_time: "",
            });
            setNewShiftData({ active: 1, frequency: 1, id: 1 });
        } catch (error) {
            setShowNewShiftFormError(true);
            console.log(error.response);
        } finally {
            setIsLoading(false);
        }
    };

    //❗❗❗ TODO - improve error handling for the below
    const newLocationDataSumbmitHandler = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setSubmittingNewShift(true);

        try {
            const response = await axios.post("/entity/location", {
                ...newLocationData,
            });
            setSubmittingNewShift(false);
            setNewLocationData({
                name: "",
                maps_url: null,
                colour: null,
                organisation_id: "",
            });
        } catch (error) {
            console.log(error.response);
            setShowNewLocationFormError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const selectLocationHandler = (e) => {
        setFormData({ ...formData, location: e.target.value });
        setNewShiftData({
            ...newShiftData,
            location_id: Number(e.target.value),
        });
    };
    const selectDayHandler = (e) => {
        setFormData({ ...formData, day: e.target.value });
        setNewShiftData({ ...newShiftData, day: Number(e.target.value) });
    };

    const startTimeChangeHandler = (e) => {
        setFormData({ ...formData, start_time: e.target.value });

        setNewShiftData({ ...newShiftData, start_time: e.target.value });
    };
    const endTimeChangeHandler = (e) => {
        setFormData({ ...formData, end_time: e.target.value });
        setNewShiftData({ ...newShiftData, end_time: e.target.value });
    };

    const newLocationDataHandler = (e) => {
        setNewLocationData({ ...newLocationData, name: e.target.value });
    };

    const deleteTimeSlotHandler = async () => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`/entity/time-slot/`, {
                params: { id: selectedShift.time_slot_id },
            });
            console.log(response.data);
        } catch (error) {
            console.log(error.response);
        } finally {
            setShowModalDeleteShift(false);
            setIsLoading(false);
        }
    };

    //❗❗❗ TODO: add logic to delete all avilabilites & assigned shifts for this location////////////////
    const deleteLocationHandler = async () => {
        setIsLoading(true);
        try {
            const response = await axios.delete(`/entity/location/`, {
                params: { id: selectedLocation.id },
            });
            getLocations();
        } catch (error) {
            console.log(error.response);
        } finally {
            setShowModalDeleteLocation(false);
            setIsLoading(false);
            setSelectedLocation({});
        }
    };

    const deleteSlotModalContent = (
        <div className="modal_content">
            <p className="bolder">
                {currentTextContent.modal_content_delete_shift.header}
                {getDayNameStringOnly(selectedShift.day)},{" "}
                {selectedShift.startTime} - {selectedShift.endTime}{" "}
                {currentTextContent.modal_content_delete_shift.in}
                {selectedShift.location}
            </p>
            <div className="modal_body">
                <p>
                    {
                        currentTextContent.modal_content_delete_shift
                            .pargraph_sure_delete
                    }
                </p>
            </div>
            <div className="modal_options_container_columns">
                <Button
                    color="red"
                    buttonText={
                        currentTextContent.modal_content_delete_shift.yes
                    }
                    onClick={deleteTimeSlotHandler}
                />
                <Button
                    color="grey"
                    buttonText={
                        currentTextContent.modal_content_delete_shift.no
                    }
                    onClick={deleteShiftModalDisplayHandler}
                />
            </div>
        </div>
    );

    const deleteLocationModalContent = (
        <div className="modal_content">
            <p className="bolder">
                {currentTextContent.modal_content_delete_location.header}
                {selectedLocation.name}
            </p>

            <div className="modal_body">
                <p>
                    {
                        currentTextContent.modal_content_delete_location
                            .pargraph_sure_delete
                    }
                </p>
                <p>
                    {
                        currentTextContent.modal_content_delete_location
                            .pargraph_warning
                    }
                </p>
            </div>
            <div className="modal_options_container_columns">
                <Button
                    color="red"
                    buttonText={
                        currentTextContent.modal_content_delete_location.yes
                    }
                    onClick={deleteLocationHandler}
                />
                <Button
                    color="grey"
                    buttonText={
                        currentTextContent.modal_content_delete_location.no
                    }
                    onClick={deleteLocationModalDisplayHandler}
                />
            </div>
        </div>
    );

    return (
        <div>
            {showModalDeleteShift && (
                <Modal
                    showModal={deleteShiftModalDisplayHandler}
                    content={deleteSlotModalContent}
                />
            )}

            {showModalDeleteLocation && (
                <Modal
                    showModal={deleteLocationModalDisplayHandler}
                    content={deleteLocationModalContent}
                />
            )}

            <div className="section_container">
                <h3 className="section_header">
                    {" "}
                    {currentTextContent.title_header}
                </h3>
                <div className="section_line_divider"></div>
                <div className="settings_container">
                    <div className="settings_section">
                        <p className="settings_header">
                            {
                                currentTextContent.settings_add_shift
                                    .settings_header
                            }
                        </p>
                        {showNewShiftFormError && (
                            <div className="error_container">
                                <p className="error_text">
                                    {
                                        currentTextContent.settings_add_shift
                                            .form_error
                                    }
                                </p>
                            </div>
                        )}
                        <form
                            className="manage_shifts_container"
                            onSubmit={newShiftSubmitHandler}
                        >
                            <div className="settings_data_section">
                                <p className="settings_label">
                                    {
                                        currentTextContent.settings_add_shift
                                            .form_select_location
                                    }
                                </p>
                                <select
                                    value={formData.location}
                                    onChange={selectLocationHandler}
                                >
                                    <option value="0">{""}</option>
                                    {locations.map((location) => (
                                        <option value={location.id}>
                                            {location.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="settings_data_section">
                                <p className="settings_label">
                                    {
                                        currentTextContent.settings_add_shift
                                            .form_select_day
                                    }
                                </p>
                                <select
                                    value={formData.day}
                                    onChange={selectDayHandler}
                                >
                                    <option value="0">{""}</option>
                                    <option value="1">
                                        {
                                            currentTextContent
                                                .settings_add_shift.weekdays.mon
                                        }
                                    </option>
                                    <option value="2">
                                        {
                                            currentTextContent
                                                .settings_add_shift.weekdays.tue
                                        }
                                    </option>
                                    <option value="3">
                                        {
                                            currentTextContent
                                                .settings_add_shift.weekdays.wed
                                        }
                                    </option>
                                    <option value="4">
                                        {
                                            currentTextContent
                                                .settings_add_shift.weekdays.thu
                                        }
                                    </option>
                                    <option value="5">
                                        {
                                            currentTextContent
                                                .settings_add_shift.weekdays.fri
                                        }
                                    </option>
                                    <option value="6">
                                        {
                                            currentTextContent
                                                .settings_add_shift.weekdays.sat
                                        }
                                    </option>
                                    <option value="7">
                                        {
                                            currentTextContent
                                                .settings_add_shift.weekdays.sun
                                        }
                                    </option>
                                </select>
                            </div>
                            <div className="settings_data_section">
                                <p className="settings_label">
                                    {
                                        currentTextContent.settings_add_shift
                                            .form_select_start_time
                                    }
                                </p>
                                <input
                                    className="settings_input_field"
                                    placeholder="00:00"
                                    type="time"
                                    value={formData.start_time}
                                    onChange={startTimeChangeHandler}
                                ></input>
                            </div>
                            <div className="settings_data_section">
                                <p className="settings_label">
                                    {
                                        currentTextContent.settings_add_shift
                                            .form_select_end_time
                                    }
                                </p>
                                <input
                                    className="settings_input_field"
                                    placeholder="00:00"
                                    type="time"
                                    value={formData.end_time}
                                    onChange={endTimeChangeHandler}
                                ></input>
                            </div>
                            <input
                                className="settings_button"
                                type="submit"
                                value={
                                    currentTextContent.settings_add_shift
                                        .form_button
                                }
                            ></input>
                        </form>
                    </div>

                    <div className="settings_section">
                        <p className="settings_header">
                            {
                                currentTextContent.settings_edit_locations
                                    .settings_header
                            }
                        </p>
                        <div className="settings_data_section">
                            <p className="settings_label">
                                {
                                    currentTextContent.settings_edit_locations
                                        .current_locations
                                }
                            </p>
                            <ul>
                                {locations.map((location) => (
                                    <li
                                        className="settings_data"
                                        key={location.id}
                                    >
                                        {location.name}{" "}
                                        <span
                                            className="settings_link warning_red"
                                            onClick={() => {
                                                deleteLocationModalDisplayHandler(
                                                    location.id,
                                                    location.name
                                                );
                                            }}
                                        >
                                            {
                                                currentTextContent
                                                    .settings_edit_locations
                                                    .location_delete
                                            }
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="settings_data_section">
                            {showNewLocationFormError && (
                                <div className="error_container">
                                    <p className="error_text">
                                        {
                                            currentTextContent
                                                .settings_edit_locations
                                                .form_error
                                        }
                                    </p>
                                </div>
                            )}
                            <form onSubmit={newLocationDataSumbmitHandler}>
                                <p className="settings_label">
                                    {
                                        currentTextContent
                                            .settings_edit_locations
                                            .form_type_new_location
                                    }
                                </p>
                                <div>
                                    <input
                                        className="settings_input_field settings_data_section"
                                        placeholder=""
                                        type="text"
                                        value={newLocationData.name}
                                        onChange={newLocationDataHandler}
                                    ></input>{" "}
                                </div>
                                <div>
                                    <input
                                        className="settings_button"
                                        type="submit"
                                        value={
                                            currentTextContent
                                                .settings_edit_locations
                                                .form_button
                                        }
                                    ></input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="section_grid_container">
                    {isLoading && <Spinner />}
                    <div className="section_slots_grid">
                        {availableDays.map((availableDay) => {
                            return (
                                <div className="section_slots_grid__day">
                                    <h3 className="section_slots__day_name_only">
                                        {getDayNameOnly(availableDay)}
                                    </h3>

                                    {timeSlots.map((slot) => {
                                        let slotColor = null;

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
                                                        deleteShiftModalDisplayHandler
                                                    }
                                                    color={slotColor}
                                                    shiftCardDataContent="manageShifts"
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

export default ManageShifts;
