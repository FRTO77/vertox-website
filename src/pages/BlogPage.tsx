import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPage = () => {
  const featuredPost = {
    title: "Introducing VertoX 2.0: The Future of Real-Time Translation",
    excerpt: "We're excited to announce the biggest update to VertoX yet, featuring improved accuracy, faster processing, and support for 50+ new languages.",
    author: "Alex Chen",
    date: "January 10, 2025",
    readTime: "5 min read",
    category: "Product Updates"
  };

  const posts = [
    {
      title: "How Voice Cloning is Revolutionizing Global Communication",
      excerpt: "Discover how AI-powered voice cloning maintains speaker identity across language barriers.",
      author: "Sarah Mitchell",
      date: "January 8, 2025",
      readTime: "4 min read",
      category: "Technology"
    },
    {
      title: "Best Practices for Multilingual Video Conferences",
      excerpt: "Tips and strategies for running effective meetings with participants speaking different languages.",
      author: "David Park",
      date: "January 5, 2025",
      readTime: "6 min read",
      category: "Guides"
    },
    {
      title: "Enterprise Case Study: Global Corp's Translation Journey",
      excerpt: "How a Fortune 500 company reduced translation costs by 70% with VertoX.",
      author: "Emma Wilson",
      date: "January 2, 2025",
      readTime: "8 min read",
      category: "Case Studies"
    },
    {
      title: "The Science Behind Real-Time Speech Translation",
      excerpt: "A deep dive into the neural networks and algorithms powering instant translation.",
      author: "Dr. James Liu",
      date: "December 28, 2024",
      readTime: "10 min read",
      category: "Technology"
    },
    {
      title: "2024 Year in Review: Breaking Language Barriers",
      excerpt: "Looking back at a year of milestones, growth, and innovations at VertoX.",
      author: "Alex Chen",
      date: "December 20, 2024",
      readTime: "7 min read",
      category: "Company News"
    },
    {
      title: "API Integration Guide: Getting Started in 10 Minutes",
      excerpt: "A step-by-step tutorial for developers to integrate VertoX translation APIs.",
      author: "Mike Johnson",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Tutorials"
    }
  ];

  const categories = ["All", "Product Updates", "Technology", "Guides", "Case Studies", "Tutorials"];

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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                VertoX <span className="gradient-text">Blog</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Insights, updates, and stories about translation technology, global communication, and the future of language.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        <section className="px-6 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category, index) => (
                <motion.button
                  key={category}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    category === "All"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Post */}
        <section className="px-6 pb-12">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 md:p-10 cursor-pointer group"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                {featuredPost.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-4">
                {featuredPost.title}
              </h2>
              <p className="text-muted-foreground mb-6 max-w-3xl">
                {featuredPost.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {featuredPost.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {featuredPost.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {featuredPost.readTime}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Posts Grid */}
        <section className="px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <motion.article
                  key={post.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="glass-card p-6 cursor-pointer group flex flex-col"
                >
                  <span className="inline-block px-2 py-1 rounded-full bg-secondary/50 text-muted-foreground text-xs font-medium mb-3 w-fit">
                    {post.category}
                  </span>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border/50">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Load More */}
        <section className="px-6 mt-12">
          <div className="max-w-5xl mx-auto text-center">
            <Button variant="outline" className="group">
              Load More Articles
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        {/* Newsletter */}
        <section className="px-6 mt-16">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-card p-8 text-center"
            >
              <h2 className="text-xl font-bold text-foreground mb-3">Stay Updated</h2>
              <p className="text-muted-foreground mb-6">
                Get the latest articles and updates delivered to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 h-11 px-4 bg-background border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <Button variant="hero">Subscribe</Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BlogPage;
