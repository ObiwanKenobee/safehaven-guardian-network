
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-guardian-primary text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6" />
            <span className="font-bold text-xl">Guardian-IO</span>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-guardian-primary/80"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-white/80 transition-colors">Dashboard</a>
            <a href="#" className="hover:text-white/80 transition-colors">Safe Havens</a>
            <a href="#" className="hover:text-white/80 transition-colors">Resources</a>
            <a href="#" className="hover:text-white/80 transition-colors">My Profile</a>
            {user && (
              <button 
                onClick={logout}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-md transition-colors"
              >
                Sign Out
              </button>
            )}
          </nav>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-guardian-primary/95 absolute w-full z-50 animate-fade-in">
          <nav className="flex flex-col px-4 py-2 space-y-3">
            <a href="#" className="py-2 hover:bg-guardian-primary/80 px-3 rounded-md">Dashboard</a>
            <a href="#" className="py-2 hover:bg-guardian-primary/80 px-3 rounded-md">Safe Havens</a>
            <a href="#" className="py-2 hover:bg-guardian-primary/80 px-3 rounded-md">Resources</a>
            <a href="#" className="py-2 hover:bg-guardian-primary/80 px-3 rounded-md">My Profile</a>
            {user && (
              <button 
                onClick={logout}
                className="text-left py-2 hover:bg-guardian-primary/80 px-3 rounded-md"
              >
                Sign Out
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
