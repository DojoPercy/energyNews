import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebaseconfig';


const initialState = {
  personality: [],
  status: "idle",
  loading: false,
  error: null,
};

export const fetchPersonality = createAsyncThunk(
  "personality/fetchPersonality",
  async () => {
    try {
      const personalityDocRef = doc(db, "personality", "personalities");
      const personalityDocSnap = await getDoc(personalityDocRef);
      if (personalityDocSnap.exists()) {
        return personalityDocSnap.data();
        
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Failed to fetch personality: " + error.message);
    }
  }
);

export const savePersonality = createAsyncThunk(
  "personality/savePersonality",
  async (personalityData) => {
    try {
      const personalityDocRef = doc(db, "personality", "personalities");
      const personalityDocSnap = await getDoc(personalityDocRef);

      if (personalityDocSnap.exists()) {
        await updateDoc(personalityDocRef, personalityData);
      } else {
        await setDoc(personalityDocRef, personalityData);
      }

      return personalityData;
    } catch (error) {
      throw new Error("Failed to save personality: " + error.message);
    }
  }
);

const personalitySlice = createSlice({
  name: "personality",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
     .addCase(fetchPersonality.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
     .addCase(fetchPersonality.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.personality = action.payload;
        state.loading = false;
      })
     .addCase(fetchPersonality.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      })
     .addCase(savePersonality.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
     .addCase(savePersonality.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.personality = action.payload;
        state.loading = false;
      })
     .addCase(savePersonality.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
      });
  }
});

export default personalitySlice.reducer;