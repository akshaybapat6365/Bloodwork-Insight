# Dark Theme Implementation: Before and After Comparison

This document provides a comparison of the components before and after the dark theme implementation.

## Upload Page

### Before:
```jsx
<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-12">
    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
      Upload Your Blood Test Results
    </h1>
    <p className="mt-4 text-xl text-gray-500">
      Get AI-powered analysis and personalized insights in seconds
    </p>
  </div>
  
  <div className="bg-white shadow-md rounded-lg p-8">
    <UploadForm onAnalysisComplete={handleAnalysisComplete} />
  </div>
</div>
```

### After:
```jsx
<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
  <div className="text-center mb-12">
    <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
      Upload Your Blood Test Results
    </h1>
    <p className="mt-4 text-xl text-gray-400">
      Get AI-powered analysis and personalized insights in seconds
    </p>
  </div>

  {/* Tabs navigation */}
  <div className="mb-8 border-b border-gray-700">
    <nav className="-mb-px flex space-x-8">
      <button
        onClick={() => !analysisResults && setActiveTab('upload')}
        className={`${
          activeTab === 'upload'
            ? 'border-primary-500 text-primary-400'
            : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
        } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
          analysisResults ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={analysisResults}
      >
        <FiUpload className="inline-block mr-2" />
        Upload
      </button>
      
      {/* Additional tabs... */}
    </nav>
  </div>

  {/* Tab content */}
  <div className="animate-fadeIn">
    {activeTab === 'upload' && (
      <div className="card-dark p-8">
        <UploadForm onAnalysisComplete={handleAnalysisComplete} />
      </div>
    )}
    
    {/* Additional tab content... */}
  </div>
</div>
```

## Upload Form

### Before:
```jsx
<div
  {...getRootProps()}
  className={`dropzone ${isDragActive ? 'active' : ''} ${
    error ? 'border-red-300 bg-red-50' : ''
  }`}
>
  <input {...getInputProps()} />
  <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
  <p className="mt-2 text-sm text-gray-600">
    Drag & drop your file here, or click to select a file
  </p>
  <p className="mt-1 text-xs text-gray-500">
    Supported formats: PDF, JPG, PNG (Max 10MB)
  </p>
</div>
```

### After:
```jsx
<div
  {...getRootProps()}
  className={`dropzone ${isDragActive ? 'active' : ''} ${
    error ? 'border-red-500 bg-red-900/20' : ''
  }`}
>
  <input {...getInputProps()} />
  <FiUploadCloud className="mx-auto h-12 w-12 text-gray-400" />
  <p className="mt-2 text-sm text-gray-300">
    Drag & drop your file here, or click to select a file
  </p>
  <p className="mt-1 text-xs text-gray-500">
    Supported formats: PDF, JPG, PNG (Max 10MB)
  </p>
  {uploadStage === 'idle' && file && (
    <div className="mt-4 flex items-center justify-center text-sm text-gray-300">
      <FiFile className="mr-2" />
      {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
    </div>
  )}
</div>
```

## Results Dashboard

### Before:
```jsx
<div className="card p-6">
  <h2 className="text-xl font-bold text-gray-900 mb-4">Blood Test Results</h2>
  
  {!results || Object.keys(results).length === 0 ? (
    <p className="text-gray-600">No results to display. Please upload a blood test.</p>
  ) : (
    <div className="space-y-6">
      <div className="h-80">
        <Bar data={chartData} options={chartOptions} />
      </div>
      
      {/* Results content... */}
    </div>
  )}
</div>
```

### After:
```jsx
<div className="card-dark p-6">
  <div className="flex items-center justify-between mb-6">
    <h2 className="text-xl font-bold text-white flex items-center">
      <FiActivity className="mr-2 text-primary-400" />
      Blood Test Results
    </h2>
    
    <div className="flex space-x-2">
      <button
        onClick={() => setActiveTab('overview')}
        className={`px-3 py-1 text-sm rounded-md ${
          activeTab === 'overview'
            ? 'bg-primary-600/30 text-primary-400'
            : 'text-gray-400 hover:bg-gray-700'
        }`}
      >
        <FiList className="inline-block mr-1" />
        Overview
      </button>
      
      {/* Additional tabs... */}
    </div>
  </div>
  
  {!results || Object.keys(results).length === 0 ? (
    <div className="text-center py-12">
      <FiAlertCircle className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-gray-300">No results to display. Please upload a blood test.</p>
    </div>
  ) : (
    <div className="space-y-6 animate-fadeIn">
      {activeTab === 'overview' && (
        <>
          <div className="h-80">
            <Bar data={chartData} options={chartOptions} />
          </div>
          
          {/* Results content... */}
        </>
      )}
      
      {/* Additional tab content... */}
    </div>
  )}
</div>
```

## Chat Interface

### Before:
```jsx
<div className="bg-white rounded-lg shadow-md h-[500px] flex flex-col">
  <div className="p-4 border-b border-gray-200">
    <h3 className="text-lg font-medium text-gray-900">Ask About Your Results</h3>
    <p className="text-sm text-gray-500">
      Chat with our AI to get answers about your blood test results
    </p>
  </div>
  
  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {messages.map((message, index) => (
      <div
        key={index}
        className={`flex ${
          message.role === 'user' ? 'justify-end' : 'justify-start'
        }`}
      >
        <div
          className={`flex items-start space-x-2 max-w-[80%] ${
            message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
          }`}
        >
          <div
            className={`p-2 rounded-lg ${
              message.role === 'user'
                ? 'bg-primary-100 text-primary-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {/* Message content... */}
          </div>
        </div>
      </div>
    ))}
    
    {/* Loading indicator... */}
  </div>
  
  <div className="p-4 border-t border-gray-200">
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question about your results..."
        className="input flex-1"
        disabled={isLoading}
      />
      <button
        type="submit"
        className={`btn btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
      >
        <FiSend className="h-5 w-5" />
      </button>
    </form>
    <p className="text-xs text-gray-500 mt-2">
      Example questions: "What does my cholesterol mean?", "How can I improve my results?"
    </p>
  </div>
</div>
```

### After:
```jsx
<div className="bg-gray-900 rounded-lg border border-gray-700 h-[500px] flex flex-col">
  <div className="p-4 border-b border-gray-700 flex items-center">
    <FiCpu className="h-5 w-5 text-primary-400 mr-2" />
    <div>
      <h3 className="text-lg font-medium text-white">Ask About Your Results</h3>
      <p className="text-sm text-gray-400">
        Chat with our AI to get personalized insights
      </p>
    </div>
  </div>
  
  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800/30">
    {messages.map((message, index) => (
      <div
        key={index}
        className={`flex ${
          message.role === 'user' ? 'justify-end' : 'justify-start'
        }`}
      >
        <div
          className={`flex items-start space-x-2 max-w-[80%] ${
            message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
          }`}
        >
          <div
            className={`p-3 rounded-lg ${
              message.role === 'user'
                ? 'bg-primary-600/80 text-white'
                : 'bg-gray-700 text-gray-200'
            }`}
          >
            {/* Message content... */}
          </div>
        </div>
      </div>
    ))}
    
    {/* Loading indicator... */}
  </div>
  
  <div className="p-4 border-t border-gray-700 bg-gray-800/20">
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question about your results..."
        className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        disabled={isLoading}
      />
      <button
        type="submit"
        className={`btn btn-primary p-2 rounded-lg ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isLoading}
        aria-label="Send message"
      >
        <FiSend className="h-5 w-5" />
      </button>
    </form>
    <div className="flex items-center mt-3 text-xs text-gray-400">
      <FiInfo className="h-3 w-3 mr-1" />
      <p>
        Try asking: "What does my cholesterol mean?" or "How can I improve my results?"
      </p>
    </div>
  </div>
</div>
```

## Key Differences

### Color Changes
- **Backgrounds**: Changed from white (`bg-white`) to dark grays (`bg-gray-900`, `bg-gray-800`)
- **Text**: Changed from dark grays (`text-gray-900`) to white and light grays (`text-white`, `text-gray-300`, `text-gray-400`)
- **Borders**: Changed from light grays (`border-gray-200`) to dark grays (`border-gray-700`)
- **Accents**: Maintained primary colors but adjusted opacity and contrast for better visibility

### Structural Improvements
- Added tab navigation for better organization of content
- Enhanced visual hierarchy with icons
- Improved loading and error states
- Added more comprehensive status indicators

### User Experience Enhancements
- Better contrast for readability
- More intuitive navigation
- Clearer status indicators
- More consistent styling across components

## Accessibility Improvements
- Better contrast ratios for text readability
- Added `aria-label` attributes for screen readers
- Ensured focus states are visible
- Used icons alongside text for better comprehension 