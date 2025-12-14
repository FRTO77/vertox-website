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
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-6">
              <Shield className="h-4 w-4" />
              Enterprise Security
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Your data security is our{' '}
              <span className="gradient-text">top priority</span>
            </h2>
            
            <p className="text-muted-foreground mb-8 text-lg">
              We implement industry-leading security practices to ensure your conversations 
              and data remain private and protected at all times.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              {certifications.map((cert) => (
                <div
                  key={cert}
                  className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-sm"
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
