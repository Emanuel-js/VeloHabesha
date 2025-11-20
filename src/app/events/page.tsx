'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';

const categories = ['Social', 'Race', 'Expedition', 'Training'];

export default function EventsPage() {
    const { user, openModal } = useAuth();
    const [events, setEvents] = useState<any[]>([]);
    const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'events'), orderBy('date', 'asc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const eventsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setEvents(eventsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching events:", error);
            if (error.code === 'permission-denied') {
                alert("DATABASE LOCKED: Please update your Firestore Security Rules in the Firebase Console to 'allow read, write: if true;'");
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleAddEventClick = () => {
        if (user) {
            setIsEventModalOpen(true);
        } else {
            openModal('login');
        }
    };

    const handleAddEvent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const formData = new FormData(e.target as HTMLFormElement);
        const dateValue = formData.get('date') as string;

        // Format the date from YYYY-MM-DD to "MMM DD, YYYY"
        const formattedDate = dateValue ? new Date(dateValue).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        }) : '';

        try {
            await addDoc(collection(db, 'events'), {
                title: formData.get('title'),
                date: formattedDate,
                location: formData.get('location'),
                attendees: 1,
                image: "linear-gradient(135deg, #FF5F1F 0%, #121212 100%)", // Default gradient
                type: formData.get('type'),
                host: user.displayName || 'Anonymous',
                createdAt: serverTimestamp()
            });
            setIsEventModalOpen(false);
        } catch (error) {
            console.error("Error adding event: ", error);
        }
    };

    // Helper to check if a day has an event (simple string matching for now)
    const hasEventOnDay = (day: number) => {
        return events.some(event => {
            const eventDate = event.date; // e.g., "Oct 15, 2024"
            const eventDay = parseInt(eventDate.split(' ')[1]?.replace(',', '') || '0');
            return eventDay === day;
        });
    };

    return (
        <div className="page-container">
            <div className="events-bg"></div>
            <div className="container">
                <div className="page-header">
                    <div>
                        <h1 className="page-title">Upcoming <span className="highlight-text">Events</span></h1>
                        <p className="page-subtitle">Join the community for rides, races, and meetups.</p>
                    </div>
                    <div className="header-actions">
                        <div className="view-toggle">
                            <button
                                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                List
                            </button>
                            <button
                                className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
                                onClick={() => setViewMode('calendar')}
                            >
                                Calendar
                            </button>
                        </div>
                        {events.length === 0 && (
                            <button
                                className="btn btn-ghost"
                                onClick={async () => {
                                    const initialEvents = [
                                        {
                                            title: "Simien Mountains Trek",
                                            date: "Oct 15, 2024",
                                            location: "Debark, Ethiopia",
                                            attendees: 42,
                                            image: "linear-gradient(135deg, #FF5F1F 0%, #121212 100%)",
                                            type: "Expedition",
                                            host: "Community",
                                            createdAt: serverTimestamp()
                                        },
                                        {
                                            title: "Addis Night Ride",
                                            date: "Oct 20, 2024",
                                            location: "Meskel Square, Addis Ababa",
                                            attendees: 128,
                                            image: "linear-gradient(135deg, #00E5FF 0%, #121212 100%)",
                                            type: "Social",
                                            host: "Community",
                                            createdAt: serverTimestamp()
                                        }
                                    ];
                                    for (const evt of initialEvents) {
                                        await addDoc(collection(db, 'events'), evt);
                                    }
                                }}
                            >
                                Seed Data
                            </button>
                        )}
                        <button className="btn btn-primary" onClick={handleAddEventClick}>Add Event</button>
                    </div>
                </div>

                {loading ? (
                    <div className="loading">Loading events...</div>
                ) : viewMode === 'list' ? (
                    <div className="events-list">
                        {events.map(event => (
                            <div key={event.id} className="event-card glass-panel animate-fade-in">
                                <div className="event-date">
                                    <span className="month">{event.date.split(' ')[0]}</span>
                                    <span className="day">{event.date.split(' ')[1]?.replace(',', '') || '01'}</span>
                                </div>

                                <div className="event-details">
                                    <div className="event-meta">
                                        <span className="event-type">{event.type}</span>
                                        <span className="event-location">📍 {event.location}</span>
                                    </div>
                                    <h3>{event.title}</h3>
                                    <div className="attendees-preview">
                                        <div className="attendee-avatars">
                                            {[1, 2, 3].map(i => <div key={i} className="avatar-sm"></div>)}
                                        </div>
                                        <span>+{event.attendees} going</span>
                                    </div>
                                    {event.host && <div className="event-host">Hosted by {event.host}</div>}
                                </div>

                                <div className="event-action">
                                    <button className="btn btn-primary">RSVP</button>
                                </div>
                            </div>
                        ))}
                        {events.length === 0 && <div className="empty-state">No upcoming events. Be the first to host one!</div>}
                    </div>
                ) : (
                    <div className="calendar-view glass-panel animate-fade-in">
                        <div className="calendar-header">
                            <h2>October 2024</h2>
                        </div>
                        <div className="calendar-grid">
                            {/* Mock Calendar Grid for Oct 2024 */}
                            {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                                const hasEvent = hasEventOnDay(day);
                                return (
                                    <div key={day} className={`calendar-day ${hasEvent ? 'has-event' : ''}`}>
                                        <span className="day-number">{day}</span>
                                        {hasEvent && <div className="event-dot"></div>}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {isEventModalOpen && (
                <div className="modal-overlay">
                    <div className="modal glass-panel animate-fade-in">
                        <h2>Host an Event</h2>
                        <form onSubmit={handleAddEvent}>
                            <div className="form-group">
                                <label>Event Title</label>
                                <input name="title" type="text" required className="input-field" placeholder="e.g., Sunday Morning Ride" />
                            </div>
                            <div className="form-group">
                                <label>Date</label>
                                <input name="date" type="date" required className="input-field" />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input name="location" type="text" required className="input-field" placeholder="e.g., Meskel Square" />
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select name="type" className="input-field">
                                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="btn btn-ghost" onClick={() => setIsEventModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary">Create Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <style jsx>{`
        .loading, .empty-state {
            text-align: center;
            padding: 2rem;
            color: var(--text-secondary);
        }

        .header-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .view-toggle {
          display: flex;
          background: var(--surface-highlight);
          padding: 4px;
          border-radius: var(--radius-full);
          border: 1px solid var(--glass-border);
        }

        .toggle-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          cursor: pointer;
          font-size: 0.9rem;
          transition: var(--transition-fast);
        }

        .toggle-btn.active {
          background: var(--surface);
          color: var(--text-primary);
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .event-host {
            font-size: 0.8rem;
            color: var(--text-secondary);
            margin-top: 0.5rem;
        }

        .calendar-view {
          padding: var(--spacing-md);
          min-height: 400px;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background: var(--glass-border);
          border: 1px solid var(--glass-border);
          margin-top: var(--spacing-md);
        }

        .calendar-day {
          background: var(--surface);
          min-height: 100px;
          padding: 0.5rem;
          position: relative;
        }

        .day-number {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }

        .has-event {
          background: rgba(255, 95, 31, 0.1);
        }

        .event-dot {
          width: 8px;
          height: 8px;
          background: var(--primary);
          border-radius: 50%;
          margin-top: 0.5rem;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          backdrop-filter: blur(5px);
        }

        .modal {
          width: 90%;
          max-width: 500px;
          max-height: 90vh;
          overflow-y: auto;
          padding: var(--spacing-lg);
          background: var(--surface);
          border-radius: var(--radius-md);
        }

        .modal h2 {
          margin-bottom: var(--spacing-md);
        }

        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--text-secondary);
          font-size: 0.9rem;
        }

        .input-field {
          width: 100%;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          border-radius: var(--radius-sm);
          color: var(--text-primary);
          font-family: inherit;
        }

        .input-field:focus {
          outline: none;
          border-color: var(--primary);
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-lg);
        }
      `}</style>
        </div>
    );
}
