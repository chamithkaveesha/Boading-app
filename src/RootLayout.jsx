import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import transaction from "./assets/transaction.svg";
import SelectTransactionPopup from "./components/SelectTransactionPopup";
import {getOwner} from "./api/user";
import { useGlobalState } from "./context/GlobalState";
import { ToastProvider } from "./components/ToastProvider";
// import useStore from './components/useStore';


const RootLayout = () => {
  // const updateFlag = useStore((state) => state.updateFlag);
  
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(false);
  const { user, setUser } = useGlobalState();
  const location = useLocation();
  
  // Draggable transaction button state
  const [position, setPosition] = useState(() => {
    // Calculate initial position based on screen size
    const getButtonSize = () => {
      if (window.innerWidth >= 1024) return 80; // lg screens
      if (window.innerWidth >= 768) return 70;  // md screens
      if (window.innerWidth >= 640) return 60;  // sm screens  
      return 50; // mobile screens
    };
    
    const buttonSize = getButtonSize();
    return { 
      x: window.innerWidth - buttonSize - 20, 
      y: window.innerHeight - buttonSize - 100 
    };
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hasDragged, setHasDragged] = useState(false);
  const buttonRef = useRef(null);
  
  // Check if current page is login or signup
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/';

  // Handle mouse down for dragging
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setHasDragged(false);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (isDragging) {
      setHasDragged(true); // Mark that we've actually dragged
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Calculate button size based on screen width
      const getButtonSize = () => {
        if (window.innerWidth >= 1024) return 80; // lg screens
        if (window.innerWidth >= 768) return 70;  // md screens
        if (window.innerWidth >= 640) return 60;  // sm screens
        return 50; // mobile screens
      };
      
      const buttonSize = getButtonSize();
      const maxX = window.innerWidth - buttonSize;
      const maxY = window.innerHeight - buttonSize;
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    }
  };

  // Handle mouse up to stop dragging
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle click vs drag - only open popup if we haven't dragged
  const handleClick = (e) => {
    if (hasDragged) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    setPopup(true);
  };

  // Add event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  // Update position on window resize
  useEffect(() => {
    const handleResize = () => {
      // Calculate button size based on screen width
      const getButtonSize = () => {
        if (window.innerWidth >= 1024) return 80; // lg screens
        if (window.innerWidth >= 768) return 70;  // md screens  
        if (window.innerWidth >= 640) return 60;  // sm screens
        return 50; // mobile screens
      };
      
      const buttonSize = getButtonSize();
      const maxX = window.innerWidth - buttonSize;
      const maxY = window.innerHeight - buttonSize;
      
      setPosition(prev => ({
        x: Math.max(0, Math.min(prev.x, maxX)),
        y: Math.max(0, Math.min(prev.y, maxY))
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  

  return (
    <ToastProvider>
      <div className="min-h-screen flex flex-col">
        {!isAuthPage && (
          <header className="flex-shrink-0 z-50">
            <NavBar userDetails={user} />
          </header>
        )}

        {!isAuthPage && (
          <span 
            ref={buttonRef}
            onMouseDown={handleMouseDown}
            onClick={handleClick}
            className={`shadow-[0px_0px_12px_6px_rgba(34,197,94,0.6)] md:shadow-[0px_0px_16px_8px_rgba(34,197,94,0.7)] lg:shadow-[0px_0px_20px_10px_rgba(34,197,94,0.8)] cursor-pointer fixed p-1.5 sm:p-2 lg:p-2.5 bg-green-400 border-2 border-green-300 rounded-full flex items-center justify-center z-[9999] transition-all duration-200 backdrop-blur-sm ${
              isDragging ? 'cursor-grabbing scale-110 shadow-[0px_0px_25px_12px_rgba(34,197,94,0.9)]' : 'cursor-grab hover:scale-105 hover:shadow-[0px_0px_18px_9px_rgba(34,197,94,0.8)]'
            }`}
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`,
              userSelect: 'none',
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))'
            }}
          >
            <img src={transaction} className="h-8 sm:h-12 md:h-14 lg:h-16 pointer-events-none drop-shadow-sm" />
          </span>
        )}
        <SelectTransactionPopup isOpen={popup} onClose={() => setPopup(false)} />

        <main className="flex-grow">
          <Outlet />
        </main>

        {!isAuthPage && (
          <footer className="flex-shrink-0">
            <Footer />
          </footer>
        )}
      </div>
    </ToastProvider>
  );
};

export default RootLayout;
