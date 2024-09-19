"use client";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { updateNews, fetchNews } from "../_redux/news/newSlice";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebaseconfig";


const EditPost = () => {
  const { newsID } = useParams();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const newsStatus = useSelector((state) => state.news.status);
  const loading = useSelector((state) => state.news.loading);
  const error = useSelector((state) => state.news.error);

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

  useEffect(() => {
    if (newsStatus === "idle") {
      dispatch(fetchNews());
    }
  }, [newsStatus, dispatch]);

  const newsItem = news.find((item) => item.id === newsID) || {};

  const [title, setTitle] = useState(newsItem.title || "");
  const [category, setCategory] = useState(newsItem.category || "uncategorized");
  const [imageFile, setImageFile] = useState(null);
  const [editorHtml, setEditorHtml] = useState(newsItem.content || "");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState(newsItem.tags || []);
  const [newTag, setNewTag] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showImageUploadNotice, setShowImageUploadNotice] = useState(false);

  useEffect(() => {
    if (newsItem) {
      setTitle(newsItem.title || "");
      setCategory(newsItem.category || "uncategorized");
      setEditorHtml(newsItem.content || "");
      setTags(newsItem.tags || []);
      setImageUrl(newsItem.imageUrl || "");
    }
  }, [newsItem]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    console.log("Selected file:", file);
    console.log("State after setImageFile:", imageFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImageUrl("");
  };
 
  const handleImageUpload = async () => {
    if (!imageFile) {
      setShowImageUploadNotice(true);
      console.log("No image file selected");
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `images/${imageFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading image:", error);
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
      console.error("Error uploading image:", error);
      setUploading(false);
      setShowImageUploadNotice(true);
    }
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedNewsItem = {
      ...newsItem,
      title,
      content: editorHtml,
      category,
      tags,
      updateDate: new Date(),
      imageUrl: imageFile ? URL.createObjectURL(imageFile) : newsItem.imageUrl,
    };
    dispatch(updateNews({ updatedFields: updatedNewsItem }));

    setTitle("");
    setCategory("uncategorized");
    setImageFile(null);
    setEditorHtml("");
    setTags([]);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(newsID);
    return <p>Error loading news: {error}</p>;
  }

  return (
    <div className="p-3 max-w-3xl mx-auto mt-20">
      <h1 className="text-center text-3xl my-7 font-semibold">Edit Post</h1>
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
            <option value="uncategorized">Select a Category</option>
            <option value="news">News</option>
            <option value="regional_news">Regional News</option>
            <option value="global_news">Global News</option>
            <option value="industry_updates">Industry Updates</option>
            <option value="press_releases">Press Releases</option>
            <option value="analysis">Analysis</option>
            <option value="market_analysis">Market Analysis</option>
            <option value="policy_regulation">Policy & Regulation</option>
            <option value="technology_trends">Technology Trends</option>
            <option value="expert_opinions">Expert Opinions</option>
            <option value="features">Features</option>
            <option value="personality_of_the_week_feature">Personality of the Week</option>
            <option value="case_studies">Case Studies</option>
            <option value="interviews">Interviews</option>
            <option value="special_editions">Special Editions</option>
            <option value="sectors">Sectors</option>
            <option value="oil_gas">Oil & Gas</option>
            <option value="renewable_energy">Renewable Energy</option>
            <option value="power_utilities">Power & Utilities</option>
            <option value="nuclear_energy">Nuclear Energy</option>
            <option value="energy_efficiency">Energy Efficiency</option>
            <option value="regions">Regions</option>
            <option value="middle_east">Middle East</option>
            <option value="north_africa">North Africa</option>
            <option value="sub_saharan_africa">Sub-Saharan Africa</option>
            <option value="gcc_countries">GCC Countries</option>
            <option value="energy_transition">Energy Transition</option>
            <option value="decarbonization_strategies">Decarbonization Strategies</option>
            <option value="renewable_integration">Renewable Integration</option>
            <option value="carbon_capture_storage">Carbon Capture & Storage</option>
            <option value="sustainable_energy_innovations">Sustainable Energy Innovations</option>
            <option value="green_financing">Green Financing</option>
          </Select>
        </div>
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
            <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
              <FileInput type='file' accept='image/*' onChange={handleFileChange} />
              <Button type='button' onClick={handleImageUpload} gradientDuoTone='purpleToBlue' size='sm' outline>Upload Image</Button>
            </div>
          )}
        </div>
        {showImageUploadNotice && (
          <p className="text-red-500">Please select an image file before uploading.</p>
        )}
        <ReactQuill
          value={editorHtml}
          onChange={setEditorHtml}
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500"
        />
        <div className="flex gap-2 items-center w-full">
          <TextInput
            type="text"
            placeholder="Add tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500"
          />
          <Button type="button" onClick={handleAddTag} gradientDuoTone="greenToBlue" className="bg-black">
            Add Tag
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-teal-500 text-white py-1 px-3 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        <Button type="submit" gradientDuoTone="purpleToBlue" className="bg-black">
          Update Post
        </Button>
      </form>
    </div>
  );
};

export default EditPost;
