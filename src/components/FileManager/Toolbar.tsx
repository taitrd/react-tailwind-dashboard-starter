import React from 'react';
import { Trash2, FolderInput, Copy, CheckSquare, Square, MoreVertical } from 'lucide-react';

interface ToolbarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onDelete: () => void;
  onMove: () => void;
  onCopy: () => void;
}

const Toolbar = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onDelete,
  onMove,
  onCopy,
}: ToolbarProps) => {
  const isAllSelected = selectedCount === totalCount && totalCount > 0;
  const isPartiallySelected = selectedCount > 0 && selectedCount < totalCount;

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <button
          onClick={onSelectAll}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title={isAllSelected ? "Deselect all" : "Select all"}
        >
          {isAllSelected ? (
            <CheckSquare className="w-5 h-5 text-blue-600" />
          ) : isPartiallySelected ? (
            <CheckSquare className="w-5 h-5 text-gray-400" />
          ) : (
            <Square className="w-5 h-5 text-gray-400" />
          )}
        </button>
        
        {selectedCount > 0 && (
          <span className="text-sm text-gray-600">
            {selectedCount} selected
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {selectedCount > 0 && (
          <>
            <button
              onClick={onDelete}
              className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors"
              title="Delete selected"
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button
              onClick={onMove}
              className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
              title="Move selected"
            >
              <FolderInput className="w-5 h-5" />
            </button>
            <button
              onClick={onCopy}
              className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
              title="Copy selected"
            >
              <Copy className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-gray-200 mx-2" />
          </>
        )}
        <button
          className="p-2 hover:bg-gray-100 text-gray-600 rounded-lg transition-colors"
          title="More options"
        >
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;