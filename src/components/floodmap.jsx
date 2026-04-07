import { motion } from "framer-motion";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function FloodMap() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      {/* 🔥 TITLE */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-4xl font-bold">
          Flood Risk Map
        </h2>
        <p className="text-gray-400 mt-2 text-lg">
          Real-time visualization of flood-prone regions
        </p>
      </motion.div>

      {/* 🗺 MAP CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/10"
      >

        {/* 📊 LEGEND */}
        <div className="flex gap-4 mb-6 text-sm">

          <span className="flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-1 rounded-full">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            High Risk
          </span>

          <span className="flex items-center gap-2 bg-white/10 text-gray-300 px-3 py-1 rounded-full">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            Moderate
          </span>

          <span className="flex items-center gap-2 bg-white/10 text-gray-300 px-3 py-1 rounded-full">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            Low Risk
          </span>
        </div>

        {/* 🌍 MAP */}
        <div className="rounded-2xl overflow-hidden">
          <MapContainer
            center={[22.9734, 78.6569]}
            zoom={5}
            className="h-[500px]"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* 🔴 HIGH RISK */}
            <CircleMarker
              center={[8.5241, 76.9366]}
              radius={20}
              pathOptions={{ color: "#ef4444", fillOpacity: 0.7 }}
            >
              <Popup>🔴 Kerala - High Risk</Popup>
            </CircleMarker>

            {/* 🟡 MODERATE */}
            <CircleMarker
              center={[13.0827, 80.2707]}
              radius={20}
              pathOptions={{ color: "#facc15", fillOpacity: 0.7 }}
            >
              <Popup>🟡 Chennai - Moderate Risk</Popup>
            </CircleMarker>

            {/* 🔴 HIGH */}
            <CircleMarker
              center={[17.366, 78.4767]}
              radius={20}
              pathOptions={{ color: "#10712f", fillOpacity: 0.7 }}
            >
              <Popup>🟢 Hyderabad - Low Risk</Popup>
            </CircleMarker>
          </MapContainer>
        </div>

      </motion.div>
    </div>
  );
}