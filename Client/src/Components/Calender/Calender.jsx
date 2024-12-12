import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

const Calendar = ({ events }) => {


    const [selectedDate, setSelectedDate] = useState(null);
    const [month, setMonth] = useState(dayjs());

    const daysInMonth = Array.from({ length: month.daysInMonth() }, (_, i) => month.date(i + 1));

    const isEventDay = (date) => events[0]?.some(event => dayjs(event.nextVaccinationDue).isSame(date, 'day'));
     ;

    const getEventDetails = (date) => events[0]?.filter(event => dayjs(event.nextVaccinationDue ).isSame(date, 'day'));

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold text-center mb-4">Vaccination Calendar</h1>
                <div className="flex justify-between items-center mb-4">
                    <button className="text-blue-500 hover:underline" onClick={() => setMonth(month.subtract(1, 'month'))}>
                        Previous
                    </button>
                    <h2 className="text-lg font-semibold">
                        {month.format('MMMM YYYY')}
                    </h2>
                    <button className="text-blue-500 hover:underline" onClick={() => setMonth(month.add(1, 'month'))}>
                        Next
                    </button>
                </div>

                <div className="grid grid-cols-7 gap-2 border-t border-gray-200">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="text-center font-semibold py-2">
                            {day}
                        </div>
                    ))}
                    {Array.from({ length: daysInMonth[0].day() }, (_, i) => (
                        <div key={i} className=""></div>
                    ))}
                    {daysInMonth.map((date) => (
                        <div
                            key={date}
                            className={`relative p-4 text-center rounded-lg cursor-pointer border hover:bg-gray-200 ${
                                isEventDay(date) ? "bg-blue-100" : "bg-white"
                            }`}
                            onClick={() => setSelectedDate(date)}
                        >
                            {date.date()}
                            {isEventDay(date) && (
                                <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                            )}
                        </div>
                    ))}
                </div>

                {selectedDate && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg w-96 relative">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                onClick={() => setSelectedDate(null)}
                            >
                                &times;
                            </button>
                            <h2 className="text-xl font-bold mb-4">
                                Events on {selectedDate.format('MMMM D, YYYY')}
                            </h2>
                            {getEventDetails(selectedDate).map((event, index) => (
                                <div key={index} className="mb-2">
                                    <h3 className="font-semibold">{event.title}</h3>
                                    <p>{`${event.name}'s vaccine is schedule`}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const CalendarView = ({getpets}) => {
    const events = [
        { date: "2024-12-15", title: "Rabies Vaccination", description: "Rabies shot for Max at 3:00 PM." },
        { date: "2024-12-30", title: "Deworming", description: "Deworming for Bella." },
    ];

    return <Calendar events={getpets} />;
};

export default CalendarView;
