import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Handshake, Building2, Globe, Zap, Users, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const PartnershipPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    partnerType: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Partnership inquiry submitted!",
      description: "Our partnerships team will contact you within 48 hours.",
    });
    setFormData({ company: "", name: "", email: "", partnerType: "", message: "" });
  };

  const partnerTypes = [
    {
      icon: Building2,
      title: "Technology Partners",
      description: "Integrate VertoX translation capabilities into your platform or product."
    },
    {
      icon: Globe,
      title: "Reseller Partners",
      description: "Distribute VertoX solutions to your customers and earn revenue."
    },
    {
      icon: Users,
      title: "Implementation Partners",
      description: "Help enterprises deploy and customize VertoX for their needs."
    }
  ];

  const benefits = [
    { icon: Zap, text: "Access to cutting-edge AI translation technology" },
    { icon: TrendingUp, text: "Revenue sharing and growth opportunities" },
    { icon: Handshake, text: "Dedicated partner support and resources" },
    { icon: Globe, text: "Co-marketing and lead generation programs" }
  ];

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
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Handshake className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Partner with <span className="gradient-text">VertoX</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Join our partner ecosystem and help organizations break language barriers 
                with AI-powered real-time translation technology.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Partner Types */}
        <section className="px-6 pb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-10">Partnership Programs</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {partnerTypes.map((type, index) => (
                <motion.div
                  key={type.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <type.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{type.title}</h3>
                  <p className="text-sm text-muted-foreground">{type.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="px-6 pb-16">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8"
            >
              <h2 className="text-2xl font-bold mb-6 text-center">Partner Benefits</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-muted-foreground text-sm pt-2">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-6">Become a Partner</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                    <Input
                      type="text"
                      placeholder="Your company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                    <Input
                      type="text"
                      placeholder="Full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Work Email</label>
                  <Input
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Partnership Interest</label>
                  <select
                    className="w-full h-11 px-4 bg-background border border-border/50 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    value={formData.partnerType}
                    onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                    required
                  >
                    <option value="">Select partnership type</option>
                    <option value="technology">Technology Partner</option>
                    <option value="reseller">Reseller Partner</option>
                    <option value="implementation">Implementation Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Tell us more</label>
                  <Textarea
                    placeholder="Describe your partnership interest and how you'd like to collaborate..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="bg-background border-border/50 rounded-xl"
                  />
                </div>
                <Button type="submit" className="w-full" variant="hero">
                  Submit Partnership Inquiry
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PartnershipPage;
