import { easeOut } from "framer-motion";

export const fadeUpAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
      ease: easeOut,
    },
  }),
};
