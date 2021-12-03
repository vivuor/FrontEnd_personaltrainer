import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function CalendarPage() {
    const [training, setTraining] = useState([]);
    const localizer = momentLocalizer(moment);

    useEffect(() => {
        fetchTraining();
    }, []);

    const fetchTraining = () => {
        fetch("https://customerrest.herokuapp.com/gettrainings")
        .then(response => response.json())
        .then(data => setTraining(data))
        .catch(err => console.error(err))
    };

    const ColoredDateCellWrapper = ({ children }) =>
        React.cloneElement(React.Children.only(children), {
        style: {
            backgroundColor: 'lightblue',
        },
        })

    const events = training.map(event => ({
        startDate: moment(event.date).toDate(),
        endDate: moment(event.date)
        .add(event.duration, "minutes")
        .toDate(),
        title:
        event.customer.firstname +
        " " +
        event.customer.lastname +
        ": " +
        event.activity
    }));

    return (
        <div style={{height: '100%', width: '80%', margin: 'auto' }}>
            <h1>Calendar</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="startDate"
                endAccessor="endDate"
                showMultiDayTimes
                components={{
                timeSlotWrapper: ColoredDateCellWrapper,
                }}
                style={{ margin: 50, height: 700 }}
            />
        </div>
    );
}

export default CalendarPage;