import { motion, useReducedMotion } from 'framer-motion';

const CTA = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="cta" className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-deep-black via-deep-black to-primary/25 text-white border-y border-primary/25">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-6xl font-display font-bold mb-6 leading-tight"
        >
          Van egy ötleted?
          <br className="hidden sm:block" />
          <span className="text-primary"> Mi kódba öntjük.</span>
        </motion.h2>
        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
          className="text-white/60 mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base"
        >
          Beszéljük meg, hogyan válthatjuk valóra az elképzeléseidet egy profi, 
          egyedi weboldallal.
        </motion.p>
        <motion.button
          type="button"
          initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="px-8 sm:px-10 py-4 min-h-11 bg-transparent border-2 border-primary text-primary font-bold text-base sm:text-lg rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(128,59,178,0.6)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Kezdjük el a projektet
        </motion.button>
      </div>
    </section>
  );
};

export default CTA;