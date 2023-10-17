import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from 'firebase/auth';
import {
  setDoc,
  getDoc,
  doc,
  getDocs,
  collection,
  updateDoc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase.js';
import { setRequestUpdate } from './requestsSlice.js';

export const MakeRequests = createAsyncThunk(
  'request',
  async (data, thunkAPI) => {
    console.log('requestInfo:', data);
    try {
      await setDoc(doc(db, 'requests', data.id), {
        id: data.id,
        tutor: data.tutor,
        tutorId: data.tutorId,
        parent: data.parent,
        parentId: data.parentId,
        location: data.location,
        phone: data.phone,
        wards: data.wards,
        notes: data.notes,
        status: 'pending',
      });
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      alert(error.message);
    }
  }
);

/*
const q = query(collection(db, "cities"), where("state", "==", "CA"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
      cities.push(doc.data().name);
  });
  console.log("Current cities in CA: ", cities.join(", "));
});
*/

export const GetRequests = createAsyncThunk(
  'getRequest',
  async (_, thunkAPI) => {
    try {
      const requestData = [];

      const querySnapshot = await getDocs(collection(db, 'requests'));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshot
        requestData.push(doc.data());
      });
      return requestData;
    } catch (error) {
      alert(error.message);
      throw error;
    }
  }
);

export const UpdateRequest = createAsyncThunk(
  'updateRequest',
  async ({ data }, thunkAPI) => {
    try {
      const profile = doc(db, 'users', data.id);

      await updateDoc(profile, {
        email: data.email,
        fullName: data.name,
        id: data.id,
        phone: data.phone,
        photo: 'link',
        profile: {
          education: data.education,
          lat: data.lat || '',
          location: data.location,
          long: data.long || '',
          profSummary: data.profSummary,
          rate: data.rate,
          resume: data.resume,
          subjects: data.subjects,
          experience: data.experience,
        },
        role: data.role,
        status: data.status,
      });
    } catch (error) {
      alert(error.message);
      throw error;
    }
  }
);

export const AcceptRequest = createAsyncThunk(
  'Approve',
  async (datum, thunkAPI) => {
    try {
      const profile = doc(db, 'requests', datum.id);

      await updateDoc(profile, {
        status: datum.status,
      });
      console.log('datum',datum)
    } catch (error) {
      alert(error.message);
      throw error;
    }
  }
);

export const DeclineRequest = createAsyncThunk(
  'Approve',
  async (datum, thunkAPI) => {
    try {
      const profile = doc(db, 'requests', datum.id);

      await updateDoc(profile, {
        status: datum.status,
      });
      console.log('datum',datum)
    } catch (error) {
      alert(error.message);
      throw error;
    }
  }
);

//The listener Actions
// const dispatch = useDispatch();
export const listenToRequestUpdate = () => (dispatch) => {
  const firestoreCollection = collection(db, 'requests');

  const unsubscribe = onSnapshot(firestoreCollection, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    dispatch(setRequestUpdate(data));
  });

  // Clean up the listener when needed
  return () => unsubscribe();
};
