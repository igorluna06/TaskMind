import { useState, type KeyboardEvent } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  function handleSend() {
    if (!message.trim() || disabled) return;
    onSend(message);
    setMessage('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex items-center gap-3 bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl px-4 py-3">
        <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Descreva seu evento..."
        rows={1}
        style={{ color: '#e5e7eb' }}
        className="flex-1 bg-transparent placeholder-gray-500 resize-none outline-none text-sm leading-relaxed"
        />
        <button
        onClick={handleSend}
        disabled={disabled || !message.trim()}
        className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-200 transition-colors shrink-0"
        >
        ↑
        </button>
    </div>
    );
}