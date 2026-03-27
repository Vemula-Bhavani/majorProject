import { motion } from "framer-motion";
import { FaCommentDots } from "react-icons/fa";

export default function Feedback() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      {/* 🔥 TITLE */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h2 className="text-4xl font-bold flex items-center gap-3">
          <FaCommentDots className="text-red-500" />
          Feedback
        </h2>

        <p className="text-gray-400 mt-2 text-lg">
          Share your thoughts to improve the flood monitoring system
        </p>
      </motion.div>

      {/* 💬 CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-2xl border border-white/10"
      >

        {/* TEXTAREA */}
        <div className="mb-6">
          <label className="text-gray-300 mb-2 block text-lg">
            Your Feedback
          </label>

          <textarea
            rows="5"
            placeholder="Share your feedback..."
            className="w-full p-4 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-red-500 resize-none"
          />
        </div>

        {/* 🚀 BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold shadow-lg"
        >
          Submit Feedback
        </motion.button>

      </motion.div>
    </div>
  );
}