import { useState, useRef, useEffect } from 'react';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import { interpretCreateEventUseCase, interpretFindEventUseCase, interpretUpdateEventUseCase, interpretDeleteEventUseCase } from '../../application/useCases/ai/interpretEventUseCase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

type Intent = 'CREATE' | 'FIND' | 'UPDATE' | 'DELETE' | null;

function detectIntent(message: string, currentIntent: Intent): Intent {
  if (currentIntent) return currentIntent;
  
  const lower = message.toLowerCase();
  
  if (lower.match(/deletar|cancelar|remover|apagar|excluir/)) return 'DELETE';
  if (lower.match(/atualizar|mudar|alterar|editar|trocar|mover/)) return 'UPDATE';
  if (lower.match(/listar|mostrar|quais|ver|buscar|procurar|tem algum|lista/)) return 'FIND';
  return 'CREATE';
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Olá! Sou o assistente do TaskMind. Posso criar, buscar, atualizar e deletar seus eventos. Como posso ajudar? 🗓️',
    },
  ]);
  const [conversationId, setConversationId] = useState<number | undefined>();
  const [currentIntent, setCurrentIntent] = useState<Intent>(null);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(message: string) {
    setMessages(prev => [...prev, { role: 'user', content: message }]);
    setLoading(true);

    const intent = detectIntent(message, currentIntent);
    setCurrentIntent(intent);

    try {
      let data;

      if (intent === 'FIND') {
        data = await interpretFindEventUseCase(message, conversationId);
      } else if (intent === 'UPDATE') {
        data = await interpretUpdateEventUseCase(message, conversationId);
      } else if (intent === 'DELETE') {
        data = await interpretDeleteEventUseCase(message, conversationId);
      } else {
        data = await interpretCreateEventUseCase(message, conversationId);
      }

      setConversationId(data.conversationId);
      const state = data.result.state;

      if (state === 'COLLECTING' || state === 'CONFIRMING' || state === 'SEARCHING') {
        setMessages(prev => [...prev, { role: 'assistant', content: data.result.message }]);
      } else if (state === 'DONE') {
        const doneMessages: Record<string, string> = {
          CREATE: '✅ Evento criado com sucesso!',
          UPDATE: '✅ Evento atualizado com sucesso!',
          DELETE: '✅ Evento deletado com sucesso!',
          FIND: data.result.message ?? '✅ Busca concluída!',
        };
        setMessages(prev => [...prev, { role: 'assistant', content: doneMessages[intent ?? 'CREATE'] }]);
        setConversationId(undefined);
        setCurrentIntent(null);
      } else if (state === 'CANCELLED') {
        setMessages(prev => [...prev, { role: 'assistant', content: '❌ Operação cancelada.' }]);
        setConversationId(undefined);
        setCurrentIntent(null);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Ocorreu um erro. Tente novamente.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full w-full bg-[#1a1a1a]">
      <div className="flex flex-col items-center justify-center py-8 border-b border-[#2a2a2a]">
        <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 600 }}>TaskMind AI</h1>
        <p style={{ color: '#9ca3af', fontSize: '0.875rem', marginTop: '4px' }}>Agende seus eventos com a IA</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 w-full max-w-3xl mx-auto">
        {messages.map((msg, i) => (
          <ChatMessage key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && (
          <div className="flex justify-start mb-4">
            <div className="w-8 h-8 rounded-full bg-[#2a2a2a] flex items-center justify-center mr-3">✨</div>
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="w-full max-w-3xl mx-auto px-6 py-4">
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}