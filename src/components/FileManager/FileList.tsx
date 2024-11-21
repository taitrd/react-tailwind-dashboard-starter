import React from 'react';
import { File as FileIcon, Folder, MoreVertical, Image, Upload, FolderPlus, Download, Grid2X2, List as ListIcon } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import FileListItem from './FileListItem';
import Toolbar from './Toolbar';
import UploadModal from './UploadModal';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'image';
  size?: string;
  modified: string;
  selected?: boolean;
}

const files: FileItem[] = [
  { id: '1', name: 'Documents', type: 'folder', modified: '2024-03-15' },
  { id: '2', name: 'Images', type: 'folder', modified: '2024-03-14' },
  { id: '3', name: 'report.pdf', type: 'file', size: '2.5 MB', modified: '2024-03-13' },
  { id: '4', name: 'banner.jpg', type: 'image', size: '1.8 MB', modified: '2024-03-12' },
];

const FileList = () => {
  const [items, setItems] = React.useState(files);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'list' | 'grid'>('list');

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'file',
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      modified: new Date().toISOString().split('T')[0],
    }));
    setItems(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        const newItems = [...items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);
        return newItems;
      });
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  };

  const handleDelete = () => {
    setItems(items.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const handleMove = () => {
    console.log('Moving items:', selectedItems);
  };

  const handleCopy = () => {
    console.log('Copying items:', selectedItems);
  };

  const ActionButton = ({ icon: Icon, label, onClick, primary = false }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        primary
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'border border-gray-300 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <Toolbar
        selectedCount={selectedItems.length}
        totalCount={items.length}
        onSelectAll={selectAll}
        onDelete={handleDelete}
        onMove={handleMove}
        onCopy={handleCopy}
      />

      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ActionButton
              icon={Upload}
              label="Upload Files"
              onClick={() => setIsUploadModalOpen(true)}
              primary
            />
            <ActionButton
              icon={FolderPlus}
              label="New Folder"
              onClick={() => console.log('New folder')}
            />
            <ActionButton
              icon={Download}
              label="Download"
              onClick={() => console.log('Download')}
            />
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <ListIcon className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <Grid2X2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4">
                <input
                  type="checkbox"
                  checked={selectedItems.length === items.length}
                  onChange={selectAll}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="text-left py-3 px-4">Name</th>
              <th className="text-left py-3 px-4">Size</th>
              <th className="text-left py-3 px-4">Modified</th>
              <th className="text-left py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={items}
                strategy={verticalListSortingStrategy}
              >
                {items.map((item) => (
                  <FileListItem
                    key={item.id}
                    item={item}
                    selected={selectedItems.includes(item.id)}
                    onSelect={() => toggleSelect(item.id)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </tbody>
        </table>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={onDrop}
      />
    </div>
  );
};

export default FileList;