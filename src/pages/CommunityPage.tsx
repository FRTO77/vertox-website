import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Users, BookOpen, Star, ExternalLink, Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const resources = [
  {
    icon: MessageCircle,
    title: "Discord Community",
    description: "Join thousands of developers and users discussing real-time translation.",
    link: "https://discord.gg/lovable-dev",
    linkText: "Join Discord",
  },
  {
    icon: Github,
    title: "GitHub Discussions",
    description: "Contribute to open-source projects and discuss technical implementations.",
    link: "#",
    linkText: "View GitHub",
  },
  {
    icon: BookOpen,
    title: "Developer Forum",
    description: "Ask questions, share solutions, and learn from the community.",
    link: "#",
    linkText: "Visit Forum",
  },
  {
    icon: Twitter,
    title: "Follow on X",
    description: "Stay updated with the latest news and feature announcements.",
    link: "#",
    linkText: "Follow Us",
  },
];

const stories = [
  {
    name: "Maria Chen",
    role: "Product Manager at TechFlow",
    quote: "VertoX transformed how our global team collaborates. Meetings are now seamless across 12 languages.",
    avatar: "MC",
  },
  {
    name: "David Kowalski",
    role: "Founder, RemoteFirst",
    quote: "The API integration was incredibly smooth. We had real-time translation working in our app within hours.",
    avatar: "DK",
  },
  {
    name: "Aisha Patel",
    role: "Head of Engineering, GlobalEd",
    quote: "Voice cloning feature maintains speaker personality across translations. Our students love it.",
    avatar: "AP",
  },
];

const stats = [
  { value: "50K+", label: "Community Members" },
  { value: "120+", label: "Countries" },
  { value: "45+", label: "Languages" },
  { value: "99.9%", label: "Uptime" },
];

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <Link to="/" className="text-xl font-semibold gradient-text">
            VertoX
          </Link>
          <div className="w-24" />
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Community
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Connect, Learn,
              <span className="gradient-text block">Build Together</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join a global community of developers, creators, and businesses breaking language barriers together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Join the Conversation</h2>
            <p className="text-muted-foreground">Connect with us across platforms</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((resource, index) => (
              <motion.a
                key={resource.title}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6 flex items-start gap-4 hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <resource.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-primary">
                    {resource.linkText}
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* User Stories */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Community Stories</h2>
            <p className="text-muted-foreground">Hear from people using VertoX</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <motion.div
                key={story.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-1 text-primary mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-foreground mb-6 text-sm leading-relaxed">"{story.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                    {story.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-foreground text-sm">{story.name}</div>
                    <div className="text-xs text-muted-foreground">{story.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center glass-card p-8 md:p-12"
        >
          <Users className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Join?
          </h2>
          <p className="text-muted-foreground mb-6">
            Become part of a growing community shaping the future of global communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg" asChild>
              <a href="https://discord.gg/lovable-dev" target="_blank" rel="noopener noreferrer">
                Join Discord
              </a>
            </Button>
            <Button variant="heroOutline" size="lg" asChild>
              <Link to="/signup">Create Account</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          © VertoX, 2025. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default CommunityPage;
