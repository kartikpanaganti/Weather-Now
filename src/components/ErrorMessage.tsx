import React from "react";
import { motion } from "framer-motion";

export default function ErrorMessage({ message }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-4 text-red-200 font-medium"
    >
      {message}
    </motion.p>
  );
}
