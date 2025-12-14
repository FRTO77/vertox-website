import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Mic, Play, Square, Trash2, Volume2, Bot, Sparkles, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VoiceRecording {
  id: string;
  name: string;
  duration: number;
  createdAt: Date;
  type: 'manual' | 'ai-conversation';
}

export default function VoicePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<VoiceRecording[]>([]);
  const [aiAssistantEnabled, setAiAssistantEnabled] = useState(false);
  const [isAiListening, setIsAiListening] = useState(false);
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
      type: 'manual',
    };
    setRecordings((prev) => [newRecording, ...prev]);
    toast({ title: 'Recording saved', description: 'Your voice sample has been saved' });
  };

  const handleToggleAiAssistant = (enabled: boolean) => {
    setAiAssistantEnabled(enabled);
    if (enabled) {
      toast({ 
        title: 'AI Assistant activated', 
        description: 'Start talking - share your plans, ideas, or anything on your mind' 
      });
    } else {
      setIsAiListening(false);
      toast({ title: 'AI Assistant deactivated' });
    }
  };

  const handleStartAiConversation = () => {
    setIsAiListening(true);
    toast({ 
      title: 'AI is listening...', 
      description: 'Talk about your plans, ideas, or anything you want. AI will learn your voice.' 
    });
  };

  const handleStopAiConversation = () => {
    setIsAiListening(false);
    const newRecording: VoiceRecording = {
      id: crypto.randomUUID(),
      name: `AI Conversation ${recordings.filter(r => r.type === 'ai-conversation').length + 1}`,
      duration: Math.floor(Math.random() * 180) + 30,
      createdAt: new Date(),
      type: 'ai-conversation',
    };
    setRecordings((prev) => [newRecording, ...prev]);
    toast({ 
      title: 'Conversation saved', 
      description: 'AI has analyzed your voice, tone, and emotions from this conversation' 
    });
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

        {/* AI Assistant Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="glass-card p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <Bot className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI Voice Assistant</h3>
                <p className="text-sm text-muted-foreground">Talk naturally, AI learns your voice</p>
              </div>
            </div>
            <Switch
              checked={aiAssistantEnabled}
              onCheckedChange={handleToggleAiAssistant}
            />
          </div>

          {aiAssistantEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border/50 pt-6"
            >
              <div className="text-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={isAiListening ? handleStopAiConversation : handleStartAiConversation}
                  className={`w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 relative ${
                    isAiListening
                      ? 'bg-gradient-to-br from-primary to-accent'
                      : 'bg-gradient-to-br from-primary/80 to-accent/80 hover:from-primary hover:to-accent'
                  }`}
                >
                  {isAiListening && (
                    <>
                      <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                      <span className="absolute inset-[-8px] rounded-full border-2 border-primary/40 animate-pulse" />
                    </>
                  )}
                  {isAiListening ? (
                    <Square className="h-10 w-10 text-primary-foreground relative z-10" />
                  ) : (
                    <MessageCircle className="h-10 w-10 text-primary-foreground relative z-10" />
                  )}
                </motion.button>

                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="text-xl font-semibold">
                    {isAiListening ? 'AI is listening...' : 'Start Conversation'}
                  </h3>
                </div>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  {isAiListening
                    ? 'Share your thoughts, plans, or ideas. AI is learning your voice, tone, and emotions.'
                    : 'Talk about your plans, ideas, or anything you want. The AI will record and learn your unique voice characteristics.'}
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Manual Recording Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="glass-card p-8 mb-8"
        >
          <div className="text-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={isRecording ? handleStopRecording : handleStartRecording}
              disabled={isAiListening}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${
                isRecording
                  ? 'bg-destructive text-destructive-foreground animate-pulse'
                  : isAiListening
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
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
              {isRecording ? 'Recording...' : 'Manual Recording'}
            </h3>
            <p className="text-muted-foreground text-sm max-w-md mx-auto">
              {isRecording
                ? 'Speak naturally. Click the button to stop recording.'
                : 'Click the microphone to start a manual recording. We recommend at least 30 seconds for best results.'}
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
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    recording.type === 'ai-conversation' 
                      ? 'bg-gradient-to-br from-primary/20 to-accent/20' 
                      : 'bg-primary/10'
                  }`}>
                    {recording.type === 'ai-conversation' ? (
                      <MessageCircle className="h-5 w-5 text-primary" />
                    ) : (
                      <Volume2 className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{recording.name}</p>
                      {recording.type === 'ai-conversation' && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                          AI Learned
                        </span>
                      )}
                    </div>
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
