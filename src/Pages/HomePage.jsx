import React, { useEffect, useState } from "react";
import axios from "axios";

import Popup from "../Components/siteMessage/popUp";
import Banner from "../Components/Home/Banner";
import CollectionCarousel from "../Components/Home/CollectionCarousel";
import CollectionImages from "../Components/Home/CollectionImages";
import Characteristics from "../Components/Home/Characteristics";

const API_BASE = "https://www.cosmo.global/laravel";

function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showPopup, setShowPopup] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const [targetUrl, setTargetUrl] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/messages`, {
          params: { type: "popup", current: 1, per_page: 1 },
        });

        const item = data?.data?.[0];
        if (item?.image_path) {
          setImageUrl(`${API_BASE}/api/storage/${item.image_path}`);
          setTargetUrl(item?.url || null);
        }
      } catch (e) {
        console.error("Popup fetch failed:", e);
      }
    })();
  }, []);

  return (
    <>
      <Banner
        slotMap={{
          top: 4,
          middle: 0,
          left: 1,
          right: 2,
          bottom: 3,
        }}
      />

      {showPopup && imageUrl && (
        <Popup
          imageUrl={imageUrl}
          targetUrl={targetUrl}
          onClose={() => setShowPopup(false)}
          newTab={true}
          closeOnNavigate={false}
        />
      )}

      <CollectionCarousel />
      <CollectionImages />
      <Characteristics />
    </>
  );
}

export default HomePage;
