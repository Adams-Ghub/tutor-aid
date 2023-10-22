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
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db } from '../../firebase/firebase.js';
import { setPerformanceUpdate } from './performanceSlice.js';
// import { setRequestUpdate } from './requestsSlice.js';

/*
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const uploadImageToFirebase = async (uri) => {
  const storage = getStorage();
  const imageRef = ref(storage, `images/example.jpg`); // Replace 'example.jpg' with your desired filename

  try {
    const response = await fetch(uri);
    const blob = await response.blob();

    await uploadBytes(imageRef, blob);
    console.log("Image uploaded successfully.");

    // Get the download URL for the uploaded image
    const downloadURL = await getDownloadURL(imageRef);
    console.log("Download URL:", downloadURL);

    return downloadURL; // You can return the URL for further use
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};


*/

export const AddPerformance = createAsyncThunk(
  'addPerformance',
  async (data, thunkAPI) => {
    const storage = getStorage();
    const imageRef = ref(
      storage,
      `images/exercises/${data.id}_${data.wardId}_${
        data.subject
      }_${data.exercise.replace(/\s+/g, '_')}`
    );
    try {
      const response = await fetch(data.image);
      const blob = await response.blob();

      await uploadBytes(imageRef, blob);
      console.log('Image uploaded successfully.');

      // Get the download URL for the uploaded image
      const imageURL = await getDownloadURL(imageRef);
      console.log('Download URL:', imageURL);

      // You can return the URL for further use
      if (data.status === true) {
        const docRef = doc(db, 'performances', data.id);

        // Get the document
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          // Retrieve the data
          const docData = docSnapshot.data();

          const newSubject = {
            name: data.subject,
            exercises: [
              {
                exercise: data.exercise,
                mark: data.mark,
                of: data.of,
                image: data.imageURL,
              },
            ],
          };

          docData.ward[0].subjects.push(newSubject); // Modify the first ward's subjects array

          // Update the Firestore document with the modified data
          await updateDoc(docRef, {
            ward: docData.ward,
          });

          console.log('Document successfully updated!');
        }
      } else {
        await setDoc(doc(db, 'performances', data.id), {
          id: data.id,
          tutor: data.tutor,
          tutorId: data.tutorId,
          parent: data.parent,
          parentId: data.parentId,
          ward: [
            {
              name: data.ward,
              id: data.wardId,
              subjects: [
                {
                  name: data.subject,
                  exercises: [
                    {
                      exercise: data.exercise,
                      mark: data.mark,
                      of: data.over,
                      image: imageURL,
                    },
                  ],
                },
              ],
            },
          ],
        });
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      alert(error.message);
    }
  }
);

export const GetPerformances = createAsyncThunk(
  'getPerformances',
  async (_, thunkAPI) => {
    try {
      const performanceData = [];

      const querySnapshot = await getDocs(collection(db, 'performances'));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshot
        performanceData.push(doc.data());
      });
      return performanceData;
    } catch (error) {
      alert(error.message);
      throw error;
    }
  }
);

export const UpdatePerformance = createAsyncThunk(
  'updatePerformance',
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

//The listener Actions
export const listenToPerformanceChanges = () => (dispatch) => {
  const firestoreCollection = collection(db, 'performances');

  const unsubscribe = onSnapshot(firestoreCollection, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      ...doc.data(),
    }));
    dispatch(setPerformanceUpdate(data));
  });

  // Clean up the listener when needed
  return () => unsubscribe();
};
