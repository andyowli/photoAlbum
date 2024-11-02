import React from 'react';
import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to PhotoAlbum</h1>
      <Camera size={64} className="mx-auto mb-6 text-blue-500" />
      <p className="text-xl mb-8">
        Capture, store, and share your precious moments with ease.
      </p>
      <div className="space-x-4">
        <Link
          to="/gallery"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          View Gallery
        </Link>
        <Link
          to="/upload"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Upload Photos
        </Link>
      </div>
    </div>
  );
};

export default Home;