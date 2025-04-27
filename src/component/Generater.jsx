import { motion } from "framer-motion";
import { useState } from "react";

const Generater = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);


const generateImage =async ()=>{
    
}

  return (
    <section className="h-screen bg-gradient-to-br from-purple-900 via-black to-purple-700">
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 50 }}
        className="max-w-2xl mx-auto p-6 bg-gradient-to-b from-white/20 to-purple-/10 backdrop-blur-md rounded-md shadow-2xl "
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-3xl font-semibold mb-6 text-white text-center"
        >
          AI Image Generater
        </motion.h2>
        <div>
          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="text"
            value={prompt}
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            placeholder="Type Here To Generate Alike Image..."
            className="w-full p-4 border border-purple-200 rounded-lg bg-white/10 text-white placeholder-purple-300 backdrop-blur-lg focus:outline-none
            focus:border-purple-500 transition-all
"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 1.08 }}
          className="w-full bg-gradient-to-r border from-purple-600 to placeholder-purple-800 text-white rounded-md py-2 font-semibold mt-4"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mr-2"
              />
              Generating...
            </div>
          ) : (
            "Generate Image"
          )}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Generater;
