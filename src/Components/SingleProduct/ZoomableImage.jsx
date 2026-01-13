import React, { useRef } from "react";

export default function ZoomableImage({ src }) {
  const imgRef = useRef(null);

  // Desktop hover zoom
  const handleMouseMove = (e) => {
    const img = imgRef.current;
    if (!img) return;

    const rect = img.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    img.style.transformOrigin = `${x}% ${y}%`;
    img.style.transform = "scale(2)";
  };

  const resetZoom = () => {
    const img = imgRef.current;
    if (!img) return;
    img.style.transform = "scale(1)";
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ touchAction: "auto" }} // enables pinch zoom
    >
      <img
        ref={imgRef}
        src={src}
        alt="product"
        className="w-full h-full object-cover transition-transform duration-200"
        onMouseMove={handleMouseMove}
        onMouseLeave={resetZoom}
      />
    </div>
  );
}
