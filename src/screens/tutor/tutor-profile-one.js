import React, { useEffect, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GetUser } from '../../redux/users/usersAction';

function TutorProfileOne() {
  const { user } = useSelector((state) => state.users);
  const dispatch =useDispatch()

  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState(user.details.fullName);
  const [email, setEmail] = useState(user.details.email);
  const [location, setLocation] = useState(user.details.profile.location);
  const [phone, setPhone] = useState(user.details.phone);
  const [status, setStatus] = useState(user.details.status);
  const [statusStyle, setStatusStyle] = useState(styles.pending);
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

  useEffect(()=>{
    dispatch(GetUser)
  },[user])


  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>Teacher Profile</Text>
      <Text style={statusStyle}>{status}</Text>
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
                  />
                  <TouchableOpacity style={styles.getCodeBtn}>
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
                data: { name: fullName, location, phone, email,status },
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
    marginTop: 10,
  },
  selectImgText: {
    fontSize: 20,
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
  bottomSection: {
    flex: 0.5,
    width: '100%',
  },

  pending: {
    fontSize: 17,
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
