import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { listenToProfileUpdate } from '../../redux/users/usersAction';
import { getCurrentPositionAsync, Accuracy } from 'expo-location';
import { getLocationPermission } from '../../components/distance-calculator';

function TutorProfileOne() {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [location, setLocation] = useState(user.location);
  const [phone, setPhone] = useState(user.phone);
  const [status, setStatus] = useState(user.status);
  const [long, setLong] = useState(user.long);
  const [lat, setLat] = useState(user.lat);
  const navigation = useNavigation();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const unsubscribe = dispatch(listenToProfileUpdate());

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, [dispatch]);

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getUserLocation = async () => {
    try {
      const location = await getCurrentPositionAsync({
        accuracy: Accuracy.BestForNavigation, // You can choose the desired accuracy
      });

      const { latitude, longitude } = location.coords;
      setLong(longitude);
      setLat(latitude);
    } catch (error) {
      Alert.alert('Error getting coordinates', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Teacher Profile</Text>
      {status === 'approved' ? (
        <Text style={styles.approved}>{status}</Text>
      ) : status === 'declined' ? (
        <Text style={styles.declined}>{status}</Text>
      ) : (
        <Text style={styles.pending}>{status}</Text>
      )}
      <View style={styles.imageMajorContainer}>
        <TouchableOpacity
          onPress={pickImage}
          style={styles.profileImageContainer}
        >
          {image ? (
            image && (
              <Image
                source={{ uri: image }}
                style={{ width: '100%', height: '100%', alignSelf: 'center' }}
              />
            )
          ) : (
            <Text style={styles.selectImgText}>select an image</Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.bottomSection}>
        <View style={styles.usernameAndInputContainer}>
          <View style={styles.usernameEditContainer}>
            <Text style={[styles.usernameText, styles.labelText]}>
              Full name
            </Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.allTextInput}
            value={fullName}
            onChangeText={(text) => setFullName(text)}
          />
        </View>
        <View style={styles.emailAndInputContainer}>
          <View style={styles.emailEditContainer}>
            <Text style={[styles.emailText, styles.labelText]}>email</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.allTextInput}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        <View style={styles.phoneAndInputContainer}>
          <View style={styles.phoneEditContainer}>
            <Text style={[styles.phoneText, styles.labelText]}>phone</Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.allTextInput}
            keyboardType="number-pad"
            onChangeText={(text) => setPhone(text)}
            value={phone}
          />
        </View>
        <View style={styles.pharmacyAndInputContainer}>
          <View style={styles.pharmacyEditContainer}>
            <Text style={[styles.pharmacyText, styles.labelText]}>
              location
            </Text>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.allTextInput}
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
        </View>
        <View style={styles.regNumberAndInputContainer}>
          <View style={styles.regNumberEditContainer}>
            <View style={styles.coordinateContainer}>
              <View style={styles.coordinateLabelInputContainer}>
                <Text style={[styles.regNumberText, styles.labelText]}>
                  coordinates
                </Text>
                <View style={styles.inputGetCodeContainer}>
                  <TextInput
                    style={styles.codeTextInput}
                    placeholder="click Get code button"
                    value={long === '' || lat === '' ? '' : long + ', ' + lat}
                  />
                  <TouchableOpacity
                    style={styles.getCodeBtn}
                    onPress={getUserLocation}
                  >
                    <Text style={styles.getCodeText}>Get code</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Text style={styles.editButtonText}>edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FormTwo', {
                data: {
                  name: fullName,
                  location,
                  phone,
                  email,
                  status,
                  long,
                  lat,
                },
              })
            }
            style={styles.nextBtn}
          >
            <Text style={styles.nextBtnText}>next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  imageMajorContainer: {
    flex: 0.45,
    width: '100%',
    marginTop: windowHeight * 0.02,
  },
  selectImgText: {
    fontSize: 0.04 * windowWidth, // Responsive font size
    position: 'relative',
    top: '40%',
    alignSelf: 'center',
  },
  profileImageContainer: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '100%',
    height: '100%',
    marginVertical: 0,
    paddingVertical: 0,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
  bottomSection: {
    flex: 0.5,
    width: '100%',
  },

  pending: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'orange',
  },
  approved: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'green',
  },
  declined: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'red',
  },
  usernameEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emailEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pharmacyEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  regNumberEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  phoneEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  allTextInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: 14,
    height: 24,
  },
  codeTextInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 5,
    fontSize: 14,
    height: 24,
    width: '70%',
  },
  getCodeBtn: {
    backgroundColor: '#3944bc',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  getCodeText: {
    color: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  editButtonText: {
    color: '#3944bc',
    fontSize: 16,
  },
  labelText: {
    fontSize: 18,
    fontWeight: '700',
  },
  usernameAndInputContainer: {
    marginBottom: 10,
  },
  emailAndInputContainer: {
    marginBottom: 10,
  },

  pharmacyAndInputContainer: {
    marginBottom: 10,
  },
  phoneAndInputContainer: {
    marginBottom: 10,
  },
  regNumberAndInputContainer: {
    marginBottom: 10,
  },
  nextBtn: {
    marginTop: 10,
    alignItems: 'center',
    // borderRadius: 5,
  },
  nextBtnText: {
    color: '#3944bc',
    fontSize: 18,
  },
  inputGetCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coordinateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coordinateLabelInputContainer: {
    gap: 5,
  },
});

export default TutorProfileOne;
