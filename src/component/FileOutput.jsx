function FileOutput({ processedText, isLoading }) {
  if (isLoading) {
    return(
    <div className="text-center flex justify-center text-slate-400 h-20 w-40 bg-purple-200">
      Processing your Document....
    </div>);
  }
  if (!processedText) {
    return null;
  }
  return (
    <div>
      <div className="text-center bg-purple-200 p-7 border rounded-md text-slate-900">
        {processedText}
      </div>
      <div>
        <button
          onClick={() => {
            navigator.clipboard.writeText(processedText);
          }}
        >
          {" "}
          Copy summary
        </button>
      </div>
    </div>
  );
}

export default FileOutput;
