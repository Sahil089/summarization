
import { useState } from 'react'
import './App.css'
import FileOutput from './component/FileOutput'
import FileUploader from './component/FileUploader'

function App() {
  const [processedText,setProcessText]=useState('')
  const [isLoading,setIsLoading] = useState(false);

  return (
<div>
  <div className='text-center font-semibold  mt-4 text-5xl space-y-3'>
  <div>
    Document Summarizer
  </div>
  <div className='text-lg font-light'>
    Upload your PDF or Word document to get an AI-powered summary
  </div>
  </div>

  <div>
    <FileUploader setisLoading ={setIsLoading} onprocessedText={setProcessText}/>
  </div>
  <div>
    <FileOutput isLoading={isLoading} processedText={processedText}/>
  </div>
</div>
  )
}

export default App
