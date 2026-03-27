import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function Upload() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      {/* 🔥 TITLE */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h2 className="text-4xl font-bold">
          Upload Flood Information
        </h2>
        <p className="text-gray-400 mt-2 text-lg">
          Report real-time flood situations
        </p>
      </motion.div>

      {/* 📦 CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl max-w-2xl border border-white/10"
      >

        {/* 📍 LOCATION */}
        <div className="mb-6">
          <label className="flex items-center gap-2 mb-2 text-gray-300">
            <FaMapMarkerAlt className="text-red-500" />
            Location
          </label>

          <input
            type="text"
            placeholder="Enter flood location"
            className="w-full p-3 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* 📝 DESCRIPTION */}
        <div className="mb-6">
          <label className="text-gray-300 mb-2 block">
            Flood Description
          </label>

          <textarea
            rows="4"
            placeholder="Describe the flood situation..."
            className="w-full p-3 rounded-xl bg-white/10 text-white outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* 📂 UPLOAD BOX */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="mb-6 border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer hover:bg-white/5 transition"
        >
          <FaCloudUploadAlt className="text-5xl text-red-500 mx-auto mb-3 animate-bounce" />

          <p className="text-gray-400">
            Drag & Drop or Click to Upload Image
          </p>

          <input type="file" className="hidden" />
        </motion.div>

        {/* 🚀 BUTTON */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold shadow-lg"
        >
          Submit Report
        </motion.button>

      </motion.div>
    </div>
  );
}