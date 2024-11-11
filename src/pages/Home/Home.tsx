import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';
import { useSettings } from '@/contexts/SettingsContext';

const Home: React.FC = () => {
  const { t } = useSettings();

  return (
    <div className=" flex items-center justify-center h-[calc(100vh-8rem)]">
      <div className="text-center px-4">
        <h1 className="text-4xl font-bold mb-6 dark:text-white">{t('welcome')}</h1>
        <Camera size={64} className="mx-auto mb-6 text-blue-500" />
        <p className="text-xl mb-8 dark:text-white">
          {t('describe')}
        </p>
        <div className="space-x-4">
          <Link
            to="/gallery"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            {t('viewGallery')}
          </Link>
          <Link
            to="/upload"
            className="bg-green-500 hover:bg-green-600 text-white font-bold h-10 py-2 px-4 rounded"
          >
            {t('uploadPhotos')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;