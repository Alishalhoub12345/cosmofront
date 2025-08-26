import React from "react";
import { AiOutlineClose } from "react-icons/ai";

export default function Popup({
  imageUrl,
  targetUrl,          // <-- URL from your DB (e.g., item.url)
  onClose,
  newTab = true,       // open link in new tab by default
  closeOnNavigate = false, // set true if you also want to close the modal after click
}) {
  if (!imageUrl) return null;

  const anchorProps = newTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const handleImageClick = () => {
    if (closeOnNavigate) onClose?.();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">
      <div className="relative max-w-[90%] max-h-[90%]">
        {/* Close button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose?.();
          }}
          aria-label="Close popup"
          className="absolute -top-4 -right-4 bg-white rounded-full p-1 shadow-lg hover:bg-gray-200"
        >
          <AiOutlineClose size={20} />
        </button>

        {/* Image (clickable if targetUrl exists) */}
        {targetUrl ? (
          <a
            href={targetUrl}
            {...anchorProps}
            onClick={handleImageClick}
            aria-label="Open related link"
            className="inline-block"
          >
            <img
              src={imageUrl}
              alt="Popup"
              className="max-w-full max-h-full rounded-md shadow-lg"
            />
          </a>
        ) : (
          <img
            src={imageUrl}
            alt="Popup"
            className="max-w-full max-h-full rounded-md shadow-lg"
          />
        )}
      </div>
    </div>
  );
}
