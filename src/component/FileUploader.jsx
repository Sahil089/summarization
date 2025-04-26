import { useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import * as pdfjsLib from 'pdfjs-dist';
import mammoth from 'mammoth';
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist/legacy/build/pdf';
import pdfWorker from 'pdfjs-dist/legacy/build/pdf.worker.min.js?url';


function FileUploader() {
  const [selectFile, setselectFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [error, seterror] = useState("");


  useEffect(() => {
    GlobalWorkerOptions.workerSrc = pdfWorker;
  }, []);
  

const handleFileChange =(e)=>{
    const file =e.target.files[0];
    if(file){
        setselectFile(file);
        setFileName(file.name);
        seterror('');
    }
    
}
const handleSubmit = async(e)=>{
e.preventDefault();
if(!selectFile){
    seterror('Please select a file first')
}
let text=''
const fileType= selectFile.type;
if (fileType === 'application/pdf'){
    text= await extractTextFromPDF(selectFile);
}else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"){
    text= await extratTextfromDoc(selectFile);
}else{
    throw new Error("Unsupported File Type ,Please Upload PDF or Doc")
}
setExtractedText(text);
console.log(extractedText);

}

const extractTextFromPDF = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await getDocument({ data: arrayBuffer }).promise;
    let textContent = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map((item) => item.str);
      textContent += strings.join(' ') + ' ';
    }
  
    return textContent;
  };
  
const extratTextfromDoc =async (file)=>{
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({arrayBuffer});
    return result.value 
}


const summarization =()=>{

    
}
  return (
    <div>
      <div className="max-w-md mx-auto p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="border-2 border-dashed border-purple-400 rounded-lg p-8 text-center  ">
            <input onChange={handleFileChange} type="file" id="file-upload" className="hidden" accept=".pdf,.docx,.doc" />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center">
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
            <div className="text-center text-red-600 text-sm">
                {error}
            </div>
          )
          }
          <button  type="submit" className="w-full bg-purple-500 text-white py-2 px-5 rounded-md  cursor-pointer"> Process Document</button>
        </form>
      </div>
    </div>
  );
}

export default FileUploader;
