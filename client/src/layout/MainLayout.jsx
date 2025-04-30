import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X } from 'lucide-react'; // Optional icon library (lucide)

function MainLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#222831] text-[#DFD0B8]">
      {/* Header */}
      <header className="bg-[#393E46] text-[#DFD0B8] p-4 fixed top-0 w-full shadow z-50">
        <nav className="container mx-auto flex justify-between items-center">
          <div className="font-bold text-base md:text-xl">Task Manager</div>

          {/* Mobile Toggle Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-[#DFD0B8] focus:outline-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation Links */}
          <div
            className={`flex flex-col md:flex-row md:items-center gap-4 mt-4 md:mt-0 absolute md:static top-16 left-0 w-full md:w-auto bg-[#393E46] md:bg-transparent p-4 md:p-0 transition-all duration-300 ease-in-out z-40 ${
              menuOpen ? 'block' : 'hidden md:flex'
            }`}
          >
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'text-[#DFD0B8] font-bold'
                  : 'text-[#DFD0B8] hover:text-white'
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/tasks"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'text-[#DFD0B8] font-bold'
                  : 'text-[#DFD0B8] hover:text-white'
              }
            >
              Tasks
            </NavLink>
            <button
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 pb-16 px-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#393E46] text-center py-3 fixed bottom-0 w-full shadow-inner">
        <p className="text-sm text-[#948979]">© 2025 Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default MainLayout;
