import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const KeyboardCartNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Backspace') {
        navigate(-1);
      }

      if (e.key === 'Enter' && location.pathname !== '/cart') {
        navigate('/cart');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, location]);

  return null;
};

export default KeyboardCartNavigation;
