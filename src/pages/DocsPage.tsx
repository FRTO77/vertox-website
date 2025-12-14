import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Book, Code, Zap, Shield, Mic, Video, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const DocsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      title: "Getting Started",
      icon: Zap,
      articles: [
        { title: "Quick Start Guide", description: "Get up and running in 5 minutes" },
        { title: "Installation", description: "Install VertoX on your platform" },
        { title: "Authentication", description: "Set up API authentication" },
        { title: "First Translation", description: "Make your first API call" }
      ]
    },
    {
      title: "API Reference",
      icon: Code,
      articles: [
        { title: "Speech-to-Speech API", description: "Real-time voice translation" },
        { title: "Speech-to-Text API", description: "Transcription endpoints" },
        { title: "Text-to-Speech API", description: "Voice synthesis endpoints" },
        { title: "Translation API", description: "Text translation endpoints" }
      ]
    },
    {
      title: "Voice Cloning",
      icon: Mic,
      articles: [
        { title: "Voice Recording", description: "How to record voice samples" },
        { title: "Voice Training", description: "Train your voice model" },
        { title: "Using Cloned Voice", description: "Apply voice to translations" },
        { title: "Voice Management", description: "Manage voice profiles" }
      ]
    },
    {
      title: "VertoX Meet",
      icon: Video,
      articles: [
        { title: "Creating Meetings", description: "Start and schedule meetings" },
        { title: "Joining Meetings", description: "Join via link or code" },
        { title: "In-Meeting Controls", description: "Camera, mic, and settings" },
        { title: "Recording & Transcripts", description: "Save meeting content" }
      ]
    },
    {
      title: "Security",
      icon: Shield,
      articles: [
        { title: "Data Encryption", description: "How we protect your data" },
        { title: "API Security", description: "Secure API implementation" },
        { title: "Compliance", description: "GDPR, SOC 2, and more" },
        { title: "Best Practices", description: "Security recommendations" }
      ]
    }
  ];

  const filteredCategories = categories.map(category => ({
    ...category,
    articles: category.articles.filter(
      article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.articles.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link to="/" className="text-xl font-bold gradient-text">VertoX</Link>
        </div>
      </header>

      <main className="pt-24 pb-20">
        {/* Hero */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Book className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Documentation</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                Everything you need to integrate and use VertoX translation services.
              </p>
              
              {/* Search */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Documentation Categories */}
        <section className="px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            {filteredCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">{category.title}</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {category.articles.map((article, index) => (
                    <motion.div
                      key={article.title}
                      whileHover={{ scale: 1.02 }}
                      className="glass-card p-5 cursor-pointer group"
                    >
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{article.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Quick Links */}
        <section className="px-6 mt-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-8 text-center"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Need Help?</h2>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/contact"
                  className="text-primary hover:underline font-medium"
                >
                  Contact Support
                </Link>
                <span className="text-border">•</span>
                <Link
                  to="/community"
                  className="text-primary hover:underline font-medium"
                >
                  Join Community
                </Link>
                <span className="text-border">•</span>
                <a
                  href="mailto:developers@vertox.ai"
                  className="text-primary hover:underline font-medium"
                >
                  Email Developers
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DocsPage;
