import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CollectionImages() {
  const [topBannerImages, setTopBannerImages] = useState("");
  const [leftImage, setLeftImage] = useState("");
  const [rightImage, setRightImage] = useState("");
  const [bottomBannerImages, setBottomBannerImages] = useState("");
  const [topBannerLink, setTopBannerLink] = useState("");
  const [leftLink, setLeftLink] = useState("");
  const [rightLink, setRightLink] = useState("");
  const [bottomBannerLink, setBottomBannerLink] = useState("");

  const fetchHomePageImages = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/home-page-images");
      const response = res.data.data;
  
      setTopBannerLink(response?.[0]?.linkUrl || "");
      setLeftLink(response?.[1]?.linkUrl || "");
      setRightLink(response?.[2]?.linkUrl || "");
      setBottomBannerLink(response?.[3]?.linkUrl || "");

      setTopBannerImages(response?.[0]?.image || "");
      setLeftImage(response?.[1]?.image || "");
      setRightImage(response?.[2]?.image || "");
      setBottomBannerImages(response?.[3]?.image || "");
    } catch (error) {
      console.error("Error fetching homepage images:", error);
    }
  };

  useEffect(() => {
    fetchHomePageImages();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Link to={topBannerLink || "/"} className="relative h-auto my-[5%]">
        <div className="absolute top-[30%] lg:top-[20%] flex flex-col w-full pl-[9%] justify-center items-center"></div>
        
        <img src={`http://localhost:8000/api/storage/${topBannerImages}`} alt="top-banner" className="w-full" />
      </Link>

      <div className="flex justify-evenly xl:justify-between items-center">
        <Link to={leftLink || "/"} className="w-[30%] xl:w-[47%]">
          <img
            src={`http://localhost:8000/api/storage/${leftImage}`}
            alt="left-section"
            className="w-full h-full object-contain"
          />
        </Link>

        <Link to={rightLink || "/"} className="w-[30%] xl:w-[47%]">
          <img
            src={`http://localhost:8000/api/storage/${rightImage}`}
            alt="right-section"
            className="w-full h-full object-contain"
          />
        </Link>
      </div>

      <Link to={bottomBannerLink || "/"} className="relative h-auto mt-[5%]">
        <div className="absolute top-[30%] lg:top-[20%] flex flex-col w-full pl-[9%] justify-center items-center"></div>
       
        <img src={`http://localhost:8000/api/storage/${bottomBannerImages}`} alt="bottom-banner" className="w-full" />
      </Link>
    </div>
  );
}

export default CollectionImages;
