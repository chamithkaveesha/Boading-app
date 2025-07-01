import { useState, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import transaction from "./assets/transaction.svg";
import SelectTransactionPopup from "./components/SelectTransactionPopup";
import {getOwner} from "./api/user";
import { useGlobalState } from "./context/GlobalState";
// import useStore from './components/useStore';


const RootLayout = () => {
  // const updateFlag = useStore((state) => state.updateFlag);
  
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(false);
  const { user, setUser } = useGlobalState();
  const location = useLocation();
  
  // Draggable transaction button state
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 120 });
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
      
      // Keep button within viewport bounds
      const buttonSize = 60; // Approximate button size
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
      const buttonSize = 60;
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
          className={`shadow-[0px_0px_15px_5px_rgba(34,197,94,0.5)] cursor-pointer fixed p-2 bg-green-400 rounded-full flex items-center justify-center z-[100] transition-all duration-200 ${
            isDragging ? 'cursor-grabbing scale-110' : 'cursor-grab hover:scale-105'
          }`}
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            userSelect: 'none'
          }}
        >
          <img src={transaction} className="h-15 pointer-events-none" />
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
  );
};

export default RootLayout;
