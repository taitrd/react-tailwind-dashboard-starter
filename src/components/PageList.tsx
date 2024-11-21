import React from 'react';
import { File, MoreVertical } from 'lucide-react';

const pages = [
  { id: 1, title: 'Home Page', lastModified: '2024-03-15', status: 'Published' },
  { id: 2, title: 'About Us', lastModified: '2024-03-14', status: 'Draft' },
  { id: 3, title: 'Services', lastModified: '2024-03-13', status: 'Published' },
  { id: 4, title: 'Contact', lastModified: '2024-03-12', status: 'Review' },
];

const PageList = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Recent Pages</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          New Page
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4">Title</th>
              <th className="text-left py-3 px-4">Last Modified</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <File className="w-5 h-5 text-gray-400" />
                    <span>{page.title}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-600">{page.lastModified}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    page.status === 'Published' ? 'bg-green-100 text-green-800' :
                    page.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {page.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="w-5 h-5 text-gray-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PageList;