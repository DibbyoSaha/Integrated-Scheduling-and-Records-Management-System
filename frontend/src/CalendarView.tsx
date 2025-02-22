import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';

function CalendarView() {
    const [events, setEvents] = useState<EventInput[]>([]);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');

    // Fetch Bookings from Flask API
    const fetchBookings = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/bookings');
            const data = await response.json();

            const formattedEvents = data.map((booking: { id: number; title: string; date: string }) => ({
                id: booking.id.toString(),
                title: booking.title,
                date: booking.date,
            }));

            setEvents(formattedEvents);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        }
    };

    // Handle Form Submit (POST Request to Flask)
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !date) {
            alert('Please fill in both title and date!');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, date }),
            });

            if (response.ok) {
                setTitle('');
                setDate('');
                fetchBookings(); // Refresh Events
            } else {
                console.error('Failed to add booking');
            }
        } catch (error) {
            console.error('Error adding booking:', error);
        }
    };

    // Handle Event Click (DELETE Request to Flask)
    const handleEventClick = async (clickInfo: any) => {
        const bookingId = clickInfo.event.id;

        if (!window.confirm(`Are you sure you want to delete this booking: "${clickInfo.event.title}"?`)) {
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/bookings/${bookingId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchBookings(); // Refresh Events
            } else {
                console.error('Failed to delete booking');
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    // Initial Fetch When Component Loads
    useEffect(() => {
        fetchBookings();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Booking Calendar</h2>

            <form onSubmit={handleSubmit} className="flex items-center space-x-4 mb-6 bg-white p-4 rounded-lg shadow">
                <input
                    type="text"
                    placeholder="Booking Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border border-gray-300 rounded-lg p-2 flex-1"
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="border border-gray-300 rounded-lg p-2"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    Add Booking
                </button>
            </form>

            <div className="bg-white p-4 rounded-lg shadow">
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    height="600px"
                    eventClick={handleEventClick}
                />
            </div>
        </div>
    );
}

export default CalendarView;
