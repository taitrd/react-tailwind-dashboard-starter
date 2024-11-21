import React from 'react';
import PageList from '../components/PageList';
import Editor from '../components/Editor';

const Pages = () => {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pages</h1>
          <p className="text-gray-600 mt-1">Manage your website content</p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Create New Page
        </button>
      </div>

      {isEditing ? <Editor /> : <PageList />}
    </div>
  );
};

export default Pages;