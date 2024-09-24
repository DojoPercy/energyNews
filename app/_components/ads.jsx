"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAd, saveAd } from "../_redux/news/ads";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FileInput, Button } from "flowbite-react";
import { storage } from "../../config/firebaseconfig";
import { useRouter } from "next/navigation";

const AdsSection = () => {
  const dispatch = useDispatch();

  const ads = useSelector((state) => state.ads.ads);
  const adsStatus = useSelector((state) => state.ads.status);
  const loading = useSelector((state) => state.ads.loading);
  const error = useSelector((state) => state.ads.error);
  const isAdmin = useSelector((state) => state.admin?.isAdmin);
  const router = useRouter();


  useEffect(() => {
    console.log(isAdmin)
    if (!isAdmin) {
      router.push('/admin-check');  
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    router.push('/');
    return null}; 

  const [adsLogo, setAdsLogo] = useState("");
  const [bannerAds, setBannerAds] = useState("");
  const [squareAd1, setSquareAd1] = useState("");
  const [squareAd2, setSquareAd2] = useState("");
  const [squareAd3, setSquareAd3] = useState("");

  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [showImageUploadNotice, setShowImageUploadNotice] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0.0);

  useEffect(() => {
    dispatch(fetchAd());
  }, [dispatch]);

  useEffect(() => {
    if (adsStatus === "idle") {
      dispatch(fetchAd());
    }
    if (adsStatus === "succeeded" && ads) {
      setAdsLogo(ads.adsLogo || "");
      setBannerAds(ads.bannerAds || "");
      setSquareAd1(ads.squareAds.SquareAd_1 || "");
      setSquareAd2(ads.squareAds.SquareAd_2 || "");
      setSquareAd3(ads.squareAds.SquareAd_3 || "");
    }
  }, [ads, adsStatus]);

  const handleImageUpload = async (imageFile, adType) => {
    if (!imageFile) {
      setShowImageUploadNotice(true);
      return;
    }
  
    setUploading(true);
    try {
      const storageRef = ref(storage, `ads/${adType}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error('Error uploading image:', error);
          setUploading(false);
          setShowImageUploadNotice(true);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log(`Image successfully uploaded and downloadable at: ${downloadURL}`);
          
          switch (adType) {
            case 'adsLogo':
              setAdsLogo(downloadURL);
              break;
            case 'bannerAds':
              setBannerAds(downloadURL);
              break;
            case 'squareAd1':
              setSquareAd1(downloadURL);
              break;
            case 'squareAd2':
              setSquareAd2(downloadURL);
              break;
            case 'squareAd3':
              setSquareAd3(downloadURL);
              break;
            default:
              break;
          }
  
          // Use a timeout to wait for the state to update
          setTimeout(() => {
            const adData = {
              adsLogo: adType === 'adsLogo' ? downloadURL : adsLogo,
              bannerAds: adType === 'bannerAds' ? downloadURL : bannerAds,
              squareAds: {
                SquareAd_1: adType === 'squareAd1' ? downloadURL : squareAd1,
                SquareAd_2: adType === 'squareAd2' ? downloadURL : squareAd2,
                SquareAd_3: adType === 'squareAd3' ? downloadURL : squareAd3,
              },
            };
  
            console.log('Updated adData:', adData);
  
            dispatch(saveAd(adData));
            setUploading(false);
          }, 500); // Adjust the timeout duration as needed
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
      setShowImageUploadNotice(true);
    }
  };

  const handleFileChange = (event, adType) => {
    const file = event.target.files[0];
    handleImageUpload(file, adType);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (uploading) {
    return (
      <>
        <div className="flex items-center justify-between w-full">
          <progress
            value={uploadProgress}
            max="100"
            className="w-full h-2 rounded-lg"
          ></progress>
          <span>{uploadProgress.toFixed(2)}%</span>
        </div>
        <p>Uploading...</p>
      </>
    );
  }

  return (
    <div className="ads-section p-4">
      <h2 className="text-2xl font-bold mb-4">Ads Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Ads Logo */}
        <div className="ad bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Ads Logo</h3>
          <img src={adsLogo} alt="Ads Logo" className="mb-2" />
          <div className="flex items-center justify-between border border-gray-300 rounded-md p-3">
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
              <FileInput
                type="file"
                key={fileInputKey}
                className=""
                onChange={(e) => handleFileChange(e, "adsLogo")}
              />
            </div>
          </div>
        </div>

        {/* Banner Ads */}
        <div className="ad bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Banner Ads</h3>
          <img src={bannerAds} alt="Banner Ads" className="mb-2" />
          <div className="flex items-center justify-between border border-gray-300 rounded-md p-3">
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
              <FileInput
                type="file"
                key={fileInputKey + 1}
                className=""
                onChange={(e) => handleFileChange(e, "bannerAds")}
              />
            </div>
          </div>
        </div>

        {/* Square Ad 1 */}
        <div className="ad bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Square Ad 1</h3>
          <img src={squareAd1} alt="Square Ad 1" className="mb-2" />
          <div className="flex items-center justify-between border border-gray-300 rounded-md p-3">
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
              <FileInput
                type="file"
                key={fileInputKey + 2}
                className=""
                onChange={(e) => handleFileChange(e, "squareAd1")}
              />
            </div>
          </div>
        </div>

        {/* Square Ad 2 */}
        <div className="ad bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Square Ad 2</h3>
          <img src={squareAd2} alt="Square Ad 2" className="mb-2" />
          <div className="flex items-center justify-between border border-gray-300 rounded-md p-3">
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
              <FileInput
                type="file"
                key={fileInputKey + 3}
                className=""
                onChange={(e) => handleFileChange(e, "squareAd2")}
              />
            </div>
          </div>
        </div>

        {/* Square Ad 3 */}
        <div className="ad bg-white p-4 shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Square Ad 3</h3>
          <img src={squareAd3} alt="Square Ad 3" className="mb-2" />
          <div className="flex items-center justify-between border border-gray-300 rounded-md p-3">
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
              <FileInput
                type="file"
                key={fileInputKey + 4}
                className=""
                onChange={(e) => handleFileChange(e, "squareAd3")}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsSection;
