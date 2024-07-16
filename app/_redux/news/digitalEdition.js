import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../config/firebaseconfig';

const initialState = {
  digitalIssues: [],
  status: "idle",
  loading: false,
  error: null,
};

// Thunk to fetch digital issues from Firebase
export const fetchIssues = createAsyncThunk('digitalIssues/fetchDigitalIssues', async () => {
  const DigitalIssuesRef = collection(db, 'DigitalIssues');
  const snapshot = await getDocs(DigitalIssuesRef);
  const issuesArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return issuesArray;
});

// Thunk to add a new issue to Firebase
export const addIssue = createAsyncThunk('digitalIssues/addDigitalIssues', async (issue) => {
  const DigitalIssuesRef = collection(db, 'DigitalIssues');
  const docRef = await addDoc(DigitalIssuesRef, issue);
  return { id: docRef.id, ...issue };
});

// Thunk to delete an issue from Firebase
export const deleteIssue = createAsyncThunk('digitalIssues/deleteDigitalIssues', async (issueId) => {
  const docRef = doc(db, 'DigitalIssues', issueId);
  await deleteDoc(docRef);
  return issueId;
});

const digitalIssuesSlice = createSlice({
  name: "digitalIssues",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.digitalIssues = action.payload;
        state.loading = false;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addIssue.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(addIssue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.digitalIssues.push(action.payload);
        state.loading = false;
      })
      .addCase(addIssue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(deleteIssue.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(deleteIssue.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.digitalIssues = state.digitalIssues.filter(issue => issue.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteIssue.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export default digitalIssuesSlice.reducer;
