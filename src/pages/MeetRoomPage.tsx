import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Video, 
  VideoOff,
  Mic, 
  MicOff,
  Monitor,
  MonitorOff,
  Phone,
  MessageSquare,
  Users,
  MoreHorizontal,
  Settings,
  Send,
  Copy,
  X,
  Disc,
  FileText,
  Hand,
  Smile,
  ChevronUp,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Globe,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Participant {
  id: string;
  name: string;
  isSpeaking: boolean;
  isMuted: boolean;
  isVideoOn: boolean;
  isHost: boolean;
}

interface ChatMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ru', name: 'Russian' },
  { code: 'uz', name: 'Uzbek' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'zh', name: 'Chinese' },
];

export default function MeetRoomPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  // Meeting state
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState(false);
  
  // Translation
  const [myLanguage, setMyLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');

  // Chat
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: '1', sender: 'System', content: 'Meeting started. Translation is active.', timestamp: new Date() },
  ]);

  // Participants (mock data)
  const [participants] = useState<Participant[]>([
    { id: '1', name: 'You (Host)', isSpeaking: false, isMuted: false, isVideoOn: true, isHost: true },
    { id: '2', name: 'John Doe', isSpeaking: true, isMuted: false, isVideoOn: true, isHost: false },
    { id: '3', name: 'Jane Smith', isSpeaking: false, isMuted: true, isVideoOn: false, isHost: false },
  ]);

  const [stream, setStream] = useState<MediaStream | null>(null);

  // Initialize camera
  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: isMicOn })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch(() => {
          toast({
            title: "Camera access denied",
            variant: "destructive"
          });
          setIsCameraOn(false);
        });
    } else {
      if (stream) {
        stream.getVideoTracks().forEach(track => track.stop());
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOn]);

  // Toggle mic
  useEffect(() => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = isMicOn;
      });
    }
  }, [isMicOn, stream]);

  const handleEndCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    toast({ title: 'Meeting ended' });
    navigate('/dashboard/meet');
  };

  const handleScreenShare = async () => {
    if (isScreenSharing) {
      setIsScreenSharing(false);
      toast({ title: 'Screen sharing stopped' });
    } else {
      try {
        await navigator.mediaDevices.getDisplayMedia({ video: true });
        setIsScreenSharing(true);
        toast({ title: 'Screen sharing started' });
      } catch {
        toast({ title: 'Screen sharing cancelled', variant: 'destructive' });
      }
    }
  };

  const handleRecording = () => {
    setIsRecording(!isRecording);
    toast({ 
      title: isRecording ? 'Recording stopped' : 'Recording started',
      description: isRecording ? 'Recording saved' : 'Meeting is being recorded'
    });
  };

  const handleTranscript = () => {
    setIsTranscribing(!isTranscribing);
    toast({ 
      title: isTranscribing ? 'Live transcript stopped' : 'Live transcript started'
    });
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: 'You',
      content: chatInput.trim(),
      timestamp: new Date(),
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setChatInput('');
  };

  const copyMeetingLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: 'Meeting link copied' });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <DashboardLayout hideSidebar>
      <div className="h-screen flex flex-col bg-background">
        {/* Top Bar */}
        <div className="h-14 border-b border-border flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold">VertoX Meet</h1>
            {isRecording && (
              <div className="flex items-center gap-2 text-destructive text-sm">
                <Disc className="w-4 h-4 animate-pulse" />
                Recording
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Translation Languages */}
            <div className="flex items-center gap-2 text-sm">
              <Globe className="w-4 h-4 text-primary" />
              <Popover>
                <PopoverTrigger asChild>
                  <button className="px-2 py-1 rounded bg-secondary/50 hover:bg-secondary text-sm">
                    {languages.find(l => l.code === myLanguage)?.name}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setMyLanguage(lang.code)}
                      className={cn(
                        'w-full text-left p-2 rounded text-sm flex items-center justify-between',
                        myLanguage === lang.code ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                      )}
                    >
                      {lang.name}
                      {myLanguage === lang.code && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
              <span className="text-muted-foreground">→</span>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="px-2 py-1 rounded bg-secondary/50 hover:bg-secondary text-sm">
                    {languages.find(l => l.code === targetLanguage)?.name}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-2">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => setTargetLanguage(lang.code)}
                      className={cn(
                        'w-full text-left p-2 rounded text-sm flex items-center justify-between',
                        targetLanguage === lang.code ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                      )}
                    >
                      {lang.name}
                      {targetLanguage === lang.code && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </PopoverContent>
              </Popover>
            </div>

            <Button variant="ghost" size="icon" onClick={copyMeetingLink}>
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Video Grid */}
          <div className="flex-1 p-4">
            <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Main Video (You) */}
              <motion.div
                layout
                className="relative bg-secondary/30 rounded-2xl overflow-hidden aspect-video"
              >
                {isCameraOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ transform: 'scaleX(-1)' }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                      Y
                    </div>
                  </div>
                )}
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="bg-background/80 backdrop-blur px-2 py-1 rounded text-sm">You</span>
                  {!isMicOn && (
                    <span className="bg-destructive/80 p-1 rounded">
                      <MicOff className="w-3 h-3" />
                    </span>
                  )}
                </div>
                {isHandRaised && (
                  <div className="absolute top-3 right-3 bg-yellow-500/90 p-2 rounded-lg">
                    <Hand className="w-5 h-5 text-white" />
                  </div>
                )}
              </motion.div>

              {/* Other Participants */}
              {participants.slice(1).map(participant => (
                <motion.div
                  key={participant.id}
                  layout
                  className={cn(
                    "relative bg-secondary/30 rounded-2xl overflow-hidden aspect-video",
                    participant.isSpeaking && "ring-2 ring-primary"
                  )}
                >
                  {participant.isVideoOn ? (
                    <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                      <span className="text-4xl">👤</span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                        {participant.name.charAt(0)}
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="bg-background/80 backdrop-blur px-2 py-1 rounded text-sm">
                      {participant.name}
                    </span>
                    {participant.isMuted && (
                      <span className="bg-destructive/80 p-1 rounded">
                        <MicOff className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chat Panel */}
          <AnimatePresence>
            {isChatOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="border-l border-border flex flex-col bg-card"
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold">Chat</h3>
                  <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-secondary rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map(msg => (
                    <div key={msg.id} className="text-sm">
                      <span className="font-medium text-foreground">{msg.sender}</span>
                      <span className="text-muted-foreground text-xs ml-2">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <p className="text-muted-foreground mt-0.5">{msg.content}</p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border flex gap-2">
                  <Input
                    ref={chatInputRef}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button size="icon" onClick={sendChatMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Participants Panel */}
          <AnimatePresence>
            {isParticipantsOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="border-l border-border flex flex-col bg-card"
              >
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold">Participants ({participants.length})</h3>
                  <button onClick={() => setIsParticipantsOpen(false)} className="p-1 hover:bg-secondary rounded">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {participants.map(p => (
                    <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                        {p.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{p.name}</p>
                        {p.isHost && <p className="text-xs text-muted-foreground">Host</p>}
                      </div>
                      <div className="flex items-center gap-1">
                        {p.isMuted ? <MicOff className="w-4 h-4 text-muted-foreground" /> : <Mic className="w-4 h-4 text-primary" />}
                        {p.isVideoOn ? <Video className="w-4 h-4 text-primary" /> : <VideoOff className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Controls */}
        <div className="h-20 border-t border-border flex items-center justify-center gap-2 px-4">
          {/* Mic */}
          <Button
            variant={isMicOn ? 'secondary' : 'destructive'}
            size="lg"
            className="rounded-full h-14 w-14"
            onClick={() => setIsMicOn(!isMicOn)}
          >
            {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>

          {/* Camera */}
          <Button
            variant={isCameraOn ? 'secondary' : 'destructive'}
            size="lg"
            className="rounded-full h-14 w-14"
            onClick={() => setIsCameraOn(!isCameraOn)}
          >
            {isCameraOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </Button>

          {/* Screen Share */}
          <Button
            variant={isScreenSharing ? 'default' : 'secondary'}
            size="lg"
            className="rounded-full h-14 w-14"
            onClick={handleScreenShare}
          >
            {isScreenSharing ? <MonitorOff className="w-5 h-5" /> : <Monitor className="w-5 h-5" />}
          </Button>

          {/* Record */}
          <Button
            variant={isRecording ? 'destructive' : 'secondary'}
            size="lg"
            className="rounded-full h-14 w-14"
            onClick={handleRecording}
          >
            <Disc className={cn("w-5 h-5", isRecording && "animate-pulse")} />
          </Button>

          {/* Transcript */}
          <Button
            variant={isTranscribing ? 'default' : 'secondary'}
            size="lg"
            className="rounded-full h-14 w-14"
            onClick={handleTranscript}
          >
            <FileText className="w-5 h-5" />
          </Button>

          {/* Raise Hand */}
          <Button
            variant={isHandRaised ? 'default' : 'secondary'}
            size="lg"
            className={cn("rounded-full h-14 w-14", isHandRaised && "bg-yellow-500 hover:bg-yellow-600")}
            onClick={() => setIsHandRaised(!isHandRaised)}
          >
            <Hand className="w-5 h-5" />
          </Button>

          {/* Chat */}
          <Button
            variant={isChatOpen ? 'default' : 'secondary'}
            size="lg"
            className="rounded-full h-14 w-14"
            onClick={() => { setIsChatOpen(!isChatOpen); setIsParticipantsOpen(false); }}
          >
            <MessageSquare className="w-5 h-5" />
          </Button>

          {/* Participants */}
          <Button
            variant={isParticipantsOpen ? 'default' : 'secondary'}
            size="lg"
            className="rounded-full h-14 w-14"
            onClick={() => { setIsParticipantsOpen(!isParticipantsOpen); setIsChatOpen(false); }}
          >
            <Users className="w-5 h-5" />
          </Button>

          {/* Speaker Mute */}
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full h-14 w-14"
            onClick={() => setIsSpeakerMuted(!isSpeakerMuted)}
          >
            {isSpeakerMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </Button>

          {/* More Options */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary" size="lg" className="rounded-full h-14 w-14">
                <MoreHorizontal className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2" side="top">
              <button className="w-full text-left p-2 rounded hover:bg-secondary text-sm flex items-center gap-2">
                <Settings className="w-4 h-4" /> Settings
              </button>
              <button className="w-full text-left p-2 rounded hover:bg-secondary text-sm flex items-center gap-2">
                <Smile className="w-4 h-4" /> Reactions
              </button>
            </PopoverContent>
          </Popover>

          {/* End Call */}
          <Button
            variant="destructive"
            size="lg"
            className="rounded-full h-14 px-8 ml-4"
            onClick={handleEndCall}
          >
            <Phone className="w-5 h-5 rotate-[135deg]" />
            <span className="ml-2">End</span>
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
