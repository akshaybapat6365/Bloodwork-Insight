import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiFile, FiX, FiLoader, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function UploadForm({ onAnalysisComplete }) {
  const [file, setFile] = useState(null);
  // isUploading is effectively replaced by uploadStage !== 'idle' && uploadStage !== 'complete' && uploadStage !== 'error'
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  // New stages: idle, selected, uploading_file, extracting_text, analyzing_data, complete, error
  const [uploadStage, setUploadStage] = useState('idle');

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setUploadError('');
      setUploadProgress(0);
      setUploadStage('selected'); // File is selected, ready for upload
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxFiles: 1,
    maxSize: 10485760, // 10MB
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setUploadError('Please select a file to upload');
      setUploadStage('error');
      return;
    }

    setUploadError('');
    setUploadProgress(0);
    setUploadStage('uploading_file');

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Step 1: Upload file and extract text
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        }
      });
      
      // Simulate progress for extraction if direct progress isn't available
      // For fetch, direct upload progress isn't standard, so we'll just set to 100 after upload call
      setUploadProgress(100); // Mark upload part as complete

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({ error: 'File upload failed with status: ' + uploadResponse.status }));
        throw new Error(errorData.error || 'File upload failed');
      }

      const uploadResult = await uploadResponse.json();

      if (!uploadResult.extractedText) {
        setUploadError(uploadResult.error || 'Text extraction failed. The file might be corrupted or an unsupported type.');
        setUploadStage('error');
        return;
      }
      
      setUploadStage('analyzing_data'); // Text extracted, now analyzing with AI
      // Reset progress for the next stage if desired, or keep it at 100 to show previous step completion
      // For simplicity, we'll leave progress at 100 and rely on stage text

      // Step 2: Send extracted text for AI analysis
      const analysisResponse = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          extractedText: uploadResult.extractedText,
          filename: uploadResult.filename, // Pass filename for context
        }),
      });

      if (!analysisResponse.ok) {
        const errorData = await analysisResponse.json().catch(() => ({ error: 'AI analysis failed with status: ' + analysisResponse.status }));
        throw new Error(errorData.error || 'AI analysis failed');
      }

      const analysisResult = await analysisResponse.json();
      
      setUploadStage('complete');
      if (onAnalysisComplete) {
        onAnalysisComplete(analysisResult);
      }

    } catch (error) {
      console.error('Processing error:', error);
      setUploadError(error.message || 'An unexpected error occurred. Please try again.');
      setUploadStage('error');
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadError('');
    setUploadProgress(0);
    setUploadStage('idle');
  };

  const getStageText = () => {
    switch (uploadStage) {
      case 'selected':
        return 'File selected. Ready to analyze.';
      case 'uploading_file':
        return 'Uploading your file...';
      case 'extracting_text': // This stage might be very quick, covered by uploading_file or analyzing_data
        return 'Extracting text from file...';
      case 'analyzing_data':
        return 'AI is analyzing your bloodwork...';
      case 'complete':
        return 'Analysis complete!';
      case 'error':
        return uploadError || 'An error occurred.'; // Display specific error
      default:
        return 'Select a file to begin.';
    }
  };
  
  const isProcessing = uploadStage === 'uploading_file' || uploadStage === 'extracting_text' || uploadStage === 'analyzing_data';

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Upload your blood test results</label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 transition duration-150 ease-in-out ${
              isDragActive ? 'border-primary-500 bg-gray-800/50' : 'border-gray-600 hover:border-primary-400'
            } ${file ? 'bg-gray-800/30' : ''} ${isProcessing ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <input {...getInputProps()} disabled={isProcessing} />
            {file ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiFile className="h-8 w-8 text-primary-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-200">{file.name}</p>
                    <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                {!isProcessing && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering dropzone
                      removeFile();
                    }}
                    className="text-gray-400 hover:text-gray-200"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-300">
                  {isDragActive
                    ? 'Drop the file here...'
                    : 'Drag and drop your file here, or click to select a file'}
                </p>
                <p className="mt-1 text-xs text-gray-400">PDF, JPG, or PNG up to 10MB</p>
              </div>
            )}
          </div>
          {uploadError && uploadStage === 'error' && (
            <div className="flex items-center text-sm text-red-400 mt-2">
              <FiAlertCircle className="mr-1 h-4 w-4" />
              {uploadError}
            </div>
          )}
        </div>

        {/* Upload Progress Indicator */}
        {(isProcessing || uploadStage === 'complete' || uploadStage === 'error') && uploadStage !== 'idle' && uploadStage !== 'selected' && (
          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center text-sm text-gray-300">
              <span>{getStageText()}</span>
              {(uploadStage === 'uploading_file' || uploadStage === 'extracting_text') && <span>{uploadProgress}%</span>}
              {uploadStage === 'complete' && <FiCheckCircle className="text-green-500 h-5 w-5" />}
              {uploadStage === 'error' && <FiAlertCircle className="text-red-500 h-5 w-5" />}
            </div>
            {(uploadStage === 'uploading_file' || uploadStage === 'extracting_text') && (
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full ${
                    uploadStage === 'error' ? 'bg-red-500' : uploadStage === 'complete' ? 'bg-green-500' : 'bg-primary-500'
                  }`}
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            )}
            {uploadStage === 'analyzing_data' && (
              <div className="flex items-center justify-center space-x-2 text-primary-400 mt-4">
                <FiLoader className="animate-spin h-5 w-5" />
                <span>Advanced AI analysis in progress... This may take a moment.</span>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isProcessing || !file || uploadStage === 'complete'}
            className={`btn btn-primary py-3 px-8 ${
              (isProcessing || !file || uploadStage === 'complete') ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isProcessing ? 'Processing...' : (uploadStage === 'complete' ? 'Analysis Done' : 'Analyze Results')}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-400">
            Your data is secure and never stored. See our {' '}
            <a href="#" className="text-primary-400 hover:text-primary-300">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
} 