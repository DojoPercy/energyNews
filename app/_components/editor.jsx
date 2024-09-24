import React, { Component } from "react";
import ReactQuill, { Quill } from "react-quill";
import { storage } from '../../config/firebaseconfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import "react-quill/dist/quill.snow.css";

// Register the Quill ImageUploader module
import ImageUploader from "quill-image-uploader";
Quill.register('modules/imageUploader', ImageUploader);

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text || '',
      uploading: false,
      uploadProgress: 0,
    };
    this.reactQuillRef = null; // ReactQuill component instance
    this.quillRef = null; // Quill instance
  }

  handleImageUpload = async (file) => {
    this.setState({ uploading: true });
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({ uploadProgress: progress });
        },
        (error) => {
          console.error('Error uploading image:', error);
          this.setState({ uploading: false });
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          this.setState({ uploading: false });
          const range = this.quillRef.getSelection();
          this.quillRef.insertEmbed(range.index, 'image', downloadURL);
        }
      );
    } catch (error) {
      console.error('Error uploading image:', error);
      this.setState({ uploading: false });
    }
  };

  // New method to handle music upload
  handleMusicUpload = async (file) => {
    this.setState({ uploading: true });
    try {
      const storageRef = ref(storage, `music/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.setState({ uploadProgress: progress });
        },
        (error) => {
          console.error('Error uploading music:', error);
          this.setState({ uploading: false });
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          this.setState({ uploading: false });
          const range = this.quillRef.getSelection();
          this.quillRef.insertEmbed(range.index, 'audio', downloadURL);
        }
      );
    } catch (error) {
      console.error('Error uploading music:', error);
      this.setState({ uploading: false });
    }
  };

  modules = {
    toolbar: {
      container: [
        ["bold", "italic", "underline"],
        ["list", "bullet", "indent"],
        ["image", "link"],
        [{ 'music': '🎵' }] // Custom button for music
      ],
      handlers: {
        image: () => {
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');
          input.click();
          input.onchange = async () => {
            const file = input.files[0];
            if (file) {
              await this.handleImageUpload(file);
            }
          };
        },
        music: () => { // Custom handler for music
          const input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'audio/*');
          input.click();
          input.onchange = async () => {
            const file = input.files[0];
            if (file) {
              await this.handleMusicUpload(file);
            }
          };
        }
      }
    }
  };

  formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "audio", // Added audio to formats
  ];

  componentDidMount() {
    this.quillRef = this.reactQuillRef.getEditor();
  }

  handleChange = (value) => {
    this.setState({ text: value });
    this.props.onChange(value);
  };

  render() {
    return (
      <div>
        {this.state.uploading && (
          <div className="flex items-center justify-between w-full mb-2">
            <progress
              value={this.state.uploadProgress}
              max="100"
              className="w-full h-2 rounded-lg"
            ></progress>
            <span>{this.state.uploadProgress.toFixed(2)}%</span>
          </div>
        )}
        <ReactQuill
          ref={(el) => { this.reactQuillRef = el }}
          theme="snow"
          placeholder={this.props.placeholder || "Compose an epic..."}
          modules={this.modules}
          formats={this.formats}
          value={this.props.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default Editor;
