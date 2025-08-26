// src/components/TopBanner.jsx
import React, { useEffect, useState, Fragment } from "react";
import diamond from "../../images/AboutUs/diamond.png";

const API_BASE = "http://127.0.0.1:8000";
const MESSAGES_URL = `${API_BASE}/api/messages?current=1&type=banner&per_page=1`;

export default function TopBanner() {
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(MESSAGES_URL, { credentials: "include" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const item = Array.isArray(json?.data) && json.data.length > 0 ? json.data[0] : null;
        if (!cancelled && item) {
          setBanner({
            id: item.id,
            text: item.message ?? "",
            url: item.url ?? "",
          });
        }
      } catch (err) {
        console.error("TopBanner fetch failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // If nothing to show, bail out (no hooks below this line).
  if (loading || !banner || !banner.text) return null;

  const isHttpUrl = /^https?:\/\//i.test(banner.url);

  // One unit = ⭐ + message; Fragment keeps DOM light
  const Unit = () => (
    <Fragment>
      <img className="h-5 w-5 object-contain" src={diamond} alt="" />
      <span className="whitespace-nowrap text-[16px] font-[FahKwang] leading-none">
        {banner.text}
      </span>
    </Fragment>
  );

  // Single-track, seamless loop (A + A)
  const Inner = (
    <div className="marquee-inner">
      <div className="marquee-seq">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={`a-${i}`} className="inline-flex items-center gap-7 p-6">
            <Unit />
          </div>
        ))}
      </div>
      <div className="marquee-seq">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={`b-${i}`} className="inline-flex items-center gap-7 p-6">
            <Unit />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-[30px] w-full select-none overflow-hidden bg-white text-[#082252]">
      {isHttpUrl ? (
        <a
          href={banner.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Banner link"
          className="relative block h-full"
        >
          {Inner}
        </a>
      ) : (
        <div className="relative h-full">{Inner}</div>
      )}
    </div>
  );
}
