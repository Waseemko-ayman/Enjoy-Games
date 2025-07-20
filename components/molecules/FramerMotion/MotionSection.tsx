'use client';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const MotionSection = ({
  children,
  index = 0,
  className = '',
}: {
  children: React.ReactNode;
  index?: number;
  className?: string;
}) => (
  <motion.div
    className={className}
    variants={fadeInUp}
    initial="hidden"
    animate="visible"
    custom={index}
  >
    {children}
  </motion.div>
);

export default MotionSection;
