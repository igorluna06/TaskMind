import type { Event } from '../../../domain/entities/Event';
import { deleteEventUseCase } from '../../../application/useCases/event/deleteEventUseCase';
import { useState } from 'react';

interface EventDetailsModalProps {
  event: Event;
  onClose: () => void;
  onDeleted: () => void;
  onEdit: (event: Event) => void;
}

function getEventColor(type: string) {
  switch (type) {
    case 'WORKOUT': return '#3b82f6';
    case 'STUDY': return '#8b5cf6';
    case 'URGENT': return '#ef4444';
    default: return '#6b7280';
  }
}

function formatDateTime(dateTime: string) {
  const date = new Date(dateTime);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function EventDetailsModal({ event, onClose, onDeleted, onEdit }: EventDetailsModalProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm('Deseja deletar este evento?')) return;
    setLoading(true);
    try {
      await deleteEventUseCase(event.id);
      onDeleted();
      onClose();
    } catch {
      alert('Erro ao deletar evento.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div style={{ backgroundColor: '#1e1e1e', border: '1px solid #2a2a2a', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '420px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: getEventColor(event.type), flexShrink: 0 }} />
            <h2 style={{ color: 'white', fontWeight: 600, fontSize: '1.1rem' }}>{event.title}</h2>
          </div>
          <button onClick={onClose} style={{ color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
        </div>

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Tipo</span>
            <span style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>{event.type}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Data e hora</span>
            <span style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>{formatDateTime(event.dateTime)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Duração</span>
            <span style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>{event.duration} minutos</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Status</span>
            <span style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>{event.status}</span>
          </div>
          {event.description && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>Descrição</span>
              <span style={{ color: '#e5e7eb', fontSize: '0.875rem' }}>{event.description}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => onEdit(event)}
            style={{ flex: 1, padding: '10px', borderRadius: '12px', backgroundColor: '#2a2a2a', color: '#e5e7eb', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
          >
            Editar
          </button>
          <button
            onClick={handleDelete}
            disabled={loading}
            style={{ flex: 1, padding: '10px', borderRadius: '12px', backgroundColor: '#ef444420', color: '#ef4444', border: '1px solid #ef444440', cursor: 'pointer', fontSize: '0.875rem' }}
          >
            {loading ? 'Deletando...' : 'Deletar'}
          </button>
        </div>
      </div>
    </div>
  );
}