import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function Popup({
  imageUrl,
  targetUrl,
  onClose,
  newTab = true,
  closeOnNavigate = false,
}) {
  if (!imageUrl) return null;

  const anchorProps = newTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const handleImageClick = () => {
    if (closeOnNavigate) onClose?.();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#082252]">
      <div className="relative w-[82%] max-w-[70%] sm:max-w-[100%] p-[2%] flex flex-col items-center">
        {/* Image */}
        {targetUrl ? (
          <a
            href={targetUrl}
            {...anchorProps}
            onClick={handleImageClick}
            aria-label="Open related link"
            className="block w-full"
          >
            <img
              src={imageUrl}
              alt="Popup"
              className="w-full max-h-[80vh] object-contain shadow-xl"
            />
          </a>
        ) : (
          <img
            src={imageUrl}
            alt="Popup"
            className="w-full max-h-[80vh] object-contain shadow-xl"
          />
        )}

        {/* Close button directly under photo */}
        <button
          onClick={onClose}
          aria-label="Close popup"
          className="mt-3 bg-white rounded-full p-2 shadow-lg hover:bg-gray-200 flex items-center justify-center"
        >
          <AiOutlineClose size={12} />
        </button>
      </div>
    </div>
  );
}
