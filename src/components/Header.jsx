import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative bg-black/90 backdrop-blur-md text-white px-8 py-6 shadow-lg text-center"
    >
      {/* TITLE */}
      <h1 className="text-3xl font-bold tracking-wide">
        🌊 Flood Info Portal
      </h1>

      {/* SUBTITLE */}
      <p className="text-gray-400 text-sm mt-2">
        AI-Driven Flood Risk Monitoring & Smart Alert System
      </p>

      {/* SUBTLE GLOW LINE */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10"></div>
    </motion.div>
  );
}