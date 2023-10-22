import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import * as Crypto from 'expo-crypto';
import { MakeRequests } from '../redux/requests/requestsActions';

function RequestForm() {
  const tutorInfo = useRoute().params.data;
  const dispatch = useDispatch();

  const [tutorName, setTutorName] = useState(tutorInfo.name);
  const [tutorLocation, setTutorLocation] = useState('');
  const [wardOneName, setWardOneName] = useState('');
  const [wardOneClass, setWardOneClass] = useState('');
  const [wardTwoName, setWardTwoName] = useState('');
  const [wardTwoClass, setWardTwoClass] = useState('');
  const [wardThreeName, setWardThreeName] = useState('');
  const [wardThreeClass, setWardThreeClass] = useState('');
  const [notes, setNotes] = useState(''); // Added Notes state

  const { user } = useSelector((state) => state.users);
  const { message } = useSelector((state) => state.requests);

  const handleSubmit = () => {
    if (!user || !user.id) {
      // Handle the case where user is undefined or doesn't have an id
      console.error("User is undefined or missing 'id'.");
      // You can display an error message or take appropriate action here
      return;
    }

    const ward = [{ student: wardOneName, class: wardOneClass }];
    wardTwoName === '' || wardTwoClass === ''
      ? null
      : ward.push({ student: wardTwoName, class: wardTwoClass });
    wardThreeName === '' || wardThreeClass === ''
      ? null
      : ward.push({ student: wardThreeName, class: wardThreeClass });
    const request = {
      id: Crypto.randomUUID().slice(-12),
      parent: user.fullName,
      parentId: user.id,
      tutor: tutorInfo.name,
      tutorId: tutorInfo.id,
      location: user.location,
      phone: user.phone,
      notes: notes,
      long: '2222',
      lat: '3333',
      distance: '39.2',
      wards: ward,
    };

    console.log('location:', user);

    if (user.location === '' || user.phone === '') {
      // Handle the case where user is undefined or doesn't have an id
      alert(
        'Kindly complete your profile with at least location, contact, email, code to make a request'
      );
      // You can display an error message or take appropriate action here
    } else {
      dispatch(MakeRequests(request));

      setWardOneClass('');
      setWardOneName('');
      setWardTwoClass('');
      setWardTwoName('');
      setWardThreeClass('');
      setWardThreeName('');
      setNotes('');
    }
  };

  /* 
    src/screens/tutor/tutor-requests.js
    */
  // Now, you can use the 'tutor' object as needed.

  // Clear the form fields after submission:

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tutor Request Form</Text>
      <View style={styles.infoContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tutor Name"
          value={tutorName}
          editable={false}
          onChangeText={(text) => setTutorName(text)}
        />
       
        <View style={styles.wardInfoContainer}>
          <TextInput
            style={styles.wardNameInput}
            placeholder="Ward name"
            value={wardOneName}
            onChangeText={(text) => setWardOneName(text)}
          />
          <TextInput
            style={styles.wardClassInput}
            placeholder="Class"
            value={wardOneClass}
            onChangeText={(text) => setWardOneClass(text)}
          />
        </View>
        <View style={styles.wardInfoContainer}>
          <TextInput
            style={styles.wardNameInput}
            placeholder="Ward name"
            value={wardTwoName}
            onChangeText={(text) => setWardTwoName(text)}
          />
          <TextInput
            style={styles.wardClassInput}
            placeholder="Class"
            value={wardTwoClass}
            onChangeText={(text) => setWardTwoClass(text)}
          />
        </View>
        <View style={styles.wardInfoContainer}>
          <TextInput
            style={styles.wardNameInput}
            placeholder="Ward name"
            value={wardThreeName}
            onChangeText={(text) => setWardThreeName(text)}
          />
          <TextInput
            style={styles.wardClassInput}
            placeholder="Class"
            value={wardThreeClass}
            onChangeText={(text) => setWardThreeClass(text)}
          />
        </View>
        <TextInput
          style={styles.noteInput}
          placeholder="Important notes"
          value={notes}
          onChangeText={(text) => setNotes(text)}
          multiline={true} // Set multiline to true
          numberOfLines={10} // Optionally, you can set the number of lines to display
          textAlignVertical="top"
        />
        {message === 'sending request...' ? (
          <Text>{message}</Text>
        ) : message === 'request sent successfully' ? (
          Alert.alert('Message', 'request sent successfully')
        ) : null}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'column',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    flex: 1, // Occupy all available vertical space
  },
  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#333',
    marginBottom: 18,
    width: '100%',
    marginBottom: 30,
    color: '#000',
  },
  wardNameInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#333',
    marginBottom: 18,
    width: '63%',
  },
  noteInput: {
    fontSize: 16,
    padding: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#333',
    marginVertical: 25,
    width: '100%',
    textAlign: 'justify',
  },
  wardClassInput: {
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#333',
    marginBottom: 18,
    width: '33%',
  },
  submitButton: {
    backgroundColor: '#3944bc',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 20, // Reduce the spacing between the button and the previous item
  },
  submitButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'normal',
  },
  wardInfoContainer: {
    flexDirection: 'row',
    gap: 5,
  },
});

export default RequestForm;
