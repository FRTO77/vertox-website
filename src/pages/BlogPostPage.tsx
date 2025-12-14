import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Share2, Twitter, Linkedin, Copy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const BlogPostPage = () => {
  const { slug } = useParams();
  const { toast } = useToast();

  // Mock data - in real app would fetch based on slug
  const post = {
    title: "Introducing VertoX 2.0: The Future of Real-Time Translation",
    excerpt: "We're excited to announce the biggest update to VertoX yet.",
    author: "Alex Chen",
    authorRole: "CEO & Co-founder",
    date: "January 10, 2025",
    readTime: "5 min read",
    category: "Product Updates",
    content: `
      <p>Today marks a significant milestone in our journey to break down language barriers worldwide. We're thrilled to announce VertoX 2.0, the most comprehensive update to our real-time translation platform since launch.</p>

      <h2>What's New in VertoX 2.0</h2>
      
      <p>After months of development and extensive feedback from our community, we've rebuilt our translation engine from the ground up. Here's what you can expect:</p>

      <h3>Enhanced Translation Accuracy</h3>
      <p>Our new neural translation model achieves 40% better accuracy compared to our previous version. We've trained on over 100 billion multilingual sentences, resulting in more natural and contextually accurate translations.</p>

      <h3>50+ New Languages</h3>
      <p>We've expanded our language support to include 120 languages and dialects. This includes improved support for Central Asian languages like Uzbek and Kazakh, as well as various regional dialects.</p>

      <h3>Faster Processing</h3>
      <p>Real-time means real-time. Our new infrastructure reduces latency by 60%, making conversations feel more natural than ever. You'll barely notice the translation happening.</p>

      <h3>Advanced Voice Cloning</h3>
      <p>Our voice cloning technology now requires only 30 seconds of audio to create a realistic voice profile. The cloned voice maintains emotional nuances and speaking patterns across all supported languages.</p>

      <h2>Enterprise Features</h2>
      
      <p>For our enterprise customers, VertoX 2.0 introduces several powerful new capabilities:</p>

      <ul>
        <li>Custom terminology management for industry-specific vocabulary</li>
        <li>Advanced analytics and usage reporting</li>
        <li>Single Sign-On (SSO) integration</li>
        <li>Dedicated infrastructure options</li>
        <li>Priority support with 99.99% SLA</li>
      </ul>

      <h2>Pricing Updates</h2>
      
      <p>We believe powerful translation technology should be accessible to everyone. Our Free tier now includes 60 minutes of translation per month, and we've increased limits across all paid plans.</p>

      <h2>Getting Started</h2>
      
      <p>Existing users will be automatically upgraded to VertoX 2.0 over the next two weeks. New users can start experiencing the future of translation today by signing up at vertox.ai.</p>

      <p>We're incredibly grateful to our community for your continued support and feedback. This update wouldn't have been possible without you.</p>

      <p>Here's to breaking more language barriers together.</p>
    `
  };

  const relatedPosts = [
    {
      title: "How Voice Cloning is Revolutionizing Global Communication",
      category: "Technology",
      readTime: "4 min read",
      slug: "voice-cloning-revolution"
    },
    {
      title: "Best Practices for Multilingual Video Conferences",
      category: "Guides",
      readTime: "6 min read",
      slug: "multilingual-video-conferences"
    },
    {
      title: "The Science Behind Real-Time Speech Translation",
      category: "Technology",
      readTime: "10 min read",
      slug: "science-behind-translation"
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied!",
      description: "The article link has been copied to your clipboard.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <Link to="/" className="text-xl font-bold gradient-text">VertoX</Link>
        </div>
      </header>

      <main className="pt-24 pb-20">
        {/* Article Header */}
        <article className="px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                {post.category}
              </span>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium text-sm">{post.author}</p>
                    <p className="text-xs">{post.authorRole}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  {post.readTime}
                </div>
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none
                prose-headings:text-foreground prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-ul:text-muted-foreground prose-ul:my-4
                prose-li:mb-2
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Share Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 pt-8 border-t border-border/50"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-foreground font-medium">Share this article</p>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="icon" className="rounded-full" onClick={handleCopyLink}>
                    <Copy className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </article>

        {/* Related Posts */}
        <section className="px-6 mt-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Link
                    to={`/blog/${relatedPost.slug}`}
                    className="glass-card p-5 block group"
                  >
                    <span className="inline-block px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs font-medium mb-3">
                      {relatedPost.category}
                    </span>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">{relatedPost.readTime}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 mt-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-8 text-center"
            >
              <h2 className="text-xl font-bold text-foreground mb-3">Ready to try VertoX?</h2>
              <p className="text-muted-foreground mb-6">
                Start translating in real-time with our free tier. No credit card required.
              </p>
              <Link to="/signup">
                <Button variant="hero">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPostPage;
