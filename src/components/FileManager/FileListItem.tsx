import React from 'react';
import { File as FileIcon, Folder, Image, MoreVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface FileItemProps {
  item: {
    id: string;
    name: string;
    type: 'file' | 'folder' | 'image';
    size?: string;
    modified: string;
  };
  selected: boolean;
  onSelect: () => void;
}

const FileListItem = ({ item, selected, onSelect }: FileItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getIcon = () => {
    switch (item.type) {
      case 'folder':
        return <Folder className="w-5 h-5 text-yellow-500" />;
      case 'image':
        return <Image className="w-5 h-5 text-purple-500" />;
      default:
        return <FileIcon className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`border-b border-gray-100 hover:bg-gray-50 ${
        selected ? 'bg-blue-50' : ''
      }`}
    >
      <td className="py-3 px-4">
        <input
          type="checkbox"
          checked={selected}
          onChange={onSelect}
          className="rounded border-gray-300"
        />
      </td>
      <td className="py-3 px-4">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <span>{item.name}</span>
        </div>
      </td>
      <td className="py-3 px-4 text-gray-600">{item.size || '--'}</td>
      <td className="py-3 px-4 text-gray-600">{item.modified}</td>
      <td className="py-3 px-4">
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <MoreVertical className="w-5 h-5 text-gray-500" />
        </button>
      </td>
    </tr>
  );
};

export default FileListItem;