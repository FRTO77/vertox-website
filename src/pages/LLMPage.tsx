import { useState, useRef, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Send, 
  Plus, 
  Trash2, 
  Edit3, 
  Share2, 
  X,
  FileText,
  Bot,
  Mic,
  MicOff,
  Paperclip,
  Brain,
  Globe,
  Loader2,
  Image,
  File,
  XCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Attachment {
  id: string;
  name: string;
  type: 'image' | 'file';
  size: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
  isThinking?: boolean;
  isSearching?: boolean;
}

interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

export default function LLMPage() {
  const { toast } = useToast();
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
  const [isRecording, setIsRecording] = useState(false);
  const [deepThink, setDeepThink] = useState(false);
  const [webSearch, setWebSearch] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentChat = chats.find((c) => c.id === activeChat);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat?.messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [input]);

  const handleSend = async () => {
    if ((!input.trim() && attachments.length === 0) || !currentChat || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChat
          ? { ...chat, messages: [...chat.messages, userMessage] }
          : chat
      )
    );
    setInput('');
    setAttachments([]);
    setIsLoading(true);

    // Simulate AI thinking/searching
    await new Promise(resolve => setTimeout(resolve, deepThink ? 3000 : webSearch ? 2000 : 1000));

    const responsePrefix = deepThink 
      ? '🧠 **Deep Analysis:**\n\n' 
      : webSearch 
        ? '🌐 **Web Search Results:**\n\n' 
        : '';

    const aiResponse: Message = {
      id: crypto.randomUUID(),
      role: 'assistant',
      content: `${responsePrefix}This is a simulated response to: "${input.trim()}".${deepThink ? ' I performed deep reasoning analysis on your query.' : ''}${webSearch ? ' I searched the web for the latest information.' : ''}${attachments.length > 0 ? ` I also analyzed ${attachments.length} attached file(s).` : ''} In production, this would connect to a real AI backend.`,
      timestamp: new Date(),
      isThinking: deepThink,
      isSearching: webSearch,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChat
          ? { ...chat, messages: [...chat.messages, aiResponse] }
          : chat
      )
    );
    setIsLoading(false);
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

  const handleVoiceToggle = async () => {
    if (isRecording) {
      setIsRecording(false);
      toast({ title: 'Voice recording stopped' });
      // Simulate transcription
      setInput(prev => prev + ' [Voice transcription would appear here]');
    } else {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsRecording(true);
        toast({ title: 'Recording...', description: 'Speak now' });
      } catch {
        toast({ 
          title: 'Microphone access denied', 
          description: 'Please enable microphone permissions',
          variant: 'destructive' 
        });
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: Attachment[] = Array.from(files).map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      size: formatFileSize(file.size),
    }));

    setAttachments(prev => [...prev, ...newAttachments]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(a => a.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout>
      <div className="h-screen flex relative overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col h-full">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-2xl mx-auto">
              {currentChat?.messages.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                      <Bot className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold tracking-tight mb-2">VertoX LLM</h2>
                    <p className="text-muted-foreground/90 text-sm max-w-sm leading-relaxed">
                      Start a conversation. I can help with translations, writing, and more.
                    </p>
                  </motion.div>
                </div>
              ) : (
                <div className="space-y-5 py-6">
                  {currentChat?.messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        'flex gap-3',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      <div
                        className={cn(
                          'max-w-[80%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed',
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary/80 text-secondary-foreground'
                        )}
                      >
                        {/* Attachments */}
                        {message.attachments && message.attachments.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {message.attachments.map(att => (
                              <div key={att.id} className="flex items-center gap-1.5 bg-background/20 rounded-lg px-2 py-1 text-xs">
                                {att.type === 'image' ? <Image className="w-3 h-3" /> : <File className="w-3 h-3" />}
                                <span className="truncate max-w-[100px]">{att.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="whitespace-pre-wrap">{message.content}</div>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-3 justify-start"
                    >
                      <div className="bg-secondary/80 text-secondary-foreground rounded-2xl px-4 py-3 text-[14px] flex items-center gap-2.5">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-muted-foreground">
                          {deepThink ? 'Deep thinking...' : webSearch ? 'Searching the web...' : 'Thinking...'}
                        </span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="border-t border-border/50 p-5">
            <div className="max-w-2xl mx-auto">
              {/* Attachments Preview */}
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {attachments.map(att => (
                    <div key={att.id} className="flex items-center gap-2 bg-secondary/50 rounded-lg px-3 py-1.5 text-sm">
                      {att.type === 'image' ? <Image className="w-4 h-4 text-primary" /> : <File className="w-4 h-4 text-primary" />}
                      <span className="truncate max-w-[150px]">{att.name}</span>
                      <span className="text-xs text-muted-foreground">{att.size}</span>
                      <button onClick={() => removeAttachment(att.id)} className="text-muted-foreground hover:text-destructive">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Mode Toggles */}
              <div className="flex items-center gap-2 mb-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={deepThink ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setDeepThink(!deepThink)}
                      className={cn('gap-1.5 text-xs', deepThink && 'bg-primary/20 text-primary hover:bg-primary/30')}
                    >
                      <Brain className="w-4 h-4" />
                      Deep Think
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Extended reasoning for complex questions</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={webSearch ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setWebSearch(!webSearch)}
                      className={cn('gap-1.5 text-xs', webSearch && 'bg-primary/20 text-primary hover:bg-primary/30')}
                    >
                      <Globe className="w-4 h-4" />
                      Web Search
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Search the internet for latest information</TooltipContent>
                </Tooltip>
              </div>

              {/* Input Row */}
              <div className="flex gap-2 items-end">
                {/* File Upload */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileSelect}
                  accept="image/*,.pdf,.doc,.docx,.txt,.csv,.json"
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 shrink-0"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Attach files</TooltipContent>
                </Tooltip>

                {/* Voice */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isRecording ? 'destructive' : 'ghost'}
                      size="icon"
                      className={cn('h-10 w-10 shrink-0', isRecording && 'animate-pulse')}
                      onClick={handleVoiceToggle}
                    >
                      {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isRecording ? 'Stop recording' : 'Voice input'}</TooltipContent>
                </Tooltip>

                {/* Text Input */}
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a message..."
                  className="flex-1 min-h-[44px] max-h-[150px] resize-none bg-secondary/50 border-border rounded-xl py-3"
                  rows={1}
                />

                {/* Send */}
                <Button 
                  type="button" 
                  size="icon" 
                  className="h-10 w-10 shrink-0" 
                  disabled={(!input.trim() && attachments.length === 0) || isLoading}
                  onClick={handleSend}
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                </Button>
              </div>
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
