import React, { useState } from 'react';
import { Upload as UploadIcon, AlertCircle, Loader2 } from 'lucide-react';
import { PhotoFile } from '../../types/photo';
import PhotoPreview from '../../components/PhotoPreview';


const MAX_FILES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const Upload: React.FC = () => {

  const [selectedFiles, setSelectedFiles] = useState<PhotoFile[]>([]);
  const [error, setError] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setError('');

    if (selectedFiles.length + files.length > MAX_FILES) {
      setError(`You can only upload up to ${MAX_FILES} images`);
      return;
    }

    const invalidFiles = files.filter(file => !file.type.startsWith('image/'));
    if (invalidFiles.length > 0) {
      setError('Only image files are allowed');
      return;
    }

    const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE);
    if (oversizedFiles.length > 0) {
      setError('Files must be less than 5MB');
      return;
    }

    Promise.all(files.map(file => getImageDimensions(file)))
      .then(dimensions => {
        const newFiles = files.map((file, index) => {
          const fileWithId = Object.assign(file, {
            id: generateId(),
            title: '',
            description: '',
            preview: '',
          }) as PhotoFile;
          
          const reader = new FileReader();
          reader.onloadend = () => {
            fileWithId.preview = reader.result as string;
            // console.log(fileWithId.preview);
            setSelectedFiles(prev => [...prev]);
          };
          reader.readAsDataURL(file);
          return fileWithId;
        });

        setSelectedFiles(prev => [...prev, ...newFiles]);
      });
  };

  const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const removeFile = (id: string) => {
    setSelectedFiles(prev => prev.filter(file => file.id !== id));
    setError('');
  };

  const updateFileDetails = (id: string, title: string, description: string) => {
    setSelectedFiles(prev => prev.map(file => 
      file.id === id ? { ...file, title, description } : file
    ));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFiles.length === 0) {
      setError('Please select at least one image');
      return;
    }

    const incompleteFiles = selectedFiles.filter(file => !file.title);
    if (incompleteFiles.length > 0) {
      setError('Please add titles for all photos');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // Here you would typically send the files to your backend
      const uploadData = selectedFiles.map(file => ({
        id: file.id,
        title: file.title,
        description: file.description,
        preview: file.preview,
      }));

      console.log('Uploading files with metadata:', uploadData[0].preview);
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form after successful upload
      setSelectedFiles([]);
      // alert('Photos uploaded successfully!');
    } catch (err) {
      setError('Failed to upload photos. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Upload Photos</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors
            ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400'}`}
        >
          <label htmlFor="file-upload" className="cursor-pointer block">
            <UploadIcon size={48} className={`mx-auto mb-4 ${error ? 'text-red-400' : 'text-gray-400'}`} />
            <span className={`text-lg ${error ? 'text-red-600' : 'text-gray-600'}`}>
              Click to select images or drag and drop
            </span>
            <p className="text-sm text-gray-500 mt-2">
              Up to {MAX_FILES} images (max 5MB each)
            </p>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>

        {error && (
          <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-md">
            <AlertCircle size={20} className="mr-2" />
            {error}
          </div>
        )}

        {selectedFiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedFiles.map((file) => (
              <PhotoPreview
                key={file.id}
                file={file}
                onRemove={removeFile}
                onUpdateDetails={updateFileDetails}
                disabled={isUploading}
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={selectedFiles.length === 0 || isUploading}
          className={`w-full py-3 rounded-md font-medium transition-colors duration-200 flex items-center justify-center
            ${selectedFiles.length === 0 || isUploading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
        >
          {isUploading ? (
            <>
              <Loader2 size={20} className="animate-spin mr-2" />
              Uploading...
            </>
          ) : (
            `Upload ${selectedFiles.length} ${selectedFiles.length === 1 ? 'Photo' : 'Photos'}`
          )}
        </button>
      </form>
    </div>
  );
};

export default Upload;