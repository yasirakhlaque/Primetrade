import { useState } from "react"
import { FaCalendar, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { MdAdd } from "react-icons/md"

export default function CalendarView() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const previousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const nextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const renderCalendarDays = () => {
        const days = [];
        
        // Empty cells for days before month starts
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="p-2"></div>);
        }
        
        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
            const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === currentDate.getMonth();
            
            days.push(
                <button
                    key={day}
                    onClick={() => setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
                    className={`p-2 rounded-lg text-center transition-all ${
                        isToday ? 'bg-emerald-500/30 text-emerald-400 font-bold' :
                        isSelected ? 'bg-emerald-500/20 text-emerald-300' :
                        'text-gray-400 hover:bg-slate-700/50'
                    }`}
                >
                    {day}
                </button>
            );
        }
        
        return days;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <FaCalendar className="text-emerald-400" />
                    Calendar & Events
                </h2>
            </div>

            {/* Calendar */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/10 rounded-2xl p-6">
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-6">
                    <button
                        onClick={previousMonth}
                        className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-all"
                    >
                        <FaChevronLeft />
                    </button>
                    <h3 className="text-xl font-bold text-white">
                        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                    </h3>
                    <button
                        onClick={nextMonth}
                        className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-lg transition-all"
                    >
                        <FaChevronRight />
                    </button>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                    {dayNames.map(day => (
                        <div key={day} className="text-center text-gray-500 text-sm font-semibold p-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                    {renderCalendarDays()}
                </div>
            </div>

            {/* Today's Events */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/10 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">
                        {selectedDate ? selectedDate.toDateString() : 'Today\'s Events'}
                    </h3>
                    <button className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg hover:bg-emerald-500/30 transition-all">
                        <MdAdd />
                    </button>
                </div>
                <div className="space-y-3">
                    {events.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No events scheduled</p>
                    ) : (
                        events.map((event, i) => (
                            <div key={i} className="p-4 bg-slate-800/50 rounded-lg border border-emerald-500/20">
                                <p className="text-white font-semibold">{event.title}</p>
                                <p className="text-gray-400 text-sm">{event.time}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-emerald-500/10 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border-l-4 border-emerald-500">
                        <div className="text-center">
                            <p className="text-2xl font-bold text-white">{new Date().getDate()}</p>
                            <p className="text-xs text-gray-400">{monthNames[new Date().getMonth()].slice(0, 3)}</p>
                        </div>
                        <div className="flex-1">
                            <p className="text-white font-semibold">Sample Event</p>
                            <p className="text-gray-400 text-sm">10:00 AM - 11:00 AM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
