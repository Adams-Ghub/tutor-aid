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


function RequestForm() {
  const [tutorName, setTutorName] = useState('');
  const [tutorLocation, setTutorLocation] = useState('');
  const [wardOneName, setWardOneName] = useState('');
  const [wardOneClass, setWardOneClass] = useState('');
  const [wardTwoName, setWardTwoName] = useState('');
  const [wardTwoClass, setWardTwoClass] = useState('');
  const [wardThreeName, setWardThreeName] = useState('');
  const [wardThreeClass, setWardThreeClass] = useState('');
  const [tutorEducation, setTutorEducation] = useState(''); // Added tutorEducation state
  const [notes, setNotes] = useState(''); // Added Notes state
  const [tutorSummary, setTutorSummary] = useState('');
  const [tutorResumeLink, setTutorResumeLink] = useState('');

  const handleSubmit = () => {
    if (
      !tutorName ||
      !tutorLocation ||
      !tutorEducation || // Check for tutorEducation
      !Notes || // Check for Notes
      !tutorSummary ||
      !tutorResumeLink
    ) {
      Alert.alert('All fields are required');
      return;
    }

    // Here, you can perform actions like sending the tutor information to a server or updating state.

    // For example, you can update the tutor state like this:
    const tutor = {
      name: tutorName,
      location: tutorLocation,
      profile: {
        education: tutorEducation,
        experience: 3, // You can set the experience to an appropriate value.
        contact: '', // Add the contact information if needed.
        resume: tutorResumeLink,
      },
    };

    // Now, you can use the 'tutor' object as needed.

    // Clear the form fields after submission:
    setTutorName('');
    setTutorLocation('');
    setTutorEducation('');
    setNotes('');
    setTutorSummary('');
    setTutorResumeLink('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tutor Request Form</Text>
      <View style={styles.infoContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tutor Name"
          value={tutorName}
          onChangeText={(text) => setTutorName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={tutorLocation}
          onChangeText={(text) => setTutorLocation(text)}
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
    marginBottom:30,
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
    padding:4,
    borderWidth: 1,
    borderRadius:5,
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
