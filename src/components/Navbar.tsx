import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, LogIn, UserPlus, Upload, Menu, X, User, Settings, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isLogin, setIsLogin] = useState(true);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isLoggedIn = localStorage.getItem('token');

  

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-gray-800">
            <Camera size={28} className="text-blue-500" />
            <span>PhotoAlbum</span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/upload">
              <Upload size={18} className="inline mr-1" />
              Upload
            </NavLink>

            {isLogin ? ( 
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <img 
                      src="https://picsum.photos/400/300?random=2" 
                      alt="profile picture" 
                      className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all duration-200" 
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">John Doe</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          john@example.com
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <LogIn size={18} className="inline mr-1" />
                  Login
                </NavLink>
                <NavLink to="/register">
                  <UserPlus size={18} className="inline mr-1" />
                  Register
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/gallery" onClick={toggleMenu}>Gallery</MobileNavLink>
            <MobileNavLink to="/upload" onClick={toggleMenu}>
              <Upload size={18} className="inline mr-1" />
              Upload
            </MobileNavLink>
            <MobileNavLink to="/login" onClick={toggleMenu}>
              <LogIn size={18} className="inline mr-1" />
              Login
            </MobileNavLink>
            <MobileNavLink to="/register" onClick={toggleMenu}>
              <UserPlus size={18} className="inline mr-1" />
              Register
            </MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
  >
    {children}
  </Link>
);

const MobileNavLink: React.FC<{ to: string; onClick: () => void; children: React.ReactNode }> = ({ to, onClick, children }) => (
  <Link
    to={to}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50 transition-colors duration-200"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;