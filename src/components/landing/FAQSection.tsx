import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does VertoX real-time translation work?',
    answer: 'VertoX captures audio from the speaker, processes it through our advanced AI translation engine, and delivers the translated audio to the listener\'s headphones — all in under 500 milliseconds.',
  },
  {
    question: 'What languages does VertoX support?',
    answer: 'We currently support 30+ languages including English, Spanish, French, German, Chinese, Japanese, Russian, Arabic, Uzbek, Kazakh, and many more. We\'re constantly adding new languages.',
  },
  {
    question: 'Is my data and conversations secure?',
    answer: 'Absolutely. We use end-to-end encryption for all communications. Your conversations are never stored or used for training purposes. We\'re SOC 2 Type II certified and GDPR compliant.',
  },
  {
    question: 'How does voice cloning work?',
    answer: 'You provide a short voice sample, and our AI learns your unique vocal characteristics — tone, pitch, and speaking patterns. Translations are then delivered in your cloned voice for a natural experience.',
  },
  {
    question: 'Can I use VertoX for business meetings?',
    answer: 'Yes! VertoX is perfect for both online and in-person business meetings. We offer specialized solutions for enterprises with advanced features like meeting transcripts and analytics.',
  },
  {
    question: 'Is there a free plan available?',
    answer: 'Yes, we offer a free plan with limited minutes per month. It\'s perfect for trying out VertoX. Upgrade to Pro or Premium for unlimited access and additional features.',
  },
  {
    question: 'Do you offer an API for developers?',
    answer: 'Yes! Our comprehensive API includes Speech-to-Speech, Speech-to-Text, Text-to-Speech, and Real-Time Translation endpoints. Check our developer documentation for integration guides.',
  },
  {
    question: 'What hardware do I need?',
    answer: 'Just a device with a microphone and headphones. VertoX works on web browsers, and we offer desktop apps for Windows, macOS, and Linux for the best experience.',
  },
  {
    question: 'How accurate are the translations?',
    answer: 'Our AI achieves 95%+ accuracy for most language pairs, with continuous improvements through advanced language models. Context-aware translation ensures natural, meaningful results.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time from your account settings. You\'ll continue to have access until the end of your billing period.',
  },
];

export function FAQSection() {
  return (
    <section className="py-28 md:py-36 bg-background" id="faq">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-5">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg">
            Everything you need to know about VertoX
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass-card px-6 border-border data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-medium pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
