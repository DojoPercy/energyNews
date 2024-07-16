import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebaseconfig';

const initialState = {
  ads: {
    adsLogo: 'adsLogo',
    bannerAds: 'bannerAds',
    squareAds: {
      SquareAd_1: 'squareAd1',
      SquareAd_2: 'squareAd2',
      SquareAd_3: 'squareAd3'
    }
  },
  status: 'idle',
  loading: false,
  error: null,
};

export const fetchAd = createAsyncThunk('ads/fetchAd', async () => {
  try {
    const adDocRef = doc(db, 'ads', 'single_ad_document_id');
    const adDocSnap = await getDoc(adDocRef);
    if (adDocSnap.exists()) {
      return adDocSnap.data(); // Return plain object
    } else {
      return null;
    }
  } catch (error) {
    throw new Error('Failed to fetch ads: ' + error.message);
  }
});

export const saveAd = createAsyncThunk('ads/saveAd', async (adData) => {
  try {
    const adDocRef = doc(db, 'ads', 'single_ad_document_id');
    const adDocSnap = await getDoc(adDocRef);

    if (adDocSnap.exists()) {
      await updateDoc(adDocRef, adData);
    } else {
      await setDoc(adDocRef, adData);
    }

    return adData;
  } catch (error) {
    throw new Error('Failed to save ads: ' + error.message);
  }
});

const adsSlice = createSlice({
  name: 'ads',
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
        state.ads = action.payload;
        state.loading = false;
      })
      .addCase(fetchAd.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(saveAd.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(saveAd.fulfilled, (state, action) => {
        state.ads = action.payload;
        state.loading = false;
        state.error = null;
        state.status ='succeeded';
      })
      .addCase(saveAd.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default adsSlice.reducer;
