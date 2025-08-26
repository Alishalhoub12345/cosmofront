import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "../Components/siteMessage/popUp"; // <-- match the file name
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import Banner from "../Components/Home/Banner";
import CollectionCarousel from "../Components/Home/CollectionCarousel";
import CollectionImages from "../Components/Home/CollectionImages";
import Characteristics from "../Components/Home/Characteristics";

// optional: centralize API base; replace with your helper if you have one
const API_BASE = "http://127.0.0.1:8000";

function HomePage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

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
        setImageUrl(item?.image_url || null);
        setTargetUrl(item?.url || null); // <-- this is the URL stored in DB
      } catch (e) {
        console.error("Popup fetch failed:", e);
      }
    })();
  }, []);

  return (
    <>
      <Navbar />
      <Banner />

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
      <Footer />
    </>
  );
}

export default HomePage;
