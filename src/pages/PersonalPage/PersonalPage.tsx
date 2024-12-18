import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSettings } from '@/contexts/SettingsContext';
import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { useProfileStore } from '../../store/profile';
import BackToTop from '@/components/BackTop';
const PersonalPage: React.FC = () => {
  const { t } = useSettings();

  const isProfileVisible = useProfileStore((state) => state.profile);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
  };


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
        description: 'girl with a mountain.',
      },
  ];

  const filteredImages = images.filter(image => 
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.description.toLowerCase().includes(searchQuery.toLowerCase())
      // image.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );


  if (!isProfileVisible) {
    return (
        <div className="dark:text-white flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
            <Lock className="w-16 h-16 mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">{t('profileHidden')}</h2>
            <p className="text-muted-foreground">{t('makeProfilePublic')}</p>
        </div>
    );
  }

    
    

  return (
    <div className='mx-auto container mt-8'>
        <div className='mx-auto max-w-md'>
            <div className='flex justify-center'>
                <Avatar className='size-32 mb-10'>
                    <AvatarImage src="https://picsum.photos/400/300?random=2" />
                    <AvatarFallback>{t('profilePicture')}</AvatarFallback>
                </Avatar>
            </div>

            <div className='flex justify-center mb-8'>
                <span className='font-bold text-4xl'>John Doe</span>
            </div>
        </div>


        {/* 瀑布流布局 */}
        {filteredImages.length === 0 ? (
            <div className="text-center py-12">
            <p className="text-lg text-muted-foreground dark:text-white">No images found matching your search.</p>
            </div>
        ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredImages.map((image, index) => (
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
      )}

      <BackToTop />
    </div>
  )
}

export default PersonalPage
