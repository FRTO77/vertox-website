import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Video, 
  Link as LinkIcon, 
  Copy, 
  Mail, 
  Plus,
  Check
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function MeetPage() {
  const [meetingLink, setMeetingLink] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateMeetingLink = () => {
    const newLink = `https://meet.vertox.app/${crypto.randomUUID().slice(0, 8)}`;
    setGeneratedLink(newLink);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    toast({ title: 'Link copied to clipboard' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoin = () => {
    if (!meetingLink.trim()) {
      toast({ title: 'Please enter a meeting link', variant: 'destructive' });
      return;
    }
    // Navigate to pre-join screen
    window.location.href = `/dashboard/meet/join?link=${encodeURIComponent(meetingLink)}`;
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
          <h1 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-2">VertoX Meet</h1>
          <p className="text-muted-foreground/90">
            Start or join a meeting with real-time translation
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Join Meeting */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-card p-7">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                <LinkIcon className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight mb-2">Join a Meeting</h2>
              <p className="text-sm text-muted-foreground/90 mb-6 leading-relaxed">
                Enter the meeting link to join an existing meeting
              </p>
              
              <div className="space-y-4">
                <Input
                  placeholder="Enter meeting link"
                  value={meetingLink}
                  onChange={(e) => setMeetingLink(e.target.value)}
                  className="h-12 bg-secondary/40 border-border/60"
                />
                <Button variant="hero" className="w-full" onClick={handleJoin}>
                  Join Meeting
                </Button>
              </div>
            </div>
          </motion.div>

          {/* New Meeting */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass-card p-7">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <Video className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight mb-2">New Meeting</h2>
              <p className="text-sm text-muted-foreground/90 mb-6 leading-relaxed">
                Generate a new meeting link and invite participants
              </p>
              
              <div className="space-y-4">
                {generatedLink ? (
                  <>
                    <div className="flex gap-2">
                      <Input
                        value={generatedLink}
                        readOnly
                        className="h-12 bg-secondary/50 border-border text-sm"
                      />
                      <Button
                        variant="glass"
                        size="icon"
                        className="h-12 w-12 shrink-0"
                        onClick={copyLink}
                      >
                        {copied ? (
                          <Check className="h-5 w-5 text-accent" />
                        ) : (
                          <Copy className="h-5 w-5" />
                        )}
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="heroOutline"
                        className="flex-1"
                        onClick={() => {
                          window.location.href = `mailto:?subject=Join my VertoX meeting&body=Join my meeting: ${generatedLink}`;
                        }}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Invite via Email
                      </Button>
                      <Button
                        variant="hero"
                        className="flex-1"
                        onClick={() => {
                          window.location.href = `/dashboard/meet/join?link=${encodeURIComponent(generatedLink)}`;
                        }}
                      >
                        Start Now
                      </Button>
                    </div>
                  </>
                ) : (
                  <Button
                    variant="glass"
                    className="w-full h-12"
                    onClick={generateMeetingLink}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Generate Meeting Link
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Meetings */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="mt-8"
        >
          <h2 className="text-lg font-semibold mb-4">Recent Meetings</h2>
          <div className="glass-card p-8 text-center">
            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No recent meetings</p>
            <p className="text-sm text-muted-foreground mt-1">
              Your meeting history will appear here
            </p>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
