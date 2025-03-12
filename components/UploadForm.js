import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiFile, FiX, FiLoader, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

export default function UploadForm({ onAnalysisComplete }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStage, setUploadStage] = useState('idle'); // idle, uploading, analyzing, complete, error

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setUploadError('');
      setUploadStage('idle');
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

    setIsUploading(true);
    setUploadProgress(0);
    setUploadStage('uploading');
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 5;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 300);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('file', file);

      // In a real app, you would send this to your API
      // const response = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData,
      // });
      
      // if (!response.ok) {
      //   throw new Error('Upload failed');
      // }
      
      // const data = await response.json();
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate successful response
      const mockData = {
        success: true,
        fileId: 'mock-file-id-123',
        message: 'File uploaded successfully',
      };

      // Clear the progress interval
      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadStage('analyzing');
      
      // Simulate analysis delay
      setTimeout(() => {
        setIsUploading(false);
        setUploadStage('complete');
        
        // Pass the analysis results to the parent component
        if (onAnalysisComplete) {
          onAnalysisComplete({
            cholesterol: { value: 185, unit: 'mg/dL', status: 'normal', reference: '< 200' },
            hdl: { value: 55, unit: 'mg/dL', status: 'normal', reference: '> 40' },
            ldl: { value: 110, unit: 'mg/dL', status: 'normal', reference: '< 130' },
            triglycerides: { value: 150, unit: 'mg/dL', status: 'borderline', reference: '< 150' },
            glucose: { value: 95, unit: 'mg/dL', status: 'normal', reference: '70-99' },
            hemoglobin: { value: 14.2, unit: 'g/dL', status: 'normal', reference: '13.5-17.5' },
            whiteCellCount: { value: 7500, unit: '/µL', status: 'normal', reference: '4500-11000' },
            redCellCount: { value: 5.2, unit: 'million/µL', status: 'normal', reference: '4.5-5.9' },
            platelets: { value: 250000, unit: '/µL', status: 'normal', reference: '150000-450000' },
            creatinine: { value: 0.9, unit: 'mg/dL', status: 'normal', reference: '0.7-1.3' },
            // Add more mock results as needed
          });
        }
      }, 2000);
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Failed to upload file. Please try again.');
      clearInterval(progressInterval);
      setIsUploading(false);
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
      case 'uploading':
        return 'Uploading your file...';
      case 'analyzing':
        return 'Analyzing your bloodwork...';
      case 'complete':
        return 'Analysis complete!';
      case 'error':
        return 'Upload failed';
      default:
        return '';
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Upload your blood test results</label>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 transition duration-150 ease-in-out ${
              isDragActive ? 'border-primary-500 bg-gray-800/50' : 'border-gray-600 hover:border-primary-400'
            } ${file ? 'bg-gray-800/30' : ''}`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiFile className="h-8 w-8 text-primary-400" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-200">{file.name}</p>
                    <p className="text-sm text-gray-400">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <FiX className="h-5 w-5" />
                </button>
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
          {uploadError && (
            <div className="flex items-center text-sm text-red-400 mt-2">
              <FiAlertCircle className="mr-1 h-4 w-4" />
              {uploadError}
            </div>
          )}
        </div>

        {/* Upload Progress Indicator */}
        {isUploading && (
          <div className="mt-6 space-y-3">
            <div className="flex justify-between items-center text-sm text-gray-300">
              <span>{getStageText()}</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full ${
                  uploadStage === 'error' ? 'bg-red-500' : uploadStage === 'complete' ? 'bg-green-500' : 'bg-primary-500'
                }`}
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            {uploadStage === 'analyzing' && (
              <div className="flex items-center justify-center space-x-2 text-primary-400 mt-4">
                <FiLoader className="animate-spin h-5 w-5" />
                <span>Advanced AI analysis in progress...</span>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isUploading || !file}
            className={`btn btn-primary py-3 px-8 ${
              isUploading || !file ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isUploading ? 'Processing...' : 'Analyze Results'}
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