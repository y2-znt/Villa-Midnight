import { motion, useInView } from "motion/react";
import { useRef } from "react";

type FadeUpOnScrollType = {
  children: React.ReactNode;
  delay?: number;
};

export default function FadeUpOnScroll({
  children,
  delay = 0,
}: FadeUpOnScrollType) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
