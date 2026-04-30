import { motion, useReducedMotion } from 'framer-motion';

const services = [
  {
    number: '01',
    title: 'Design',
    description: 'Felhasználó-központú, modern UI/UX tervezés, amely a te márkádra szabva kelt életre.'
  },
  {
    number: '02',
    title: 'Fejlesztés',
    description: 'React, TypeScript és egyéb cutting-edge technológiák használata a gyors, biztonságos oldalakért.'
  },
  {
    number: '03',
    title: 'Optimalizálás',
    description: 'SEO, teljesítmény-finomhangolás és analitika, hogy a weboldalad ne csak szép, de hatékony is legyen.'
  }
];

const Services = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
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
        <p className="text-white/60 max-w-2xl mb-10 sm:mb-12 md:mb-16">
          Teljeskörű szolgáltatás az első ötlettől a folyamatos karbantartásig.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.number}
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="relative bg-deep-black border border-primary/20 rounded-3xl p-4 sm:p-6 md:p-8 hover:border-primary/40 transition-all group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-orchid-mist/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
            <div className="absolute -right-10 -top-10 sm:-right-8 sm:-top-8 text-7xl sm:text-8xl md:text-9xl font-display font-bold text-primary/5 group-hover:text-primary/10 transition-colors select-none" aria-hidden="true">
              {service.number}
            </div>
            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-white/70">{service.description}</p>
            </div>
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Services;