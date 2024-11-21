import React from 'react';
import FileList from '../components/FileManager/FileList';

const FileManager = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">File Manager</h1>
          <p className="text-gray-600 mt-1">Upload and manage your files</p>
        </div>
      </div>
      <FileList />
    </div>
  );
};

export default FileManager;