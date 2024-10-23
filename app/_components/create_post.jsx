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
  const [audioVideoFile, setAudioVideoFile] = useState(null);
  const [audioVideoUrl, setAudioVideoUrl] = useState("");
  const [uploadingAudioVideoProgress, setUploadingAudioVideoProgress] =
    useState(0);
  const [uploadingAudioVideo, setUploadingAudioVideo] = useState(false);
  const [editorHtml, setEditorHtml] = useState("");
  const [audioVideoType, setAudioVideoType] = useState("");
  const [iframeString, setIframeString] = useState(""); // New iframe state
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
      router.push("/admin-check");
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
    if (file) {
      const fileType = file.type.startsWith("audio") ? "audio" : "video";
      setAudioVideoType(fileType); 
      setAudioVideoFile(file);  
    }
    
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };
  const handleRemoveAudioVideo = () => {
    setAudioVideoFile(null);
    setAudioVideoUrl("");
    setAudioVideoType("");
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
          videoUrl: audioVideoUrl || iframeString || "", // Include iframe if provided
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
        setIframeString(""); // Reset iframe field
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
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

    setUploadingAudioVideo(true);
    try {
      const storageRef = ref(storage, `media/${audioVideoFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, audioVideoFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadingAudioVideoProgress(progress);
        },
        (error) => {
          console.error("Error uploading media:", error);
          setUploadingAudioVideo(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setAudioVideoUrl(downloadURL); // Set URL for audio/video file
          setUploadingAudioVideo(false);
        }
      );
    } catch (error) {
      console.error("Error uploading media:", error);
      setUploadingAudioVideo(false);
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

        {/* Conditional iframe input field */}
        {category.toLowerCase() === "video" && (
          <div className="flex flex-col gap-4">
            <TextInput
              type="text"
              placeholder="Enter iframe embed code"
              value={iframeString}
              onChange={(e) => setIframeString(e.target.value)}
              className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500"
            />
          </div>
        )}

        <p className="text-gray-500 text-sm mt-2 flex items-center pl-3">
          <IoAlertCircle /> Click on the Upload Image Button after Image File is
          Selected
        </p>
        <div className="flex w-full items-center justify-between border border-gray-300 rounded-md p-3">
          {uploading ? (
            <div className="flex items-center justify-between w-full">
              <progress
                value={uploadProgress}
                max="100"
                className="w-full h-2 rounded-lg"
              ></progress>
              <p className="ml-3">{uploadProgress.toFixed(2)}%</p>
            </div>
          ) : imageFile ? (
            <p>{imageFile.name}</p>
          ) : (
            <p className="text-gray-500">No file chosen</p>
          )}
          <FileInput
            onChange={handleFileChange}
            className="ml-2"
            disabled={uploading}
          />
          <Button
            className="ml-3"
            onClick={handleImageUpload}
            disabled={uploading}
          >
            Upload Image
          </Button>
        </div>
        {showImageUploadNotice && (
          <p className="text-red-500 text-sm mt-2">
            Please upload an image before submitting.
          </p>
        )}

        <TextInput
          placeholder="Tags (press enter to add)"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTag();
            }
          }}
          className="border border-gray-300 rounded-md p-3 focus:outline-none focus:border-teal-500"
        />

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-teal-500 text-white px-3 py-1 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4">
          <ReactQuill value={editorHtml} onChange={setEditorHtml} />
        </div>

        <Button type="submit" className="mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;
