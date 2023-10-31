import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Dimensions
} from 'react-native';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserLogin } from '../redux/users/usersAction';
import { MaterialIcons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'All input fields must be filled');
    } else {
      dispatch(UserLogin({ email, password }));
    }
  };

  const { loginMsg } = useSelector((state) => state.users);

  return (
    <View style={styles.container}>
      <View style={styles.headingSection}>
        <Text style={styles.headingText}>Login</Text>
      </View>
      <ScrollView style={styles.bottomSection}>
        <View style={styles.emailLabelInputContainer}>
          {loginMsg === 'pending' ? (
            <Text style={styles.loginMsg}>Signing in...</Text>
          ) : loginMsg === 'fulfilled' ? (
            <Text>successfully logged in</Text>
          ) : null}
          <Text style={styles.emailText}>Email Address</Text>
          <TextInput
            style={styles.emailInput}
            value={email}
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
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleLogin()}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.forgotPasswordTextContainer}>
          <TouchableOpacity style={styles.forgotPasswordTextClickable}>
            <Text style={styles.forgotPasswordText}>Forgot password</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.noAccountTextsContainer}>
          <Text style={styles.noAccountText}>Don't have account?</Text>
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.createAccountButtonText}>Create account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>User signed up successfully!</Text>
          <TouchableOpacity
            style={styles.modalButton}
        
          >
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const responsiveFontSize = (size) => (width / 375) * size;
const responsiveMargin = (margin) => (width / 375) * margin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    width: '100%',
    margin: 0,
    padding: 0,
  },
  headingSection: {
    flex: 0.5,
    height: '10%',
    backgroundColor: '#3944bc',
    justifyContent: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headingText: {
    alignSelf: 'center',
    fontSize: responsiveFontSize(35),
    color: '#fff',
    fontWeight: '300',
  },
  bottomSection: {
    flex: 0.5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    paddingTop: 90,
    paddingHorizontal: 20,
  },
  emailLabelInputContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#3944bc',
    marginBottom: 30,
  },
  emailText: {
    fontSize: responsiveFontSize(15),
    fontWeight: '600',
    color: '#565656',
    paddingLeft: responsiveMargin(10),
    marginBottom: responsiveMargin(16),
  },

  emailInput: {
    paddingLeft: responsiveMargin(10),
    color: '#050505',
    fontSize: responsiveFontSize(18),
  },
  passwordLabelInputContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#3944bc',
    marginBottom: 30,
  },
  passwordText: {
    fontSize: responsiveFontSize(15),
    fontWeight: '600',
    color: '#565656',
    paddingLeft: responsiveMargin(10),
    marginBottom: responsiveMargin(16),
  },

  passwordInput: {
    paddingLeft: responsiveMargin(10),
    color: '#050505',
    fontSize: responsiveFontSize(18),
    width: '90%',
  },
  loginMsg: {
    alignSelf: 'center',
    fontSize: 14,
  },
  visibilityPasswordInputContainer: {
    flexDirection: 'row',
  },
  loginButton: {
    backgroundColor: '#3944bc',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsiveMargin(5),
  },

  loginButtonText: {
    color: '#fefefe',
    paddingVertical: responsiveMargin(12),
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
  },
  forgotPasswordTextContainer: {
    marginTop: responsiveMargin(15),
    marginBottom: responsiveMargin(40),
  },
  forgotPasswordTextClickable: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#3944bc',
    fontSize: 18,
    fontWeight: '400',
  },
  noAccountTextsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noAccountText: {
    color: '#565656',
    fontSize: 18,
  },
  createAccountButtonText: {
    color: '#3944bc',
    fontSize: 18,
    marginVertical: 2,
  },
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
});
