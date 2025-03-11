import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiFile, FiX, FiLoader } from 'react-icons/fi';

export default function UploadForm({ onAnalysisComplete }) {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setUploadError('');
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
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        const newProgress = prevProgress + 10;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return newProgress;
      });
    }, 500);

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
      
      // Simulate analysis delay
      setTimeout(() => {
        setIsUploading(false);
        
        // Pass the analysis results to the parent component
        if (onAnalysisComplete) {
          onAnalysisComplete({
            cholesterol: { value: 185, unit: 'mg/dL', status: 'normal', reference: '< 200' },
            hdl: { value: 55, unit: 'mg/dL', status: 'normal', reference: '> 40' },
            ldl: { value: 110, unit: 'mg/dL', status: 'normal', reference: '< 130' },
            triglycerides: { value: 150, unit: 'mg/dL', status: 'borderline', reference: '< 150' },
            glucose: { value: 95, unit: 'mg/dL', status: 'normal', reference: '70-99' },
            // Add more mock results as needed
          });
        }
      }, 2000);
      
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError('Failed to upload file. Please try again.');
      clearInterval(progressInterval);
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadError('');
    setUploadProgress(0);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Upload your blood test results</label>
          <div
            {...getRootProps()}
            className={`dropzone ${
              isDragActive ? 'active' : ''
            } ${file ? 'bg-gray-50' : ''}`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiFile className="h-8 w-8 text-primary-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile();
                  }}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="text-center">
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  {isDragActive
                    ? 'Drop the file here...'
                    : 'Drag and drop your file here, or click to select a file'}
                </p>
                <p className="mt-1 text-xs text-gray-500">PDF, JPG, or PNG up to 10MB</p>
              </div>
            )}
          </div>
          {uploadError && (
            <p className="text-sm text-red-600">{uploadError}</p>
          )}
        </div>

        {file && uploadProgress > 0 && uploadProgress < 100 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary-600 h-2.5 rounded-full"
              style={{ width: `${uploadProgress}%` }}
            ></div>
            <p className="text-xs text-gray-500 mt-1">Uploading: {uploadProgress}%</p>
          </div>
        )}

        {file && uploadProgress === 100 && isUploading && (
          <div className="flex items-center justify-center space-x-2 text-primary-600">
            <FiLoader className="animate-spin h-5 w-5" />
            <span>Analyzing your results...</span>
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isUploading || !file}
            className={`btn btn-primary ${
              isUploading || !file ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isUploading ? 'Processing...' : 'Analyze Results'}
          </button>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            By uploading your file, you agree to our{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </form>
    </div>
  );
} 