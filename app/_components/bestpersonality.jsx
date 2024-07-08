"use client";
import { useState } from 'react';
import { Button, FileInput, TextInput } from 'flowbite-react';
import { storage } from '../../config/firebaseconfig';
import 'react-quill/dist/quill.snow.css';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Editor from './editor';
import { useDispatch } from 'react-redux';
import { fetchPersonality, savePersonality } from '../_redux/news/personality';
import { ButtonIcon } from '@radix-ui/react-icons';

const BestPersonalityForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showImageUploadNotice, setShowImageUploadNotice] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImageUrl('');
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setShowImageUploadNotice(true);
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `BestPersonality/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on('state_changed',
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
          setImageUrl(downloadURL);
          setUploading(false);
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false);
      setShowImageUploadNotice(true);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if(!name && !description && !imageUrl) {
      alert('Please fill in all the fields');
      return;
    }
    try {
        const newPersonality = {
          name,
          description,
          imageUrl,
        };
        dispatch(savePersonality(newPersonality));
        setName('');
        setDescription('');
        setImageFile(null);
        setImageUrl('');
      } catch (error) {
        console.error('Error creating personality:', error);
      }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-white shadow-lg rounded-lg lg:p-8">
      <h1 className="text-center text-4xl my-8 font-semibold text-gray-800">Best Personality of the Week</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
        <TextInput
          type="text"
          placeholder="Name of the Person"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md p-4 focus:outline-none focus:border-blue-500"
        />
        <Editor placeholder="Full Description of The Person" onChange={(value) => setDescription(value)} />
        <div className="flex flex-col sm:flex-row items-center justify-between border border-gray-300 rounded-md p-3">
          {uploading ? (
            <div className="flex items-center justify-between w-full">
              <progress value={uploadProgress} max="100" className="w-full h-2 rounded-lg"></progress>
              <span className="ml-2">{uploadProgress.toFixed(2)}%</span>
            </div>
          ) : imageUrl ? (
            <div className="flex items-center gap-4">
              <img src={imageUrl} alt="Uploaded" className="w-48 h-48 object-cover rounded-md" />
              <Button type="button" onClick={handleRemoveImage} gradientDuoTone="redToOrange" size="sm" className='p-3'>
                Remove Image
              </Button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between w-full">
              <FileInput type="file" accept="image/*" onChange={handleFileChange} className="w-full sm:w-auto" />
              <Button type="button" onClick={handleImageUpload} gradientDuoTone="purpleToBlue" size="sm" outline className='p-3'>
                Upload Image
              </Button>
            </div>
          )}
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">Preview</h2>
        <Button type="submit" gradientDuoTone="purpleToBlue" size="lg" className="mt-4 p-3 bg-black">
          Create Personality
        </Button>
        {showImageUploadNotice && (
          <p className="text-red-500 text-sm mt-2">Please upload an image for the personality.</p>
        )}
       
      </form>
    </div>
  );
};

export default BestPersonalityForm;
