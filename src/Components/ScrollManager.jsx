import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

function ScrollManager() {
  const location = useLocation();
  const positions = useRef({});

  useEffect(() => {
    return () => {
      positions.current[location.key] = window.scrollY;
    };
  }, [location]);

  useEffect(() => {
    const y = positions.current[location.key] ?? 0;
    window.scrollTo(0, y);
  }, [location]);

  return null;
}

export default ScrollManager;
