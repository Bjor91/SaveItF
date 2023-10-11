import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DreamImage.css';

function DreamImage({ goal }) {
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = 'UU4O7idUGf9OoxQiN0ClPheNZGDSuL1Yoq2Qz9Cdbef3g5l1YVlSSQKZ';

  useEffect(() => {
    if (!goal) return; // Prevent making requests when goal is null or undefined

    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.pexels.com/v1/search?query=${goal}`, {
          headers: {
            'Authorization': apiKey
          }
        });
        const firstImage = response.data.photos[0];
        if (firstImage) {
          setImageUrl(firstImage.src.medium); // Set URL of the first image found
        } else {
          //setError('No images found');
        }
      } catch (error) {
        console.error(error);
        //setError('Error fetching image');
      }
    };

    fetchData();
  }, [goal]); // useEffect dependency array - the effect will re-run whenever goal changes

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
    <div className = "ImageContainer">
      {imageUrl && <img src={imageUrl} alt={goal} className="purposeImage"/>} {/* Render image if imageUrl is set */}
      </div>
    </>
  );
}

export default DreamImage;
