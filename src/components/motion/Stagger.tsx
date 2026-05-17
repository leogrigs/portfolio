import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HTMLMotionProps, motion, Variants } from "framer-motion";

interface StaggerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
  initialDelay?: number;
}

const containerVariants = (
  staggerDelay: number,
  initialDelay: number,
  reducedMotion: boolean
): Variants => ({
  hidden: {},
  visible: {
    transition: reducedMotion
      ? { staggerChildren: 0, delayChildren: 0 }
      : {
          staggerChildren: staggerDelay,
          delayChildren: initialDelay,
        },
  },
});

const itemVariants = (reducedMotion: boolean): Variants => ({
  hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: reducedMotion
      ? { duration: 0 }
      : { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
});

export function Stagger({
  children,
  staggerDelay = 0.08,
  initialDelay = 0,
  ...props
}: StaggerProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants(staggerDelay, initialDelay, reducedMotion)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div variants={itemVariants(reducedMotion)} {...props}>
      {children}
    </motion.div>
  );
}
