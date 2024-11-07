// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import Gallery from './pages/Gallery/Gallery';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Upload from './pages/Upload/Upload';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';
import { SettingsProvider } from '@/contexts/SettingsContext';
import { Toaster } from '@/components/ui/toaster';
import PersonalPage from './pages/PersonalPage/PersonalPage';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-[#09090b]" id='main'>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/personalPage" element={<PersonalPage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </Router>
    </SettingsProvider>
  );
}

export default App;