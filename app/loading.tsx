"use client";
import { motion } from "framer-motion";
import { StickyNoteIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "var(--background)" }}>
      <motion.div
        animate={{ rotate: [0, -12, 12, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="mb-6"
      >
        <StickyNoteIcon className="w-14 h-14 text-teal-500" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="text-sm font-medium text-aurora"
      >
        Loading NextBoard_Sticky…
      </motion.p>
    </div>
  );
}
