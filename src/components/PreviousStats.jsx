import { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PreviousStats() {
  const stats = [
    {
      state: "Maharashtra",
      year: "2021",
      severity: 90,
      description: "High flood impact across multiple districts.",
    },
    {
      state: "Kerala",
      year: "2018",
      severity: 100,
      description: "Severe floods causing major displacement.",
    },
    {
      state: "Assam",
      year: "Annual",
      severity: 80,
      description: "Recurring flood-prone regions every monsoon.",
    },
    {
      state: "Bihar",
      year: "Multiple Years",
      severity: 75,
      description: "River overflow zones affecting rural areas.",
    },
  ];

  const [filter, setFilter] = useState("");

  const filteredStats = stats.filter((item) =>
    item.state.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      {/* 🔥 TITLE */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-4xl font-bold">
          Previous Flood Statistics
        </h2>
        <p className="text-gray-400 mt-2 text-lg">
          Analyze historical flood severity across India
        </p>
      </motion.div>

      {/* 🔍 FILTER */}
      <div className="mb-10">
        <input
          type="text"
          placeholder="Search state..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-3 rounded-xl bg-white/10 text-white w-64 outline-none"
        />
      </div>

      {/* 📊 CHART */}
      <div className="bg-white/10 p-6 rounded-2xl mb-10">
        <h3 className="text-xl mb-4">Flood Severity Chart</h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredStats}>
            <XAxis dataKey="state" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="severity" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 📋 CARDS */}
      <div className="grid md:grid-cols-2 gap-6">

        {filteredStats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/10 p-6 rounded-2xl border border-white/10"
          >
            <div className="flex justify-between mb-4">

              <div className="flex items-center gap-3">
                <div className="bg-red-500/20 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-red-500" />
                </div>
                <h3 className="text-2xl">{item.state}</h3>
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <FaCalendarAlt className="text-red-400" />
                {item.year}
              </div>
            </div>

            <p className="text-gray-400">{item.description}</p>

            {/* Severity Bar */}
            <div className="mt-4">
              <div className="h-2 bg-white/10 rounded-full">
                <div
                  className="h-2 bg-red-500 rounded-full"
                  style={{ width: `${item.severity}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1 text-gray-400">
                Severity: {item.severity}%
              </p>
            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
}