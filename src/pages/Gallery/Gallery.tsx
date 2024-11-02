import React, { useState } from 'react';
import { X, Download, Share2 } from 'lucide-react';

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    // 'https://picsum.photos/800/600?random=1',

    {
      id: '1',
      url: '../../../public/image/01.jpg',
      title: 'Mountain Sunset',
      description: 'A beautiful sunset view from the mountain top.',
    },
    {
      id: '2',
      url: '../../../public/image/02.jpg',
      title: 'Mountain Sunset',
      description: 'A beautiful sunset view from the mountain top.',
    },

    {
      id: '3',
      url: '../../../public/image/03.jpg',
      title: 'Mountain Sunset',
      description: 'A beautiful sunset view from the mountain top.',
    },
    {
      id: '4',
      url: '../../../public/image/04.jpg',
      title: 'Mountain Sunset',
      description: 'A beautiful sunset view from the mountain top.',
    },
    {
      id: '5',
      url: '../../../public/image/05.jpg',
      title: 'Mountain Sunset',
      description: 'A beautiful sunset view from the mountain top.',
    },
    {
      id: '6',
      url: '../../../public/image/06.jpg',
      title: 'Mountain Sunset',
      description: 'A beautiful sunset view from the mountain top.',
    },
    {
      id: '7',
      url: '../../../public/image/07.jpg',
      title: 'Mountain Sunset',
      description: 'A beautiful sunset view from the mountain top.',
    },
    {
      id: '8',
      url: '../../../public/image/08.jpg',
      title: 'Mountain Sunset',
      description: 'A beautiful sunset view from the mountain top.',
    },
    {
      id: '9',
      url: '../../../public/image/09.jpg',
      title: 'Mountain Sunset',
      description: 'A beautiful sunset view from the mountain top.',
    },
  ];

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Masonry Photo Gallery</h2>
      
      {/* 瀑布流布局 */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {images.map((image, index) => (
          <div key={index} className="break-inside-avoid cursor-pointer" onClick={() => setSelectedImage(image.url)}>
            <img
              src={image.url}
              alt={`Gallery image ${index + 1}`}
              className="w-full rounded-lg shadow-md hover:opacity-90 transition-opacity"
              onError={handleImageError}
            />
          </div>
        ))}
      </div>

      {/* 弹出框查看大图 */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected image"
              className="max-w-full max-h-[90vh] rounded-lg"
              onError={handleImageError}
            />
            
            <div className="max-w-[90vw] max-h-[90vh] bg-transparent rounded-lg overflow-hidden">
              {/* Top Controls */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
                  onClick={() => window.open(selectedImage, '_blank')}
                  title="Download"
                >
                  <Download className="w-5 h-5 text-white" />
                </button>
                <button
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
                  // onClick={handleShare}
                  title="Share"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </button>
                <button
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-colors"
                  onClick={() => setSelectedImage(null)}
                  title="Close"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery;