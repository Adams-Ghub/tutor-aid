import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const TutorFormScreen = () => {
  const [name, setName] = useState('');
  const [tutorClass, setTutorClass] = useState('');
  const [subject, setSubject] = useState('');

  const handleSaveTutor = () => {
    // Here, you can implement the logic to save the tutor's information
    // For now, we'll just log the values to the console
    console.log('Tutor Name:', name);
    console.log('Tutor Class:', tutorClass);
    console.log('Tutor Subject:', subject);

    // You can add your own logic to save the tutor's information to a database or state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tutor's Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter tutor's name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Class:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter class"
        value={tutorClass}
        onChangeText={(text) => setTutorClass(text)}
      />

      <Text style={styles.label}>Subject:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter subject"
        value={subject}
        onChangeText={(text) => setSubject(text)}
      />

      <Button title="Save Tutor" onPress={handleSaveTutor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default TutorFormScreen;
