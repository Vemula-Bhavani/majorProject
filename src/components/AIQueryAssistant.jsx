import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaTimes, FaPaperPlane } from "react-icons/fa";

export default function AIQueryAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const response = await fetch("http://localhost:8000/ai-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Unable to fetch response. Please try again.");
    }

    setLoading(false);
    setQuestion("");
  };

  return (
    <>
      {/* 🤖 FLOATING BUTTON */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white text-black p-4 rounded-full shadow-lg"
        >
          {isOpen ? <FaTimes size={18} /> : <FaRobot size={18} />}
        </button>
      </motion.div>

      {/* 💬 POPUP */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80 }}
            className="fixed bottom-24 right-6 w-96 bg-black/90 backdrop-blur-md text-white rounded-2xl shadow-2xl z-50 overflow-hidden border border-white/10"
          >
            {/* HEADER */}
            <div className="px-5 py-3 border-b border-white/10 font-semibold flex items-center gap-2">
              🤖 AI Flood Assistant
            </div>

            {/* CHAT AREA */}
            <div className="p-4 h-64 overflow-y-auto text-sm space-y-3">

              {/* USER QUESTION */}
              {question && (
                <div className="text-right">
                  <div className="inline-block bg-white text-black px-3 py-2 rounded-xl">
                    {question}
                  </div>
                </div>
              )}

              {/* AI RESPONSE */}
              {loading ? (
                <div className="text-gray-400 animate-pulse">
                  Thinking...
                </div>
              ) : answer ? (
                <div className="bg-white/10 px-3 py-2 rounded-xl">
                  {answer}
                </div>
              ) : (
                <p className="text-gray-400">
                  Ask about floods, rainfall, alerts...
                </p>
              )}
            </div>

            {/* INPUT AREA */}
            <div className="p-4 border-t border-white/10 flex items-center gap-3">
              <input
                type="text"
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 rounded-xl bg-white/10 text-white outline-none"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              />

              <button
                onClick={askAI}
                className="bg-white text-black p-3 rounded-xl hover:scale-105 transition"
              >
                <FaPaperPlane size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}