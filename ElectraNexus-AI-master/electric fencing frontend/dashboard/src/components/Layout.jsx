import React from 'react';
import { NavLink } from 'react-router-dom';
import { Zap, Activity, Info, BarChart3, Binary, PlayCircle, Menu, X, MapPin, Truck } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/', label: 'Home', icon: <Zap size={18} /> },
  { path: '/dashboard', label: 'Dashboard', icon: <Activity size={18} /> },
  { path: '/map', label: 'Map', icon: <MapPin size={18} /> },
  { path: '/dispatch', label: 'Crew Dispatch', icon: <Truck size={18} /> },
  { path: '/logs', label: 'Logs', icon: <BarChart3 size={18} /> },
  { path: '/about', label: 'About', icon: <Info size={18} /> },
];

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-surface-950 text-surface-50 font-sans selection:bg-brand-500/30">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-surface-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 flex items-center gap-2">
              <Zap className="text-brand-400" size={24} />
              <span className="font-bold text-xl tracking-tight">FenceGuard<span className="text-brand-400">.ai</span></span>
            </div>
            
            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded-md justify-center text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' 
                        : 'text-surface-300 hover:text-white hover:bg-surface-800'
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <NavLink to="/profile" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-brand-400 bg-brand-500/10 border border-brand-500/20 hover:bg-brand-500/20 rounded-xl transition-all shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold border border-brand-500/30">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    {user.name}
                  </NavLink>
                  <button onClick={logout} className="text-sm font-medium text-surface-400 hover:text-red-400 transition-colors cursor-pointer">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-surface-300 hover:text-white transition-colors">
                    Sign in
                  </NavLink>
                  <NavLink to="/signup" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-black bg-brand-400 hover:bg-brand-500 rounded-xl transition-colors shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                    Sign up
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-surface-300 hover:text-white p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden glass-panel border-b border-surface-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-3 rounded-md text-base font-medium ${
                      isActive 
                        ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' 
                        : 'text-surface-300 hover:text-white hover:bg-surface-800'
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
              <div className="pt-4 pb-2 border-t border-surface-800 space-y-2 mt-2">
                {user ? (
                  <>
                    <NavLink to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-brand-400 hover:bg-brand-500/10">
                      <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold border border-brand-500/30">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      Profile: {user.name}
                    </NavLink>
                    <button onClick={() => { logout(); setIsOpen(false); }} className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-400 hover:bg-red-500/10 cursor-pointer">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-surface-300 hover:text-white hover:bg-surface-800">
                      Sign in
                    </NavLink>
                    <NavLink to="/signup" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-brand-400 hover:text-brand-300 hover:bg-brand-500/10">
                      Sign up
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Ambient glow effect in background */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-surface-600/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
        
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-surface-800 py-6 mt-auto glass-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-surface-400 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 FenceGuard AI Project. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-xs bg-surface-800 px-3 py-1 rounded-full border border-surface-700">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
            System Online
          </div>
        </div>
      </footer>
    </div>
  );
}
