'use client';
import { fadeInUp } from '@/lib/context';
import { motion } from 'framer-motion';

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
