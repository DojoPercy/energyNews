"use client";
import React, { useState } from "react";
import { Button, FileInput } from 'flowbite-react';
import { storage } from '../../config/firebaseconfig';
import { useDispatch } from "react-redux";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Ensure Firebase storage is properly imported and initialized
import { addIssue } from "../_redux/news/digitalEdition";

const DigitalEditionForm = () => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [date, setDate] = useState('');
  const [showImageUploadNotice, setShowImageUploadNotice] = useState(false);
  const [uploading, setUploading] = useState(false); // State to track upload status
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(prev => prev = file);
    setShowImageUploadNotice(false); 
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setShowImageUploadNotice(true);
      console.log(imageFile);
      return;
    }

    setUploading(true); // Start upload process
    try {
      const storageRef = ref(storage, `DigitalEdition/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Handle progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error('Error uploading image:', error);
          setUploading(false); // Reset upload state on error
          setShowImageUploadNotice(true); // Show notice if upload fails
        },
        async () => {
          // Handle successful uploads on complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL); // Set image URL after successful upload
          setUploading(false); // Reset upload state
          setShowImageUploadNotice(false); // Reset the notice state after successful upload
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false); // Reset upload state on error
      setShowImageUploadNotice(true); // Show notice if upload fails
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImageUrl('');
    setUploadProgress(0);
    setShowImageUploadNotice(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!imageUrl) {
      setShowImageUploadNotice(true);
      return;
    }
    const digitalEdition = {
      description: description,
      imageUrl: imageUrl,
      pdfUrl: pdfUrl,
      date: date
    };
    dispatch(addIssue(digitalEdition));
    setPdfUrl('');
    setDate('');
    setDescription('');
    setImageUrl('');
    setImageFile(null); // Reset to null
  };
  

  return (
    <div className="flex flex-col p-3">
      <h1 className="text-4xl font-semibold text-gray-800 text-center">
        Manage Digital Edition
      </h1>
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-semibold text-gray-800">
          Add Digital Edition
        </h2>
        <form className="flex flex-col gap-3" onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2">
            <label
              className="text-lg font-semibold text-gray-800"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="p-2 border border-gray-300 rounded-lg"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-lg font-semibold text-gray-800"
              htmlFor="imageUrl"
            >
              Image URL
            </label>
            <div className="flex items-center justify-between border border-gray-300 rounded-md p-3">
              {uploading ? (
                <div className="flex items-center justify-between w-full">
                  <progress value={uploadProgress} max="100" className="w-full h-2 rounded-lg"></progress>
                  <span>{uploadProgress.toFixed(2)}%</span>
                </div>
              ) : imageUrl ? (
                <div className="flex items-center gap-4">
                  <img src={imageUrl} alt="Uploaded" className="w-72 h-72 object-cover rounded-md" />
                  <Button type="button" onClick={handleRemoveImage} gradientDuoTone="redToOrange" size="sm">
                    Remove Image
                  </Button>
                </div>
              ) : (
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 '>
                  <FileInput type='file' accept='image/*' onChange={handleFileChange} />
                  <Button type='button' onClick={handleImageUpload} gradientDuoTone='purpleToBlue' size='sm' outline >Upload Image</Button>
                </div>
              )}
            </div>
            {showImageUploadNotice && (
              <p className="text-red-500 text-sm mt-2">Please upload an image for your news.</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-lg font-semibold text-gray-800"
              htmlFor="pdfUrl"
            >
              PDF URL
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg"
              type="text"
              id="pdfUrl"
              name="pdfUrl"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="text-lg font-semibold text-gray-800"
              htmlFor="date"
            >
              Issue Date
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg"
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <button className="p-2 bg-blue-500 text-white rounded-lg" type="submit">
            Add Digital Edition
          </button>
        </form>
        <div />
      </div>
    </div>
  );
};

export default DigitalEditionForm;
