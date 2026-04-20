import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CreateEventModal from '../components/calendar/CreateEventModal';
import EventDetailsModal from '../components/calendar/EventDetailsModal';
import { getEventsUseCase } from '../../application/useCases/event/getEventsUseCase';
import type { Event } from '../../domain/entities/Event';
import type { EventClickArg } from '@fullcalendar/core';

function getEventConfig(type: string) {
  switch (type) {
    case 'WORKOUT':
      return {
        gradient: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
        icon: '💪',
      };
    case 'STUDY':
      return {
        gradient: 'linear-gradient(135deg, #6d28d9, #8b5cf6)',
        icon: '📚',
      };
    case 'URGENT':
      return {
        gradient: 'linear-gradient(135deg, #b91c1c, #ef4444)',
        icon: '⚡',
      };
    default:
      return {
        gradient: 'linear-gradient(135deg, #374151, #6b7280)',
        icon: '📅',
      };
  }
}

export default function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>();
  const [editingEvent, setEditingEvent] = useState<Event | undefined>();

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const data = await getEventsUseCase();
      setEvents(data);
    } catch {
      console.error('Erro ao carregar eventos');
    }
  }

  function handleDateClick(info: { dateStr: string }) {
    setSelectedDate(info.dateStr);
    setShowCreateModal(true);
  }

  function handleEventClick(info: EventClickArg) {
    const event = events.find(e => String(e.id) === info.event.id);
    if (event) {
      setSelectedEvent(event);
      setShowDetailsModal(true);
    }
  }

  const calendarEvents = events.map(event => ({
    id: String(event.id),
    title: event.title,
    start: event.dateTime,
    extendedProps: { type: event.type },
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  }));

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: '#1a1a1a', padding: '24px' }}>
      <style>{`
        .fc { --fc-border-color: #2a2a2a; --fc-page-bg-color: #1a1a1a; --fc-neutral-bg-color: #1a1a1a; --fc-today-bg-color: rgba(161,140,80,0.15); --fc-event-bg-color: transparent; --fc-event-border-color: transparent; }
        .fc-theme-standard td, .fc-theme-standard th, .fc-theme-standard .fc-scrollgrid { border-color: #2a2a2a !important; }
        .fc-col-header-cell-cushion, .fc-daygrid-day-number { color: #9ca3af !important; text-decoration: none !important; font-size: 0.8rem; }
        .fc-day-today .fc-daygrid-day-number { color: #f5c842 !important; font-weight: 700; }
        .fc-button { background: #2a2a2a !important; border-color: #3a3a3a !important; color: #d1d5db !important; border-radius: 8px !important; font-size: 0.8rem !important; padding: 4px 12px !important; }
        .fc-button:hover { background: #3a3a3a !important; }
        .fc-button-active { background: #3a3a3a !important; }
        .fc-toolbar-title { color: white !important; font-size: 1.2rem !important; font-weight: 600 !important; }
        .fc-event { cursor: pointer !important; }
        .fc-daygrid-event-harness { margin-bottom: 2px !important; }
        .fc-event-main { padding: 0 !important; }
        .taskmind-event { display: flex; align-items: center; gap: 4px; padding: 3px 7px; border-radius: 6px; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.01em; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; box-shadow: 0 1px 4px rgba(0,0,0,0.35); transition: filter 0.15s ease; }
        .taskmind-event:hover { filter: brightness(1.15); }
        .taskmind-event-icon { font-size: 0.75rem; flex-shrink: 0; }
        .taskmind-event-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: white; }
        .taskmind-event-time { flex-shrink: 0; color: rgba(255,255,255,0.7); font-size: 0.65rem; font-weight: 400; }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ color: 'white', fontSize: '2.2rem', fontWeight: 600 }}>Calendário</h1>
          <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '4px' }}>Clique em uma data para criar um evento</p>
        </div>
        <button
          onClick={() => { setSelectedDate(undefined); setShowCreateModal(true); }}
          style={{ padding: '8px 16px', backgroundColor: 'white', color: 'black', borderRadius: '12px', fontSize: '0.875rem', cursor: 'pointer', border: 'none' }}
        >
          + Novo Evento
        </button>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
        {[
          { type: 'WORKOUT', label: 'Treino', icon: '💪', gradient: 'linear-gradient(135deg, #1d4ed8, #3b82f6)' },
          { type: 'STUDY', label: 'Estudo', icon: '📚', gradient: 'linear-gradient(135deg, #6d28d9, #8b5cf6)' },
          { type: 'URGENT', label: 'Urgente', icon: '⚡', gradient: 'linear-gradient(135deg, #b91c1c, #ef4444)' },
        ].map(item => (
          <div key={item.type} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '3px', background: item.gradient }} />
            <span style={{ color: '#9ca3af', fontSize: '0.75rem' }}>{item.icon} {item.label}</span>
          </div>
        ))}
      </div>

      {/* Calendar */}
      <div style={{ flex: 1, minHeight: 0 }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendarEvents}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          headerToolbar={{ left: 'prev,next today', center: 'title', right: '' }}
          locale="pt-br"
          height="100%"
          eventContent={(arg) => {
            const type = arg.event.extendedProps.type as string;
            const config = getEventConfig(type);
            const timeStr = new Date(arg.event.start!).toLocaleTimeString('pt-BR', {
              hour: '2-digit',
              minute: '2-digit',
            });
            return (
              <div className="taskmind-event" style={{ background: config.gradient }}>
                <span className="taskmind-event-icon">{config.icon}</span>
                <span className="taskmind-event-title">{arg.event.title}</span>
                <span className="taskmind-event-time">{timeStr}</span>
              </div>
            );
          }}
        />
      </div>

      {showCreateModal && (
        <CreateEventModal
          onClose={() => { setShowCreateModal(false); setEditingEvent(undefined); }}
          onCreated={loadEvents}
          selectedDate={selectedDate}
          editingEvent={editingEvent}
        />
      )}

      {showDetailsModal && selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setShowDetailsModal(false)}
          onDeleted={loadEvents}
          onEdit={(event) => {
            setEditingEvent(event);
            setShowDetailsModal(false);
            setShowCreateModal(true);
          }}
        />
      )}
    </div>
  );
}