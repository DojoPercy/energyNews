import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebaseconfig';

const initialState = {
  ad: null,
  status: 'idle',
  loading: false,
  error: null,
};

export const fetchAd = createAsyncThunk('ad/fetchAd', async () => {
  try {
    const adDocRef = doc(db, 'ad', 'single_ad_document_id');
    const adDocSnap = await getDoc(adDocRef);
    if (adDocSnap.exists()) {
      return adDocSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    throw new Error('Failed to fetch ad: ' + error.message);
  }
});

export const saveAd = createAsyncThunk('ad/saveAd', async (adData) => {
  try {
    const adDocRef = doc(db, 'ad', 'single_ad_document_id');
    const adDocSnap = await getDoc(adDocRef);

    if (adDocSnap.exists()) {
      await updateDoc(adDocRef, adData);
    } else {
      await setDoc(adDocRef, adData);
    }

    return adData;
  } catch (error) {
    throw new Error('Failed to save ad: ' + error.message);
  }
});

const adsSlice = createSlice({
  name: 'ad',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAd.pending, (state) => {
        state.status = 'loading';
        state.loading = true;
      })
      .addCase(fetchAd.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.ad = action.payload;
        state.loading = false;
      })
      .addCase(fetchAd.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(saveAd.pending, (state) => {
        state.loading = true;
      })
      .addCase(saveAd.fulfilled, (state, action) => {
        state.ad = action.payload;
        state.loading = false;
      })
      .addCase(saveAd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adsSlice.reducer;
