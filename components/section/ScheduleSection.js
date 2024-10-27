import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';

export default function ScheduleSection() {
    // State for selected date and time
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [timeSlots, setTimeSlots] = useState([
        "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM"
    ]);

    // Handle date change
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(null); // Reset selected time when date changes
    };

    // Handle time slot selection
    const handleTimeSelection = (time) => {
        setSelectedTime(time);
    };

    return (
        <div className="py-8 px-4 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold">Pick a Date and Time</h2>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Calendar Section */}
                <div className="lg:w-1/2 bg-gray-100 p-4 rounded-lg shadow-sm">
                    <Calendar
                        onChange={handleDateChange}
                        value={selectedDate}
                        minDate={new Date()}
                    />
                    <div className="text-center mt-4 text-sm text-gray-500">
                        <p>GMT+06:00 Asia/Dhaka (GMT+6)</p>
                    </div>
                </div>
                
                {/* Time Slots Section */}
                <div className="lg:w-1/2">
                    <div className="text-center mb-4">
                        <h3 className="text-lg font-medium">
                            Available Starting times for {format(selectedDate, "eee, MMM d, yyyy")}
                        </h3>
                        <p className="text-sm text-gray-500">AM</p>
                        <p className="text-sm font-semibold mt-2">No Slots Available</p>
                        <p className="text-sm text-gray-500 mt-4">PM</p>
                    </div>

                    <div className="flex flex-col items-center space-y-2 max-h-52 overflow-y-auto">
                        {timeSlots.map((time, index) => (
                            <button
                                key={index}
                                className={`w-24 py-2 border rounded-md text-center ${
                                    selectedTime === time ? 'bg-yellow-500 text-white' : 'bg-white text-yellow-500'
                                } border-yellow-500 hover:bg-yellow-500 hover:text-white transition`}
                                onClick={() => handleTimeSelection(time)}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center mt-8">
                <button
                    className="px-6 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition"
                    onClick={() => alert(`Selected: ${format(selectedDate, 'PP')} at ${selectedTime || 'N/A'}`)}
                    disabled={!selectedTime}
                >
                    Select Date
                </button>
            </div>
        </div>
    );
}
