import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HTMLMotionProps, motion } from "framer-motion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  y?: number;
  duration?: number;
}

export default function FadeIn({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  ...props
}: FadeInProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reducedMotion ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={
        reducedMotion
          ? { duration: 0 }
          : {
              duration,
              delay,
              ease: [0.22, 1, 0.36, 1],
            }
      }
      {...props}
    >
      {children}
    </motion.div>
  );
}
