import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Video, 
  VideoOff,
  Mic, 
  MicOff,
  Settings,
  Monitor,
  User,
  ChevronDown,
  Globe,
  Check,
  Sparkles
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'ru', name: 'Russian' },
  { code: 'uz', name: 'Uzbek' },
  { code: 'kk', name: 'Kazakh' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
];

const audioDevices = [
  { id: 'default', name: 'System Default' },
  { id: 'mic1', name: 'Built-in Microphone' },
  { id: 'mic2', name: 'External Microphone' },
];

const videoDevices = [
  { id: 'default', name: 'System Default' },
  { id: 'cam1', name: 'Built-in Camera' },
  { id: 'cam2', name: 'External Webcam' },
];

export default function PreJoinPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [cameraOn, setCameraOn] = useState(true);
  const [micOn, setMicOn] = useState(true);
  const [backgroundBlur, setBackgroundBlur] = useState(false);
  const [selectedMic, setSelectedMic] = useState('default');
  const [selectedCamera, setSelectedCamera] = useState('default');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [stream, setStream] = useState<MediaStream | null>(null);

  const meetingLink = searchParams.get('link') || '';

  useEffect(() => {
    if (cameraOn) {
      navigator.mediaDevices.getUserMedia({ video: true, audio: micOn })
        .then((mediaStream) => {
          setStream(mediaStream);
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch(() => {
          toast({
            title: "Camera access denied",
            description: "Please enable camera access to preview video",
            variant: "destructive"
          });
          setCameraOn(false);
        });
    } else {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraOn]);

  const handleJoin = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    toast({ title: "Joining meeting..." });
    // In real app, navigate to meeting room
    navigate('/dashboard/meet/room');
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-4xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold mb-2">Ready to join?</h1>
            <p className="text-sm text-muted-foreground truncate max-w-md mx-auto">
              {meetingLink || 'New Meeting'}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-6">
            {/* Video Preview */}
            <div className="lg:col-span-3">
              <div className="glass-card p-4 relative">
                <div className="aspect-video bg-secondary/50 rounded-xl overflow-hidden relative">
                  {cameraOn ? (
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className={`w-full h-full object-cover ${backgroundBlur ? 'blur-effect' : ''}`}
                      style={{ transform: 'scaleX(-1)' }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-12 h-12 text-primary" />
                      </div>
                    </div>
                  )}

                  {/* Overlay Controls */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <Button
                      variant={micOn ? "glass" : "destructive"}
                      size="icon"
                      className="rounded-full h-12 w-12"
                      onClick={() => setMicOn(!micOn)}
                    >
                      {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                    </Button>
                    <Button
                      variant={cameraOn ? "glass" : "destructive"}
                      size="icon"
                      className="rounded-full h-12 w-12"
                      onClick={() => setCameraOn(!cameraOn)}
                    >
                      {cameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                    </Button>
                    <Button
                      variant={backgroundBlur ? "default" : "glass"}
                      size="icon"
                      className="rounded-full h-12 w-12"
                      onClick={() => setBackgroundBlur(!backgroundBlur)}
                    >
                      <Sparkles className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Panel */}
            <div className="lg:col-span-2 space-y-4">
              {/* Microphone Selection */}
              <div className="glass-card p-4">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Microphone
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span className="flex items-center gap-2">
                        <Mic className="h-4 w-4" />
                        {audioDevices.find(d => d.id === selectedMic)?.name}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-2" align="start">
                    {audioDevices.map((device) => (
                      <button
                        key={device.id}
                        onClick={() => setSelectedMic(device.id)}
                        className={`w-full text-left p-2 rounded-lg text-sm flex items-center justify-between ${
                          selectedMic === device.id ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                        }`}
                      >
                        {device.name}
                        {selectedMic === device.id && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>

              {/* Camera Selection */}
              <div className="glass-card p-4">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Camera
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span className="flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        {videoDevices.find(d => d.id === selectedCamera)?.name}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-2" align="start">
                    {videoDevices.map((device) => (
                      <button
                        key={device.id}
                        onClick={() => setSelectedCamera(device.id)}
                        className={`w-full text-left p-2 rounded-lg text-sm flex items-center justify-between ${
                          selectedCamera === device.id ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                        }`}
                      >
                        {device.name}
                        {selectedCamera === device.id && <Check className="h-4 w-4" />}
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>

              {/* Translation Languages */}
              <div className="glass-card p-4">
                <label className="text-sm font-medium text-muted-foreground mb-2 block">
                  Translation
                </label>
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-1 justify-between text-sm">
                        <span className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          {languages.find(l => l.code === selectedLanguage)?.name}
                        </span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2 max-h-60 overflow-y-auto" align="start">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setSelectedLanguage(lang.code)}
                          className={`w-full text-left p-2 rounded-lg text-sm flex items-center justify-between ${
                            selectedLanguage === lang.code ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                          }`}
                        >
                          {lang.name}
                          {selectedLanguage === lang.code && <Check className="h-4 w-4" />}
                        </button>
                      ))}
                    </PopoverContent>
                  </Popover>
                  <span className="text-muted-foreground">→</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-1 justify-between text-sm">
                        <span>{languages.find(l => l.code === targetLanguage)?.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-48 p-2 max-h-60 overflow-y-auto" align="end">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setTargetLanguage(lang.code)}
                          className={`w-full text-left p-2 rounded-lg text-sm flex items-center justify-between ${
                            targetLanguage === lang.code ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                          }`}
                        >
                          {lang.name}
                          {targetLanguage === lang.code && <Check className="h-4 w-4" />}
                        </button>
                      ))}
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Join Button */}
              <Button variant="hero" className="w-full h-12 text-base" onClick={handleJoin}>
                Join Meeting
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => navigate('/dashboard/meet')}
              >
                Cancel
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
