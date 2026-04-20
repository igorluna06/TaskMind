interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center mr-3 shrink-0">
          ✨
        </div>
      )}
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-[#2a2a2a] text-gray-200 rounded-tr-sm'
            : 'bg-[#1e1e1e] text-gray-300 rounded-tl-sm border border-[#2a2a2a]'
        }`}
      >
        {content}
      </div>
    </div>
  );
}