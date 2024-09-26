"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { IoAlertCircle } from "react-icons/io5";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { storage } from "../../config/firebaseconfig";
import "react-quill/dist/quill.snow.css";
import { addNews } from "../_redux/news/newSlice";
import { categories } from "../../lib/categories";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreatePost = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("uncategorized");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [audioVideoFile, setAudioVideoFile] = useState(null); // For audio/video file
  const [audioVideoUrl, setAudioVideoUrl] = useState(""); // Audio/Video URL
  const [editorHtml, setEditorHtml] = useState("");
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showImageUploadNotice, setShowImageUploadNotice] = useState(false);
  const [publishImmediately, setPublishImmediately] = useState(false);
  const isAdmin = useSelector((state) => state.admin?.isAdmin);
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/admin-check');  
    }
  }, [isAdmin, router]);

  const handleCheckboxChange = () => {
    setPublishImmediately(!publishImmediately);
  };

  const user = useKindeBrowserClient();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImageUrl("");
  };

  const handleAudioVideoFileChange = (event) => {
    const file = event.target.files[0];
    setAudioVideoFile(file);
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (imageFile != "" && imageUrl != "") {
      try {
        const newNewsItem = {
          title,
          content: editorHtml,
          summary,
          author: "energyGoverance Desk",
          category,
          tags,
          publishDate: new Date().toUTCString(),
          updateDate: new Date().toDateString(),
          imageUrl: imageUrl || "",
          videoUrl: audioVideoUrl || "", // Video or audio URL
          isPublished: publishImmediately,
          views: 0,
          likes: 0,
          comments: [],
        };

        dispatch(addNews(newNewsItem));
        // Reset form fields if needed
        setTitle("");
        setSummary("");
        setCategory("uncategorized");
        setImageFile(null);
        setImageUrl("");
        setAudioVideoFile(null);
        setAudioVideoUrl("");
        setEditorHtml("");
        setTags([]);
      } catch (error) {
        console.error("Error creating post:", error);
      }
    } else if (imageUrl === "") {
      setShowImageUploadNotice(true);
      return;
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) {
      setShowImageUploadNotice(true);
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
    }
  };

  const handleAudioVideoUpload = async () => {
    if (!audioVideoFile) {
      console.log("No audio/video file selected");
      return;
    }

    setUploading(true);
    try {
      const storageRef = ref(storage, `media/${audioVideoFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, audioVideoFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Error uploading media:", error);
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setAudioVideoUrl(downloadURL); // Set URL for audio/video file
          setUploading(false);
        }
      );
    } catch (error) {
      console.error("Error uploading media:", error);
      setUploading(false);
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen pt-20">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a Post</h1>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-4">
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
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
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
        <p className="text-gray-500 text-sm mt-2 flex items-center pl-3">
          <IoAlertCircle /> Click on the Upload Image Button after Image File is Selected
        </p>
        <div className="flex w-full items-center justify-between border border-gray-300 rounded-md p-3">
          {uploading ? (
            <div className="flex items-center justify-between w-full">
              <progress
                value={uploadProgress}
                max="100"
                className="w-full h-2 rounded-lg"
              ></progress>
              <span>{uploadProgress.toFixed(2)}%</span>
            </div>
          ) : imageUrl ? (
            <div className="flex items-center gap-4">
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-72 h-72 object-cover rounded-md"
              />
              <Button
                type="button"
                onClick={handleRemoveImage}
                gradientDuoTone="redToOrange"
                size="sm"
              >
                Remove Image
              </Button>
            </div>
          ) : (
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 w-full">
              <FileInput
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <Button
                type="button"
                onClick={handleImageUpload}
                gradientDuoTone="purpleToBlue"
                size="sm"
                outline
                className="w-[200px]"
              >
                Upload Image
              </Button>
            </div>
          )}
        </div>
        {category.toLowerCase() === "podcast" || category.toLowerCase() === "video" ? (
          <div>
            <p className="text-gray-500 text-sm mt-2 flex items-center pl-3">
              <IoAlertCircle /> Upload an Audio or Video file if applicable
            </p>
            <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 w-full">
              <FileInput
                id="audio-video-upload"
                type="file"
                accept="audio/*,video/*"
                onChange={handleAudioVideoFileChange}
              />
              <Button
                type="button"
                onClick={handleAudioVideoUpload}
                gradientDuoTone="purpleToBlue"
                size="sm"
                outline
                className="w-[200px]"
              >
                Upload Media
              </Button>
            </div>
          </div>
        ) : null}
        <div className="border border-gray-300 rounded-md p-3">
          <ReactQuill
            value={editorHtml}
            onChange={setEditorHtml}
            theme="snow"
            placeholder="Write your post here..."
          />
        </div>
        <div className="flex items-center gap-2">
          <TextInput
            type="text"
            placeholder="Add Tag"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500"
          />
          <Button
            type="button"
            onClick={handleAddTag}
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
          >
            Add Tag
          </Button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-teal-200 text-teal-900 rounded-md px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="publish-immediately"
            checked={publishImmediately}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="publish-immediately">Publish Immediately</label>
        </div>
        {showImageUploadNotice && (
          <p className="text-red-500 text-sm mt-2">Please upload an image before submitting.</p>
        )}
        <Button type="submit" gradientDuoTone="greenToBlue">
          Submit Post
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
