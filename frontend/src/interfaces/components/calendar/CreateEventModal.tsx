import { useState } from 'react';
import { EventType } from '../../../domain/enums/EventType';
import { createEventUseCase } from '../../../application/useCases/event/createEventUseCase';
import { updateEventUseCase } from '../../../application/useCases/event/updateEventUseCase';
import type { Event } from '../../../domain/entities/Event';

interface CreateEventModalProps {
  onClose: () => void;
  onCreated: () => void;
  selectedDate?: string;
  editingEvent?: Event;
}

export default function CreateEventModal({ onClose, onCreated, selectedDate, editingEvent }: CreateEventModalProps) {
  const isEditing = !!editingEvent;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: editingEvent?.title ?? '',
    type: editingEvent?.type ?? EventType.URGENT,
    description: editingEvent?.description ?? '',
    date: editingEvent ? new Date(editingEvent.dateTime).toISOString().split('T')[0] : selectedDate ?? '',
    time: editingEvent ? new Date(editingEvent.dateTime).toTimeString().slice(0, 5) : '',
    duration: editingEvent?.duration ?? 60,
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit() {
    if (!form.title || !form.date || !form.time || !form.duration) return;
    setLoading(true);
    try {
      if (isEditing && editingEvent.id) {
        await updateEventUseCase(editingEvent.id, { ...form, duration: Number(form.duration) });
      } else {
        await createEventUseCase({ ...form, duration: Number(form.duration) });
      }
      onCreated();
      onClose();
    } catch {
      alert(isEditing ? 'Erro ao atualizar evento.' : 'Erro ao criar evento.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 style={{ color: 'white' }} className="font-medium">
            {isEditing ? 'Editar Evento' : 'Novo Evento'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-300">✕</button>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-gray-400 text-xs mb-1 block">Título</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Nome do evento"
              className="w-full bg-[#2a2a2a] text-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-[#3a3a3a] placeholder-gray-600"
            />
          </div>

          <div>
            <label className="text-gray-400 text-xs mb-1 block">Tipo</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full bg-[#2a2a2a] text-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-[#3a3a3a]"
            >
              {Object.values(EventType).map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-gray-400 text-xs mb-1 block">Descrição</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descrição do evento"
              rows={3}
              className="w-full bg-[#2a2a2a] text-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-[#3a3a3a] placeholder-gray-600 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Data</label>
              <input
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] text-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-[#3a3a3a]"
              />
            </div>
            <div>
              <label className="text-gray-400 text-xs mb-1 block">Horário</label>
              <input
                name="time"
                type="time"
                value={form.time}
                onChange={handleChange}
                className="w-full bg-[#2a2a2a] text-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-[#3a3a3a]"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400 text-xs mb-1 block">Duração (minutos)</label>
            <input
              name="duration"
              type="number"
              value={form.duration}
              onChange={handleChange}
              min={1}
              className="w-full bg-[#2a2a2a] text-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none border border-transparent focus:border-[#3a3a3a]"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm text-gray-400 bg-[#2a2a2a] hover:bg-[#333] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl text-sm text-black bg-white hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            {loading ? (isEditing ? 'Salvando...' : 'Criando...') : (isEditing ? 'Salvar' : 'Criar Evento')}
          </button>
        </div>
      </div>
    </div>
  );
}