import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DreamImage.css";

//

function DreamImage({ goal }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "UU4O7idUGf9OoxQiN0ClPheNZGDSuL1Yoq2Qz9Cdbef3g5l1YVlSSQKZ";

  useEffect(() => {
    if (!goal) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.pexels.com/v1/search?query=${goal}`,
          {
            headers: {
              Authorization: apiKey,
            },
          }
        );
        const firstImage = response.data.photos[0];
        if (firstImage) {
          setImageUrl(firstImage.src.medium);
        } else {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [goal]);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <div className="ImageContainer">
        {imageUrl && <img src={imageUrl} alt={goal} className="purposeImage" />}{" "}
        {/* Render image if imageUrl is set */}
      </div>
    </>
  );
}

export default DreamImage;
