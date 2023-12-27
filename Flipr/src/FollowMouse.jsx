import React, { useState, useEffect } from 'react';

const MouseFollowCircle = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Check the window width
  const isWindowWidthLessThan768 = window.innerWidth < 768;

  // Conditionally render based on window width
  if (isWindowWidthLessThan768) {
  
    return null; // Return null if the width is less than 768
  }

  return (
    <div
      className="w-10 h-10 border-2 rounded-full border-[#e87b38] fixed transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      style={{ left: position.x, top: position.y }}
    ></div>
  );
};

export default MouseFollowCircle;
