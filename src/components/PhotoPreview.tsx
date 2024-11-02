import React from 'react';
import { X } from 'lucide-react';
import { PhotoFile } from '../types/photo';

interface PhotoPreviewProps {
  file: PhotoFile;
  onRemove: (id: string) => void;
  onUpdateDetails: (id: string, title: string, description: string) => void;
  disabled?: boolean;
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ file, onRemove, onUpdateDetails, disabled = false }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-3">
      <div className="relative group mb-3">
        <img
          src={file.preview}
          alt={file.title || file.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <button
          type="button"
          onClick={() => onRemove(file.id)}
          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full 
            opacity-0 group-hover:opacity-100 transition-opacity duration-200
            hover:bg-red-600"
        >
          <X size={16} />
        </button>
      </div>
      
      <input
        type="text"
        value={file.title}
        onChange={(e) => onUpdateDetails(file.id, e.target.value, file.description)}
        placeholder="Add title"
        className="w-full p-2 mb-2 border rounded-md text-sm"
        maxLength={50}
      />
      
      <textarea
        value={file.description}
        onChange={(e) => onUpdateDetails(file.id, file.title, e.target.value)}
        placeholder="Add description"
        className="w-full p-2 border rounded-md text-sm resize-none"
        rows={2}
        maxLength={200}
      />
    </div>
  );
}

export default PhotoPreview;