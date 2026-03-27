import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Reports from "./reports";
import AIQueryAssistant from "./AIQueryAssistant";
import {
  WiDaySunny,
  WiRain,
  WiCloudy,
  WiStrongWind,
  WiHumidity,
} from "react-icons/wi";
import { FaSearch, FaEye, FaTachometerAlt } from "react-icons/fa";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [time, setTime] = useState(new Date()); // ✅ ADDED

  // 📍 Get location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      fetchData(pos.coords.latitude, pos.coords.longitude);
    });
  }, []);

  // ⏰ Live Time (NEW)
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async (lat, lon, city = "") => {
    const url = city
      ? `http://localhost:8000/dashboard-data?city=${city}`
      : `http://localhost:8000/dashboard-data?lat=${lat}&lon=${lon}`;

    const res = await fetch(url);
    const result = await res.json();
    setData(result);
  };

  if (!data) return <div className="text-white p-10">Loading...</div>;

  // 🌤 Dynamic Icon
  const getIcon = () => {
    const desc = data.description.toLowerCase();
    if (desc.includes("rain"))
      return <WiRain className="text-7xl text-blue-400 animate-bounce" />;
    if (desc.includes("cloud"))
      return <WiCloudy className="text-7xl text-gray-300 animate-pulse" />;
    return <WiDaySunny className="text-7xl text-yellow-400 animate-spin-slow" />;
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">

      {/* 🔍 SEARCH */}
      <div className="flex justify-center mb-10">
        <div className="flex bg-white/10 backdrop-blur-md rounded-full overflow-hidden w-[500px] shadow-xl">
          <input
            className="flex-1 px-6 py-3 bg-transparent outline-none text-white"
            placeholder="Search city..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => fetchData(null, null, search)}
            className="px-6 bg-orange-500 hover:bg-orange-600"
          >
            <FaSearch />
          </button>
        </div>
      </div>

      {/* 🌤 TOP SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

        {/* LEFT MAIN WEATHER */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/10 backdrop-blur-md p-6 rounded-2xl col-span-1 shadow-xl"
        >
          <h2 className="text-3xl font-bold">{data.location}</h2>

          <div className="flex items-center gap-4 mt-4">
            {getIcon()}

            <div>
              <h3 className="text-4xl">{data.temperature}°C</h3>

              <p className="capitalize text-gray-300">
                {data.description}
              </p>

              {/* ✅ DATE */}
              <p className="text-gray-400 mt-2">
                📅 {time.toLocaleDateString()}
              </p>

              {/* ✅ TIME */}
              <p className="text-gray-400">
                ⏰ {time.toLocaleTimeString()}
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT METRICS */}
        <div className="grid grid-cols-2 gap-6 col-span-2">
          <MetricCard icon={<FaTachometerAlt />} title="Pressure" value={data.pressure + " hPa"} />
          <MetricCard icon={<WiHumidity />} title="Humidity" value={data.humidity + "%"} />
          <MetricCard icon={<WiStrongWind />} title="Wind" value={data.wind + " m/s"} />
          <MetricCard icon={<FaEye />} title="Visibility" value={data.visibility + " km"} />
        </div>
      </div>

      {/* 📆 FORECAST SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">

        {/* 5 DAYS */}
        <motion.div className="bg-white/10 p-6 rounded-2xl">
          <h3 className="text-xl mb-4">Coming 5 Days</h3>
          {data.daily.map((d, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="flex justify-between py-2 border-b border-white/10"
            >
              <span>{d.date}</span>
              <span>{d.temp}°C</span>
            </motion.div>
          ))}
        </motion.div>

        {/* TODAY HOURLY */}
        <motion.div className="bg-white/10 p-6 rounded-2xl">
          <h3 className="text-xl mb-4">Today</h3>
          <div className="flex gap-4 overflow-x-auto">
            {data.hourly.map((h, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="bg-white/10 p-4 rounded-xl min-w-[110px] text-center"
              >
                <p>{h.time}</p>
                <WiCloudy className="text-4xl mx-auto my-2 animate-pulse" />
                <p>{h.temp}°C</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 🌊 FLOOD METRICS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <MetricCard icon={<WiRain />} title="Rainfall" value={data.rainfall} />
        <MetricCard icon={<WiDaySunny />} title="Risk" value={data.aiRiskScore} />
        <MetricCard icon={<WiCloudy />} title="Alerts" value={data.alerts} />
        <MetricCard icon={<WiStrongWind />} title="Regions" value={data.affectedRegions} />
      </div>

      {/* 🖼 IMAGES */}
      <div className="bg-white/10 p-6 rounded-2xl mb-10">
        <h3 className="text-xl mb-4">Recent Flood Images</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.images.map((img, i) => (
            <motion.img
              key={i}
              whileHover={{ scale: 1.05 }}
              src={img.src}
              className="rounded-xl h-40 object-cover"
            />
          ))}
        </div>
      </div>

      {/* 📰 REPORTS */}
      <div className="bg-white/10 p-6 rounded-2xl mb-8">
        <Reports reports={data.reports} />
      </div>

      <AIQueryAssistant />
    </div>
  );
}

// 🔥 BIG ANIMATED CARD
function MetricCard({ icon, title, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.07 }}
      className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-center shadow-lg"
    >
      <div className="text-5xl text-orange-400 mb-3 animate-pulse">
        {icon}
      </div>
      <p className="text-gray-400">{title}</p>
      <h3 className="text-xl">{value}</h3>
    </motion.div>
  );
}