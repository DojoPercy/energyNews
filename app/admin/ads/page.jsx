import React, { useState } from 'react';
import { Button, FileInput, Select, TextInput } from 'flowbite-react';// Assuming FileInput component is defined
import Ad from '../../../lib/models/ads'; 

const AdDisplayPage = () => {
  const [ads, setAds] = useState([]); 

 
  const initialAds = [
    new Ad({ AdsLogo: '', BannerAds: '', SquareAd_1: '', SquareAd_2: '', SquareAd_3: '' })
    
  ];

  useState(() => {
    setAds(initialAds);
  }, []);

  const handleFileChange = (file, index, field) => {
    const newAds = [...ads];
    newAds[index][field] = file; t
    setAds(newAds);
  };

  const handleImageUpload = (index, field) => {
    
    console.log(`Upload image for ad at index ${index}, field ${field}`);
  };

  const removeAd = (index) => {
    const newAds = [...ads];
    newAds.splice(index, 1);
    setAds(newAds);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {ads.map((ad, index) => (
        <div key={index} className="border-4 border-teal-500 border-dotted p-3 flex flex-col items-center space-y-4">
          {/* Display each ad item */}
          <div className="flex gap-4 items-center justify-between">
            {/* File input for each ad item */}
            <FileInput type="file" accept="image/*" onChange={(file) => handleFileChange(file, index, 'AdsLogo')} />
            {/* Button to upload image */}
            <Button type="button" onClick={() => handleImageUpload(index, 'AdsLogo')} gradientDuoTone="purpleToBlue" size="sm" outline>
              Upload Logo
            </Button>
          </div>
          {/* Additional file inputs and buttons for other ad fields */}
          <div className="flex gap-4 items-center justify-between">
            <FileInput type="file" accept="image/*" onChange={(file) => handleFileChange(file, index, 'BannerAds')} />
            <Button type="button" onClick={() => handleImageUpload(index, 'BannerAds')} gradientDuoTone="purpleToBlue" size="sm" outline>
              Upload Banner
            </Button>
          </div>
          {/* Repeat for SquareAd_1, SquareAd_2, SquareAd_3 */}
          {/* Remove button for each ad */}
          <Button type="button" onClick={() => removeAd(index)} size="sm" outline>
            Remove Ad
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AdDisplayPage;
