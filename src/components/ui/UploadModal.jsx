import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiFile, FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

const UploadModal = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(acceptedFiles => {
    const newFiles = acceptedFiles.map(file => Object.assign(file, {
      status: 'uploading',
      id: Math.random().toString(36).substring(2, 9)
    }));
    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload
    newFiles.forEach(file => {
      setTimeout(() => {
        setFiles(prev => prev.map(f => {
          if (f.id === file.id) {
            const isSuccess = Math.random() > 0.3; // 70% success rate
            return { ...f, status: isSuccess ? 'success' : 'error' };
          }
          return f;
        }));
      }, 1000 + Math.random() * 2000);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (!isOpen) return null;

  const getStatusIcon = (status) => {
    switch(status) {
      case 'uploading': return <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>;
      case 'success': return <FiCheckCircle className="text-green-500" />;
      case 'error': return <FiAlertCircle className="text-red-500" />;
      default: return null;
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-700">Upload Files</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
            <FiX className="text-slate-600" />
          </button>
        </div>
        <div className="p-6">
          <div {...getRootProps()} className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-slate-300 hover:border-blue-400'}`}>
            <input {...getInputProps()} />
            <FiUploadCloud className="mx-auto text-4xl text-slate-400 mb-2" />
            {isDragActive ?
              <p className="text-blue-500">Drop the files here ...</p> :
              <p className="text-slate-500">Drag & drop files here, or click to select</p>
            }
          </div>
          {files.length > 0 && (
            <div className="mt-6 space-y-3 max-h-60 overflow-y-auto pr-2">
              <h3 className="font-semibold text-slate-600">Uploaded Files</h3>
              {files.map(file => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <FiFile className="text-slate-500 mr-3" />
                    <span className="text-sm text-slate-700">{file.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs capitalize text-slate-500">{file.status}</span>
                    {getStatusIcon(file.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
