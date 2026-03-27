import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import Dashboard from "./components/dashboard";
import FloodMap from "./components/floodmap";
import PreviousStats from "./components/PreviousStats";
import Upload from "./components/Upload";
import Feedback from "./components/Feedback";
import Header from "./components/Header";



function App() {
  return (
    <Router>
      <Header />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/map" element={<FloodMap />} />
            <Route path="/stats" element={<PreviousStats />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
