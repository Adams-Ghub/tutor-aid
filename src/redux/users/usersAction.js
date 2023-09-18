import { createAsyncThunk } from '@reduxjs/toolkit';
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

export const RegisterUser = createAsyncThunk(
  'user/register',
  async ({ email, password, role, fullName }, thunkAPI) => {
    try {
      let user = {};
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          user = userCredential.user;

          setDoc(
            doc(db, 'users', user.uid),
            role === 'tutor'
              ? {
                  id: user.uid,
                  role,
                  fullName,
                  email,
                  photo: '',
                  phone: '',
                  profile: {
                    education: '',
                    lat: '',
                    location: '',
                    long: '',
                    profSummary: '',
                    rate: '',
                    resume: '',
                    subjects: '',
                    experience: '',
                  },
                  status: 'pending',
                }
              : {
                  email,
                  fullName,
                  id: user.uid,
                  phone: '',
                  photo: '',
                  location: '',
                  lat: '',
                  long: '',
                  role,
                }
          );
        }
      );
      return user;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
      alert(error.message);
    }
  }
);

export const UserLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      let loggedUser = {};
      await signInWithEmailAndPassword(auth, email, password).then(
        async (userCredential) => {
          // Signed in
          const user = userCredential.user;

          loggedUser = { email: user.email, id: user.uid };
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          const data = docSnap.data();
          if (data) {
            loggedUser = data;
          }
        }
      );
      console.log('user', loggedUser);
      return loggedUser;
    } catch (error) {
      alert(error.message);
      return rejectWithValue(error.message); // Provide a more detailed error message
    }
  }
);

export const Logout = createAsyncThunk('user/Logout', async (_, thunkAPI) => {
  try {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    });
  } catch (error) {
    alert(error.message);
    throw error;
  }
});

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

export const GetAllUsers = createAsyncThunk(
  'user/getUsers',
  async (_, thunkAPI) => {
    try {
      const userData = [];

      const querySnapshot = await getDocs(collection(db, 'users'));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        userData.push(doc.data());
      });
      return userData;
    } catch (error) {
      alert(error.message);
      throw error;
    }
  }
);

// export const GetAllUsers = createAsyncThunk(
//   'user/getUsers',
//   async (_, thunkAPI) => {
//     try {
//       const userData = [];

//       // Use onSnapshot to listen to changes in the 'users' collection
//       const querySnapshot = await onSnapshot(collection(db, 'users'), (snapshot) => {
//         snapshot.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots
//           console.log(doc.id, ' => ', doc.data());
//           userData.push(doc.data());
//         });
//       });

//       // Wait for the onSnapshot promise to resolve before returning the userData array
//       await querySnapshot;

//       return userData;
//     } catch (error) {
//       alert(error.message);
//       throw error;
//     }
//   }
// );

export const UpdateProfile = createAsyncThunk(
  'profile-update',
  async (data, thunkAPI) => {
    try {
      const profile = doc(db, 'users', data.id);

      await updateDoc(
        profile,
        data.role === 'tutor'
          ? {
              email: data.email,
              fullName: data.name,
              id: data.id,
              phone: data.phone,
              photo: 'link',
              lat: data.lat || '',
              long: data.long || '',
              location: data.location,
              profile: {
                education: data.education,
                profSummary: data.profSummary,
                rate: data.rate,
                resume: data.resume,
                subjects: data.subjects,
                experience: data.experience,
              },
              role: data.role,
              status: data.status,
            }
          : {
              email: data.email,
              fullName: data.fullName,
              id: data.id,
              phone: data.phone,
              photo: 'link',
              location: data.location,
              lat: data.lat || '',
              long: data.long || '',
              role: data.role,
            }
      );
    } catch (error) {
      alert(error.message);
      throw error;
    }
  }
);

export const ApproveTutor = createAsyncThunk(
  'Approve',
  async ({ id, status }, thunkAPI) => {
    try {
      const profile = doc(db, 'users', id);

      await updateDoc(profile, {
        status: status,
      });
    } catch (error) {
      alert(error.message);
      throw error;
    }
  }
);
