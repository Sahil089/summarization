import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/legacy/build/pdf.worker.min.js?url";

function FileUploader({onprocessedText,setisLoading}) {
  const [selectFile, setselectFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [error, seterror] = useState("");
  const [userInput, setuserInput] = useState("");

console.log(userInput);

  useEffect(() => {
    GlobalWorkerOptions.workerSrc = pdfWorker;
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setselectFile(file);
      setFileName(file.name);
      seterror("");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true)
    if (!selectFile) {
      seterror("Please select a file first");
    }
    let text = "";
    const fileType = selectFile.type;
    if (fileType === "application/pdf") {
      text = await extractTextFromPDF(selectFile);
    } else if (
      fileType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      text = await extratTextfromDoc(selectFile);
    } else {
      throw new Error("Unsupported File Type ,Please Upload PDF or Doc");
    }
    setExtractedText(text);
    const result = await summarization(text);
    onprocessedText(result);
    setisLoading(false);
  };

  const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    let textContent = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      textContent += strings.join(" ") + " ";
    }

    return textContent;
  };

  const extratTextfromDoc = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  };

  const summarization = async (text) => {
    const API_URL =
      "https://router.huggingface.co/hf-inference/models/meta-llama/Llama-4-Scout-17B-16E-Instruct";
    const API_KEY = "api key";
    const prompt = ` You have give a Text of Document Document Text:${text.substring(0, 1000)} ${userInput} Format the output in markdown format `;

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 500,
          min_length: 100,
          do_sample: false,
        },
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to get summary from AI ");
    }
    const result = await response.json();
    return result[0]?.summary_text || "Unable to generate Summary";
  };
  return (
    <div>
      <div className="max-w-md mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-2 border-dashed border-purple-400 rounded-lg p-8 text-center  ">
            <input
              onChange={handleFileChange}
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.docx,.doc"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <div className="text-purple-700 text-3xl">
                <FaUpload />
              </div>
              <span>
                {fileName ? fileName : "Click to upload PDF or Word Document"}
              </span>
              <p>Supported PDF and DOCX formats</p>
            </label>
          </div>
          {error && (
            <div className="text-center text-red-600 text-sm">{error}</div>
          )}
          <div className="border-2 rounded-md py-2 px-1 border-purple-400 ">
          <input value={userInput} onChange={(e)=>{setuserInput(e.target.value)}}  type="text" placeholder="Enter Your Prompt . . ."/>
          </div>
          
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-5 rounded-md  cursor-pointer"
          >
            {" "}
            Process Document
          </button>
        </form>
      </div>
    </div>
  );
}

export default FileUploader;
