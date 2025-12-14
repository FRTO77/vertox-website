import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Mic, Play, Square, Trash2, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceRecording {
  id: string;
  name: string;
  duration: number;
  createdAt: Date;
}

export default function VoicePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<VoiceRecording[]>([]);
  const { toast } = useToast();

  const handleStartRecording = () => {
    setIsRecording(true);
    toast({ title: 'Recording started', description: 'Speak naturally for best results' });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    const newRecording: VoiceRecording = {
      id: crypto.randomUUID(),
      name: `Recording ${recordings.length + 1}`,
      duration: Math.floor(Math.random() * 60) + 10,
      createdAt: new Date(),
    };
    setRecordings((prev) => [newRecording, ...prev]);
    toast({ title: 'Recording saved', description: 'Your voice sample has been saved' });
  };

  const handleDelete = (id: string) => {
    setRecordings((prev) => prev.filter((r) => r.id !== id));
    toast({ title: 'Recording deleted' });
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <DashboardLayout>
      <div className="p-8 lg:p-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-2">Your Voice</h1>
          <p className="text-muted-foreground/90">
            Record your voice so AI can learn your tone and emotions for natural translations
          </p>
        </motion.div>

        {/* Recording Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="glass-card p-8 mb-8"
        >
          <div className="text-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                isRecording
                  ? 'bg-destructive text-destructive-foreground animate-pulse'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {isRecording ? (
                <Square className="h-10 w-10" />
              ) : (
                <Mic className="h-10 w-10" />
              )}
            </motion.button>

            <h3 className="text-xl font-semibold mb-2">
              {isRecording ? 'Recording...' : 'Record Your Voice'}
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              {isRecording
                ? 'Speak naturally. Click the button to stop recording.'
                : 'Click the microphone to start recording. We recommend at least 30 seconds for best results.'}
            </p>
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="glass-card p-6 mb-8"
        >
          <h3 className="font-semibold mb-4">Tips for best results</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">1</span>
              </div>
              <span>Find a quiet environment with minimal background noise</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">2</span>
              </div>
              <span>Speak naturally at your normal pace and volume</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">3</span>
              </div>
              <span>Include varied emotions and expressions for richer cloning</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-medium text-primary">4</span>
              </div>
              <span>Record at least 30 seconds, ideally 1-2 minutes</span>
            </li>
          </ul>
        </motion.div>

        {/* Recordings List */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold mb-4">Your Recordings</h2>
          {recordings.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <Volume2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No recordings yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your voice recordings will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recordings.map((recording) => (
                <div
                  key={recording.id}
                  className="glass-card p-4 flex items-center gap-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Volume2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{recording.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDuration(recording.duration)} • {recording.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(recording.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
