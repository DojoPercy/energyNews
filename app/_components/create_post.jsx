"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { Button, FileInput, Select, TextInput } from 'flowbite-react';
import { storage } from '../../config/firebaseconfig';
import 'react-quill/dist/quill.snow.css';
import { addNews } from '../_redux/news/newSlice';
import { categories } from '../../lib/categories';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; 

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CreatePost = () => {
  const dispatch = useDispatch();
  const news = useSelector(state => state.news.news);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState(''); 
  const [category, setCategory] = useState('uncategorized');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [editorHtml, setEditorHtml] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const [uploading, setUploading] = useState(false); 
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress
  const [showImageUploadNotice, setShowImageUploadNotice] = useState(false);
  const [publishImmediately, setPublishImmediately] = useState(false);

  const handleCheckboxChange = () => {
    setPublishImmediately(!publishImmediately);
  };

  const user = useKindeBrowserClient();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(prev => file);
   
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImageUrl('');
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    if (imageFile != '' && imageUrl != '') {
      try {
        const newNewsItem = {
          title,
          content: editorHtml,
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
        setTitle('');
        setSummary(''); // Reset summary
        setCategory('uncategorized');
        setImageFile(null);
        setImageUrl('');
        setEditorHtml('');
        setTags([]);
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const handleImageUpload = async () => {
   
    if (!imageFile) {
      setShowImageUploadNotice(true);
      console.log('No image file selected');
      return;
    }

    setUploading(true); // Start upload process
    try {
      const storageRef = ref(storage, `images/${imageFile.name}`);
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
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploading(false); // Reset upload state on error
      setShowImageUploadNotice(true); // Show notice if upload fails
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextInput
            type="text"
            placeholder="Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500"
          />
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500"
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </Select>
        </div>
        <TextInput
          type="text"
          placeholder="Summary"
          required
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500"
        />
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
        <div className="flex flex-col gap-2">
          <TextInput
            type="text"
            placeholder="Enter tag and press Add"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500"
          />
          <Button type="button" onClick={handleAddTag} gradientDuoTone="purpleToBlue" size="sm" className='bg-gradient-to-t bg-gray-600 p-3'>
            Add Tag
          </Button>
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, index) => (
              <span key={index} className="bg-teal-500 text-white rounded-full px-3 py-1 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <ReactQuill
          theme="snow"
          value={editorHtml}
          onChange={setEditorHtml}
          className="mb-12 h-72"
          placeholder='Write your post content here...'
        />
        <div className="flex items-center">
      <input
        type="checkbox"
        id="publish-checkbox"
        checked={publishImmediately}
        onChange={handleCheckboxChange}
        className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
      />
      <label htmlFor="publish-checkbox" className="ml-2 block text-sm leading-5 text-gray-900">
        Publish Right Away
      </label>
    </div>
        <Button type="submit" gradientDuoTone="purpleToBlue" size="lg" className='bg-gray-600 p-3'>
          Create Post
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;