import { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Send, 
  Plus, 
  Trash2, 
  Edit3, 
  Share2, 
  X,
  FileText,
  Bot
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function LLMPage() {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
    },
  ]);
  const [activeChat, setActiveChat] = useState<string>('1');
  const [input, setInput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentChat = chats.find((c) => c.id === activeChat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  const handleSend = () => {
    if (!input.trim() || !currentChat) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    // Simulate AI response
    const aiResponse: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `This is a simulated response to: "${input.trim()}". In a real implementation, this would be connected to an AI backend.`,
      timestamp: new Date(),
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChat
          ? { ...chat, messages: [...chat.messages, userMessage, aiResponse] }
          : chat
      )
    );
    setInput('');
  };

  const handleNewChat = () => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
    };
    setChats((prev) => [newChat, ...prev]);
    setActiveChat(newChat.id);
  };

  const handleDeleteChat = (chatId: string) => {
    setChats((prev) => prev.filter((c) => c.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(chats[0]?.id || '');
    }
  };

  return (
    <DashboardLayout>
      <div className="h-screen flex relative overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-2xl mx-auto">
              {currentChat?.messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Bot className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">VertoX LLM</h2>
                    <p className="text-muted-foreground text-sm max-w-sm">
                      Start a conversation. I can help with translations, writing, and more.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  {currentChat?.messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'flex gap-3',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[80%] rounded-2xl px-4 py-3 text-sm',
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        )}
                      >
                        {message.content}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-4">
            <div className="max-w-2xl mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-3"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 h-12 bg-secondary/50 border-border"
                />
                <Button type="submit" size="icon" className="h-12 w-12" disabled={!input.trim()}>
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Right Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-16 bg-secondary border border-border border-r-0 rounded-l-lg flex items-center justify-center hover:bg-secondary/80 transition-colors"
        >
          <FileText className="h-4 w-4" />
        </button>

        {/* Right Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-72 bg-card border-l border-border h-full flex flex-col"
            >
              <div className="p-4 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold">Chats</h3>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-secondary rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-3">
                <Button
                  variant="glass"
                  className="w-full justify-start gap-2"
                  onClick={handleNewChat}
                >
                  <Plus className="h-4 w-4" />
                  New Chat
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-1">
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={cn(
                      'group flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-colors',
                      activeChat === chat.id
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-secondary'
                    )}
                    onClick={() => setActiveChat(chat.id)}
                  >
                    <FileText className="h-4 w-4 shrink-0" />
                    <span className="flex-1 truncate text-sm">{chat.title}</span>
                    <div className="hidden group-hover:flex items-center gap-1">
                      <button className="p-1 hover:bg-background rounded">
                        <Edit3 className="h-3 w-3" />
                      </button>
                      <button className="p-1 hover:bg-background rounded">
                        <Share2 className="h-3 w-3" />
                      </button>
                      <button
                        className="p-1 hover:bg-background rounded text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteChat(chat.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}
