import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  FaHome,
  FaChartBar,
  FaUpload,
  FaCommentDots,
  FaMapMarkedAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const navItem = (to, icon, label) => {
    const active = location.pathname === to;

    return (
      <Link
        to={to}
        className={`relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
        ${
          active
            ? "bg-white text-black font-semibold"
            : "text-gray-300 hover:bg-white/10"
        }`}
      >
        {/* Active Indicator */}
        {active && (
          <span className="absolute left-0 top-0 h-full w-1 bg-white rounded-r-lg"></span>
        )}

        {/* Icon */}
        <span className="text-xl group-hover:scale-110 transition">
          {icon}
        </span>

        {/* Label */}
        {open && <span className="text-md">{label}</span>}
      </Link>
    );
  };

  return (
    <motion.div
      animate={{ width: open ? 250 : 80 }}
      className="min-h-screen bg-black text-white p-4 flex flex-col justify-between shadow-xl"
    >
      {/* TOP */}
      <div>
        {/* Toggle Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setOpen(!open)}
            className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition"
          >
            {open ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        {/* Title */}
        {open && (
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold mb-8 text-white"
          >
            🌊 Flood Panel
          </motion.h2>
        )}

        {/* NAV */}
        <nav className="flex flex-col gap-3">
          {navItem("/", <FaHome />, "Dashboard")}
          {navItem("/stats", <FaChartBar />, "Statistics")}
          {navItem("/upload", <FaUpload />, "Upload")}
          {navItem("/feedback", <FaCommentDots />, "Feedback")}
          {navItem("/map", <FaMapMarkedAlt />, "Map")}
        </nav>
      </div>

      {/* BOTTOM */}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-400 mt-6"
        >
          ⚡ Smart Flood Monitoring
        </motion.div>
      )}
    </motion.div>
  );
}