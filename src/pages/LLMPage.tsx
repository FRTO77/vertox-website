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
          <div className="p-4">
            <div className="max-w-3xl mx-auto">
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

              {/* Main Input Bar */}
              <div className="relative">
                {/* Gradient top border */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-t-2xl" />
                
                <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-3 py-2.5 shadow-sm">
                  {/* Left actions */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0 rounded-lg"
                        onClick={handleNewChat}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>New chat</TooltipContent>
                  </Tooltip>

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
                        size="sm"
                        className="h-8 gap-1.5 rounded-lg text-muted-foreground hover:text-foreground"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Paperclip className="h-4 w-4" />
                        <span className="text-xs font-medium">Attach</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Attach files</TooltipContent>
                  </Tooltip>

                  {/* Theme/Mode Toggle */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={deepThink ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setDeepThink(!deepThink)}
                        className={cn(
                          'h-8 gap-1.5 rounded-lg text-muted-foreground hover:text-foreground',
                          deepThink && 'bg-secondary text-foreground'
                        )}
                      >
                        <Brain className="h-4 w-4" />
                        <span className="text-xs font-medium">Theme</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Deep thinking mode</TooltipContent>
                  </Tooltip>

                  {/* Text Input */}
                  <div className="flex-1 mx-2">
                    <Textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask VertoX LLM..."
                      className="min-h-[32px] max-h-[120px] resize-none bg-transparent border-0 py-1.5 px-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm placeholder:text-muted-foreground/60"
                      rows={1}
                    />
                  </div>

                  {/* Right actions */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={webSearch ? 'secondary' : 'ghost'}
                        size="sm"
                        onClick={() => setWebSearch(!webSearch)}
                        className={cn(
                          'h-8 gap-1.5 rounded-lg text-muted-foreground hover:text-foreground',
                          webSearch && 'bg-secondary text-foreground'
                        )}
                      >
                        <Globe className="h-4 w-4" />
                        <span className="text-xs font-medium">Chat</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Web search</TooltipContent>
                  </Tooltip>

                  {/* Voice */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isRecording ? 'destructive' : 'ghost'}
                        size="icon"
                        className={cn('h-8 w-8 shrink-0 rounded-lg', isRecording && 'animate-pulse')}
                        onClick={handleVoiceToggle}
                      >
                        {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{isRecording ? 'Stop recording' : 'Voice input'}</TooltipContent>
                  </Tooltip>

                  {/* Send */}
                  <Button 
                    type="button" 
                    size="icon" 
                    className="h-8 w-8 shrink-0 rounded-full bg-primary hover:bg-primary/90" 
                    disabled={(!input.trim() && attachments.length === 0) || isLoading}
                    onClick={handleSend}
                  >
                    {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
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
