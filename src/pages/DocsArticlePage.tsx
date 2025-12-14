import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Copy, Check, ChevronRight, Book, Code, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const DocsArticlePage = () => {
  const { category, slug } = useParams();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Mock data - in real app would fetch based on category/slug
  const article = {
    title: "Speech-to-Speech API",
    description: "Real-time voice translation between any supported languages",
    category: "API Reference",
    lastUpdated: "January 12, 2025",
    content: [
      {
        type: "text",
        content: "The Speech-to-Speech API enables real-time translation of spoken audio from one language to another, preserving the speaker's voice characteristics when voice cloning is enabled."
      },
      {
        type: "heading",
        level: 2,
        content: "Endpoint"
      },
      {
        type: "code",
        language: "bash",
        content: "POST https://api.vertox.ai/v1/translate/speech-to-speech"
      },
      {
        type: "heading",
        level: 2,
        content: "Authentication"
      },
      {
        type: "text",
        content: "All API requests require authentication using your API key. Include your key in the Authorization header:"
      },
      {
        type: "code",
        language: "bash",
        content: "Authorization: Bearer YOUR_API_KEY"
      },
      {
        type: "heading",
        level: 2,
        content: "Request Parameters"
      },
      {
        type: "table",
        headers: ["Parameter", "Type", "Required", "Description"],
        rows: [
          ["audio", "file/base64", "Yes", "Input audio file or base64 encoded audio"],
          ["source_language", "string", "Yes", "Source language code (e.g., 'en', 'es')"],
          ["target_language", "string", "Yes", "Target language code"],
          ["voice_clone_id", "string", "No", "Voice profile ID for cloned voice output"],
          ["format", "string", "No", "Output format: 'mp3', 'wav', 'ogg' (default: 'mp3')"],
          ["sample_rate", "integer", "No", "Output sample rate in Hz (default: 44100)"]
        ]
      },
      {
        type: "heading",
        level: 2,
        content: "Example Request"
      },
      {
        type: "code",
        language: "javascript",
        content: `const response = await fetch('https://api.vertox.ai/v1/translate/speech-to-speech', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    audio: audioBase64,
    source_language: 'en',
    target_language: 'es',
    voice_clone_id: 'vc_abc123',
    format: 'mp3'
  })
});

const result = await response.json();
console.log(result.translated_audio_url);`
      },
      {
        type: "heading",
        level: 2,
        content: "Response"
      },
      {
        type: "code",
        language: "json",
        content: `{
  "id": "tr_xyz789",
  "status": "completed",
  "source_language": "en",
  "target_language": "es",
  "duration_seconds": 12.5,
  "translated_audio_url": "https://cdn.vertox.ai/audio/tr_xyz789.mp3",
  "transcript": {
    "original": "Hello, how are you today?",
    "translated": "Hola, ¿cómo estás hoy?"
  },
  "created_at": "2025-01-12T10:30:00Z"
}`
      },
      {
        type: "heading",
        level: 2,
        content: "Error Codes"
      },
      {
        type: "table",
        headers: ["Code", "Description"],
        rows: [
          ["400", "Invalid request parameters"],
          ["401", "Invalid or missing API key"],
          ["402", "Insufficient credits"],
          ["413", "Audio file too large (max 25MB)"],
          ["415", "Unsupported audio format"],
          ["422", "Unsupported language pair"],
          ["429", "Rate limit exceeded"],
          ["500", "Internal server error"]
        ]
      },
      {
        type: "heading",
        level: 2,
        content: "Rate Limits"
      },
      {
        type: "text",
        content: "Rate limits vary by plan:"
      },
      {
        type: "table",
        headers: ["Plan", "Requests/minute", "Max audio duration"],
        rows: [
          ["Free", "10", "60 seconds"],
          ["Pro", "60", "10 minutes"],
          ["Premium", "120", "30 minutes"],
          ["Enterprise", "Custom", "Custom"]
        ]
      }
    ]
  };

  const sidebarLinks = [
    { title: "Quick Start Guide", slug: "quick-start" },
    { title: "Installation", slug: "installation" },
    { title: "Authentication", slug: "authentication" },
    { title: "Speech-to-Speech API", slug: "speech-to-speech", active: true },
    { title: "Speech-to-Text API", slug: "speech-to-text" },
    { title: "Text-to-Speech API", slug: "text-to-speech" },
    { title: "Translation API", slug: "translation" },
    { title: "Voice Cloning", slug: "voice-cloning" },
    { title: "Webhooks", slug: "webhooks" },
    { title: "Error Handling", slug: "error-handling" }
  ];

  const handleCopyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderContent = (item: any, index: number) => {
    switch (item.type) {
      case "heading":
        const HeadingTag = `h${item.level}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag
            key={index}
            className={`font-bold text-foreground ${
              item.level === 2 ? "text-xl mt-10 mb-4" : "text-lg mt-8 mb-3"
            }`}
          >
            {item.content}
          </HeadingTag>
        );
      case "text":
        return (
          <p key={index} className="text-muted-foreground leading-relaxed mb-4">
            {item.content}
          </p>
        );
      case "code":
        return (
          <div key={index} className="relative group mb-6">
            <div className="absolute top-3 right-3 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleCopyCode(item.content, index)}
              >
                {copiedIndex === index ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="absolute top-3 left-4 text-xs text-muted-foreground font-mono">
              {item.language}
            </div>
            <pre className="bg-secondary/30 border border-border/50 rounded-xl p-4 pt-10 overflow-x-auto">
              <code className="text-sm text-foreground font-mono whitespace-pre">
                {item.content}
              </code>
            </pre>
          </div>
        );
      case "table":
        return (
          <div key={index} className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border/50">
                  {item.headers.map((header: string, i: number) => (
                    <th
                      key={i}
                      className="text-left py-3 px-4 text-sm font-semibold text-foreground"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {item.rows.map((row: string[], rowIndex: number) => (
                  <tr key={rowIndex} className="border-b border-border/30">
                    {row.map((cell: string, cellIndex: number) => (
                      <td
                        key={cellIndex}
                        className="py-3 px-4 text-sm text-muted-foreground font-mono"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/docs" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Docs
          </Link>
          <Link to="/" className="text-xl font-bold gradient-text">VertoX</Link>
        </div>
      </header>

      <div className="pt-20 flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 fixed left-0 top-20 bottom-0 border-r border-border/50 overflow-y-auto p-6">
          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.slug}
                to={`/docs/api-reference/${link.slug}`}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                  link.active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <ChevronRight className={`w-4 h-4 ${link.active ? "text-primary" : ""}`} />
                {link.title}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/docs" className="hover:text-foreground transition-colors">Docs</Link>
                <ChevronRight className="w-4 h-4" />
                <span>{article.category}</span>
                <ChevronRight className="w-4 h-4" />
                <span className="text-foreground">{article.title}</span>
              </div>

              {/* Title */}
              <div className="mb-8 pb-8 border-b border-border/50">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground mb-3">{article.title}</h1>
                    <p className="text-muted-foreground">{article.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Last updated: {article.lastUpdated}
                </p>
              </div>

              {/* Content */}
              <div>
                {article.content.map((item, index) => renderContent(item, index))}
              </div>

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-border/50 flex justify-between">
                <Link
                  to="/docs/api-reference/authentication"
                  className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <p className="text-xs">Previous</p>
                    <p className="font-medium">Authentication</p>
                  </div>
                </Link>
                <Link
                  to="/docs/api-reference/speech-to-text"
                  className="group flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-right"
                >
                  <div>
                    <p className="text-xs">Next</p>
                    <p className="font-medium">Speech-to-Text API</p>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DocsArticlePage;
