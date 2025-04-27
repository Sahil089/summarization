import { motion } from "framer-motion";
import { useState } from "react";

const Generater = () => {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    setLoading(true);
    const payload={
        prompt:prompt
    }
    const response = await fetch(
      "http://localhost:5000/generate-image",{
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(payload)
    }
    );
    const blob = await response.blob();
    const imageurl = URL.createObjectURL(blob);
    setImage(imageurl);
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-purple-700 overflow-y-auto">
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
          onClick={generateImage}
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
        {image &&(
            
                <motion.div
                initial={{ opacity: 0, y: 80 }}
                animate={{ opacity: 1, y: 50 }}
                className="mt-4"
                >
                    <motion.img
                    src={image}
                    alt="Generated AI Image"
                    className="w-full rounded-lg shadow-2xl"
                    />


                    

                    
                </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Generater;
