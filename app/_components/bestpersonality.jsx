"use client";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, FileInput, TextInput } from 'flowbite-react';
import { storage } from '../../config/firebaseconfig';
import 'react-quill/dist/quill.snow.css';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Editor from './editor';
import { fetchPersonality, savePersonality } from '../_redux/news/personality';
import { addNews } from '../_redux/news/newSlice';
import { categories } from '../../lib/categories';

const BestPersonalityForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('personality_of_the_week_feature');
  const [summary, setSummary] = useState(''); 
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showImageUploadNotice, setShowImageUploadNotice] = useState(false);
  const [publishImmediately, setPublishImmediately] = useState(true);

  const handleCheckboxChange = () => {
    setPublishImmediately(!publishImmediately);
  };

  const handleFormSubmitToNews = async (event) => {
    console.log('submitting');
    event.preventDefault();
    if (!name && !description && !imageUrl) {
      alert('Please fill in all the fields');
      return;
    }
    
    
      try {
        const newNewsItem = {
          name,
          content: description,
          summary,
          author: 'energyGoverance Desk',
          category,
          tags,
          publishDate: new Date().toUTCString(),
          updateDate: new Date().toDateString(),
          imageUrl: imageUrl || '',
          videoUrl: '',
          isPublished: publishImmediately,
          views: 0,
          likes: 0,
          comments: [],
        };
  
        dispatch(addNews(newNewsItem));
        // Reset form fields if needed
        setName('');
        
        
        setImageFile(null);
        setImageUrl('');
        setDescription('');
        
      } catch (error) {
        console.error('Error creating post:', error);
      }
    
  };

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
    if (!name && !description && !imageUrl) {
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
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-white shadow-lg rounded-lg">
      <h1 className="text-center text-4xl my-8 font-semibold text-gray-800">Best Personality of the Week</h1>
      <form onSubmit={handleFormSubmitToNews} className="flex flex-col gap-6">
        <TextInput
          type="text"
          placeholder="Name of the Person"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md p-4 m-2 focus:outline-none focus:border-blue-500"
        />
        
        <Editor
          placeholder="Full Description of The Person"
          value={description}
          onChange={(value) => setDescription(value)}
        />
        <div className="flex flex-col sm:flex-row items-center justify-between border border-gray-300 rounded-md p-3">
          {uploading ? (
            <div className="flex items-center justify-between w-full">
              <progress value={uploadProgress} max="100" className="w-full h-2 rounded-lg"></progress>
              <span className="ml-2">{uploadProgress.toFixed(2)}%</span>
            </div>
          ) : imageUrl ? (
            <div className="flex items-center gap-4">
              <img src={imageUrl} alt="Uploaded" className="w-48 h-48 object-cover rounded-md" />
              <Button type="button" onClick={handleRemoveImage} gradientDuoTone="redToOrange" size="sm" className='bg-blueTheme p-3'>
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
        {showImageUploadNotice && (
          <p className="text-red-500 text-sm mt-2">Please upload an image for the personality.</p>
        )}
        <Button type="submit" gradientDuoTone="purpleToBlue" size="lg" className="mt-4 bg-blueTheme p-3">
          Create Personality
        </Button>
      </form>
    </div>
  );
};

export default BestPersonalityForm;
