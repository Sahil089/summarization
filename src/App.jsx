
import './App.css'
import FileOutput from './component/FileOutput'
import FileUploader from './component/FileUploader'

function App() {
  

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
    <FileUploader/>
  </div>
  <div>
    <FileOutput/>
  </div>
</div>
  )
}

export default App
