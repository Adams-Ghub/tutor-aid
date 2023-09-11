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

function RequestDetails() {
  const [parentName, setParentName] = useState('Ronney Owusu Yeboah');
  const [location, setLocation] = useState('Kasoa');
  const [ward, setWard] = useState('John Owusu Yeboah');
  const [contact, setContact] = useState('+233 567897903');
  const [distance, setDistance] = useState('17.2');
  const [stage, setStage] = useState('Basic 2');
  const [tutorEducation, setTutorEducation] = useState('');
  const [notes, setNotes] = useState('');
  const [tutorSummary, setTutorSummary] = useState('');
  const [tutorResumeLink, setTutorResumeLink] = useState('');

  const handleSubmit = () => {
    if (
      !parentName ||
      !location ||
      !tutorEducation ||
      !notes ||
      !tutorSummary ||
      !tutorResumeLink
    ) {
      Alert.alert('All fields are required');
      return;
    }

    // Create the tutor object here as you were doing

    // Clear the form fields after submission:
    setParentName('');
    setLocation('');
    setTutorEducation('');
    setNotes('');
    setTutorSummary('');
    setTutorResumeLink('');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Parent Request Details</Text>
      <View style={styles.infoContainer}>
        <View style={styles.labelInputContainer}>
          <Text style={styles.label}>Parent:</Text>
          <Text style={styles.text}>{parentName}</Text>
        </View>
        <View style={styles.labelInputContainer}>
          <Text style={styles.label}>Contact:</Text>
          <Text style={styles.text}>{contact}</Text>
        </View>
        <View style={styles.labelInputContainer}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.text}>{location}</Text>
        </View>
        <View style={styles.labelInputContainer}>
          <Text style={styles.label}>Distance:</Text>
          <Text style={styles.text}>{distance + ' km'}</Text>
        </View>

        <View style={styles.wardInfoContainer}>
          <View style={styles.wardLabelInputContainer}>
            <Text style={styles.label}>Ward:</Text>
            <Text style={styles.text}>{ward}</Text>
          </View>
          <View style={styles.classLabelInputContainer}>
            <Text style={styles.label}>Class:</Text>
            <Text style={styles.text}>{stage}</Text>
          </View>
        </View>
        <View style={styles.wardInfoContainer}>
          <View style={styles.wardLabelInputContainer}>
            <Text style={styles.label}>Ward:</Text>
            <Text style={styles.text}>{ward}</Text>
          </View>
          <View style={styles.classLabelInputContainer}>
            <Text style={styles.label}>Class:</Text>
            <Text style={styles.text}>{stage}</Text>
          </View>
        </View>
        <View style={styles.wardInfoContainer}>
          <View style={styles.wardLabelInputContainer}>
            <Text style={styles.label}>Ward:</Text>
            <Text style={styles.text}>{ward}</Text>
          </View>
          <View style={styles.classLabelInputContainer}>
            <Text style={styles.label}>Class:</Text>
            <Text style={styles.text}>{stage}</Text>
          </View>
        </View>

        <View style={styles.labelNoteInputContainer}>
          <Text style={styles.label}>Notes:</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Important notes"
            value={notes}
            onChangeText={(text) => setNotes(text)}
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>
        <View style={styles.acceptDeclineBtnsContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Decline</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1,
  },
  labelInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  wardLabelInputContainer: {
    marginBottom: 12,
  },
  classLabelInputContainer: {
    marginBottom: 12,
  },
  labelNoteInputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 17,
  },
  acceptDeclineBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteInput: {
    fontSize: 16,
    padding: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#333',
    marginVertical: 10,
    textAlign: 'justify',
  },
  submitButton: {
    backgroundColor: '#3944bc',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 10,
    width: '48%',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'normal',
  },
  wardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});

export default RequestDetails;
