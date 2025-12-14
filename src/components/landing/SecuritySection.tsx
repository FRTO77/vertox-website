import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Server, Key, CheckCircle2 } from 'lucide-react';

const securityFeatures = [
  {
    icon: Lock,
    title: 'End-to-End Encryption',
    description: 'All data is encrypted in transit and at rest using industry-standard protocols.',
  },
  {
    icon: Eye,
    title: 'Privacy First',
    description: 'Your conversations are never stored or used for training without explicit consent.',
  },
  {
    icon: Server,
    title: 'Secure Infrastructure',
    description: 'Enterprise-grade infrastructure with SOC 2 Type II compliance.',
  },
  {
    icon: Key,
    title: 'Access Control',
    description: 'Role-based access control and audit logs for enterprise accounts.',
  },
];

const certifications = [
  'GDPR Compliant',
  'SOC 2 Type II',
  'ISO 27001',
  'HIPAA Ready',
];

export function SecuritySection() {
  return (
    <section className="py-28 md:py-36 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/15 text-primary text-[13px] font-medium mb-6">
              <Shield className="h-3.5 w-3.5" />
              Enterprise Security
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
              Your data security is our{' '}
              <span className="gradient-text">top priority</span>
            </h2>
            
            <p className="text-muted-foreground/90 mb-8 text-lg leading-relaxed">
              We implement industry-leading security practices to ensure your conversations 
              and data remain private and protected at all times.
            </p>

            <div className="flex flex-wrap gap-2.5 mb-8">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-2 px-3.5 py-2 bg-accent/8 border border-accent/15 rounded-lg text-sm font-medium"
                >
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {securityFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
