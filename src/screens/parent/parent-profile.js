import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/users/usersSlice';
import { UpdateProfile } from '../../redux/users/usersAction';

function ParentProfile() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.users);

  const [image, setImage] = useState(null);
  const [fullName, setFullName] = useState(user.fullName);
  const [email, setEmail] = useState(user.email);
  const [location, setLocation] = useState(user.location);
  const [phone, setPhone] = useState(user.phone);

  const handleSubmit = () => {
    const data = {
      fullName,
      email,
      location,
      phone,
      id: user.id,
      role: user.role,
    };

    dispatch(UpdateProfile(data));
    dispatch(updateUser(data))
  };



  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 5],
      quality: 1,
    });

    console.log('image', result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  console.log('Profile', user);
  return (
    <View style={styles.mainContainer}>
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
      <ScrollView
        style={styles.bottomSection}
        contentContainerStyle={styles.scrollContent}
      >
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
            value={phone}
            keyboardType="number-pad"
            onChangeText={(text) => setPhone(text)}
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
                    editable={false}
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
      </ScrollView>
      <View style={styles.updateButtonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
          <Text style={styles.updateButtonText}>update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  imageMajorContainer: {
    // flex: 1,
    width: '100%',
    height: '45%',
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
    flexDirection: 'column',
    height: '45%',
    width: '100%',
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
  updateButtonContainer: {
    width: '100%',
    height: '10%',
  },
  updateButton: {
    backgroundColor: '#3944bc',
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 5,
  },
  inputGetCodeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coordinateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  coordinateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coordinateLabelInputContainer: {
    gap: 5,
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
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ParentProfile;
