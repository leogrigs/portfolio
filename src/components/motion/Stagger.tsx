import { HTMLMotionProps, motion, Variants } from "framer-motion";

interface StaggerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
  initialDelay?: number;
}

const containerVariants = (
  staggerDelay: number,
  initialDelay: number
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: initialDelay,
    },
  },
});

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Stagger({
  children,
  staggerDelay = 0.08,
  initialDelay = 0,
  ...props
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants(staggerDelay, initialDelay)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div variants={itemVariants} {...props}>
      {children}
    </motion.div>
  );
}
