import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
}

const AnimatedSection = ({
  children,
  duration = 0.6,
  delay = 0,
}: AnimatedSectionProps) => (
  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration, delay }}
    className="w-full flex justify-center"
  >
    {children}
  </motion.div>
);

export default AnimatedSection;