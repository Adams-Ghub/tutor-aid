import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RadioButton } from 'react-native-paper';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Dimensions,
} from 'react-native';
import { RegisterUser } from '../redux/users/usersAction';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

export default function Signup({ navigation }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState('first');
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState('parent');
  const [fullName, setFullName] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const { user, registerMsg } = useSelector((state) => state.users);

  const handleSignUp = () => {
    if (!email || !password || !fullName) {
      Alert.alert('Error', 'All input fields must be filled');
    } else {
      dispatch(RegisterUser({ email, password, role, fullName }));
    }
  };

  useEffect(() => {
    if (registerMsg === 'fulfilled') {
      setEmail(''), setPassword(''), setFullName('');
    }
  }, [user, registerMsg]);

  const handleModalClose = () => {
    navigation.navigate('Login');
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingSection}>
        <Text style={styles.headingText}>Signup</Text>
      </View>
      <ScrollView style={styles.bottomSection}>
        <View style={styles.emailLabelInputContainer}>
          {registerMsg === 'pending' ? (
            <Text>signing up...</Text>
          ) : registerMsg === 'fulfilled' ? (
            <Text>account created. Login now!!</Text>
          ) : null}
          <Text style={styles.emailText}>Full Name</Text>
          <TextInput
            style={styles.emailInput}
            onChangeText={(text) => setFullName(text)}
          />
        </View>
        <View style={styles.emailLabelInputContainer}>
          <Text style={styles.emailText}>Email Address</Text>
          <TextInput
            style={styles.emailInput}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.passwordLabelInputContainer}>
          <Text style={styles.passwordText}>Password</Text>
          <View style={styles.visibilityPasswordInputContainer}>
            <TextInput
              secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
              style={styles.passwordInput}
              onChangeText={(text) => setPassword(text)}
            />
            {/* Password visibility toggle */}
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.passwordVisibilityToggle}
            >
              <Text>
                {showPassword ? (
                  <MaterialIcons
                    name="visibility-off"
                    size={30}
                    color="#39449c"
                  />
                ) : (
                  <MaterialIcons name="visibility" size={30} color="#39449c" />
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.radioButtonsContainer}>
          <View style={styles.regularRadioButtonContainer}>
            <RadioButton
              value="first"
              color="#3944bc"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
            />
            <Text>Parent</Text>
          </View>
          <View style={styles.pharmacistRadioButtonContainer}>
            <RadioButton
              value="second"
              color="#3944bc"
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked('second');
                setRole('tutor');
              }}
            />
            <Text>Tutor</Text>
          </View>
        </View>

        <View style={styles.signupButtonContainer}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => handleSignUp()}
          >
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.haveAccountTextsContainer}>
          <Text style={styles.haveAccountText}>Have an account?</Text>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              navigation.navigate('Login');
            }}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>User signed up successfully!</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={handleModalClose}
          >
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    margin: 0,
    padding: 0,
  },
  headingSection: {
    flex: 0.5,
    justifyContent: 'center',
    backgroundColor: '#3944bc',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headingText: {
    alignSelf: 'center',
    color: '#fefefe',
    fontWeight: '300',
    fontSize: windowWidth * 0.07,
  },
  bottomSection: {
    flex: 0.5,
    backgroundColor: '#fff',
    paddingTop: windowHeight * 0.04, // Responsive padding
    paddingHorizontal: windowWidth * 0.05,
  },
  emailLabelInputContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#3944bc',
    marginBottom: 20,
  },
  emailText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#565656',
    paddingLeft: 10,
    marginBottom: 10,
  },
  emailInput: {
    paddingLeft: 10,
    color: '#050505',
    fontSize: 18,
  },

  nameLabelInputContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#3944bc',
    marginBottom: 20,
  },
  nameText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#565656',
    paddingLeft: 10,
    marginBottom: 10,
  },
  nameInput: {
    paddingLeft: 10,
    color: '#050505',
    fontSize: 18,
  },
  passwordLabelInputContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#3944bc',
    marginBottom: 20,
  },
  passwordText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#565656',
    paddingLeft: 10,
    marginBottom: 10,
  },
  passwordInput: {
    paddingLeft: 10,
    color: '#050505',
    fontSize: 18,
    width: '90%',
  },
  visibilityPasswordInputContainer: {
    flexDirection: 'row',
  },
  signupButtonContainer: {
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: '#3944bc',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  signupButtonText: {
    color: '#fefefe',
    paddingVertical: 12,
    fontSize: 18,
    fontWeight: '600',
  },

  haveAccountTextsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  haveAccountText: {
    color: '#565656',
    fontSize: 18,
  },
  loginButtonText: {
    color: '#3944bc',
    fontSize: 18,
    marginVertical: 2,
  },
  radioButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  regularRadioButtonContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pharmacistRadioButtonContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  registrationLabelInputContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#3944bc',
    marginBottom: 30,
  },
  registrationText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#565656',
    paddingLeft: 10,
    marginBottom: 16,
  },
  registrationInput: {
    paddingLeft: 10,
    color: '#050505',
    fontSize: 18,
  },

  //modal styling begins
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalButton: {
    backgroundColor: '#3944bc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  //modal styling ends
});
