// src/features/news/newsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, storage } from '../../../config/firebaseconfig'; // Import storage from Firebase config
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Import necessary storage functions

// Thunk to fetch news from Firebase
export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const newsCollection = collection(db, 'news');
  const snapshot = await getDocs(newsCollection);
  const newsArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
  return newsArray;
});

// Thunk to add news to Firebase, including file upload
export const addNews = createAsyncThunk('news/addNews', async (newsItem) => {
  
  const newsCollection = collection(db, 'news');
  const docRef = await addDoc(newsCollection, newsItem);
  
  return { id: docRef.id, ...newsItem };
});

// Thunk to update news in Firebase, including image update
export const updateNews = createAsyncThunk(
  'news/updateNews',
  async ({ updatedFields, imageFile }, thunkAPI) => {
    try {
      const { id } = updatedFields;
      let imageUrl = updatedFields.imageUrl; // Existing image URL or new URL if updated

      if (imageFile) {
        // Upload new image to storage if imageFile is provided
        const storageRef = ref(storage, `images/${imageFile.name}`);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        const snapshot = await uploadTask;
        imageUrl = await getDownloadURL(snapshot.ref); // Update imageUrl with new download URL
      }

      // Update the document in Firestore with updatedFields and possibly new imageUrl
      const docRef = doc(db, 'news', id);
      await updateDoc(docRef, { ...updatedFields, imageUrl });

      return { ...updatedFields, imageUrl }; // Return updated data after successful update
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Return error message if update fails
    }
  }
);

// Thunk to delete news from Firebase
export const deleteNews = createAsyncThunk('news/deleteNews', async (newsId) => {
  const docRef = doc(db, 'news', newsId);
  await deleteDoc(docRef);
  return newsId;
});

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    news: [],
    status: 'idle', // idle | loading | succeeded | failed
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload;
        state.loading = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNews.fulfilled, (state, action) => {
        state.news.push(action.payload);
        state.loading = false;
      })
      .addCase(addNews.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        const updatedIndex = state.news.findIndex(news => news.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.news[updatedIndex] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateNews.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.news = state.news.filter(news => news.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteNews.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default newsSlice.reducer;
