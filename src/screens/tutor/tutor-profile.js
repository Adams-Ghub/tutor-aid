import React,{useState} from 'react';
import { View,Text, TouchableOpacity, TextInput, Button,StyleSheet } from 'react-native';

const TutorProfile = () => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [subjects, setSubjects] = useState('');
  const [teachingExperience, setTeachingExperience] = useState('');
  const [education, setEducation] = useState('');
  const handleSubmit = () => {
    const profileData = {
      name,
      bio,
      subjects,
      teachingExperience,
      education,
      // ... other profile fields
    };

    onSubmit(profileData);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Teacher Profile Form</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Subjects"
        value={subjects}
        onChangeText={setSubjects}
      />
      <TextInput
        style={styles.input}
        placeholder="Teaching Experience"
        value={teachingExperience}
        onChangeText={setTeachingExperience}
      />
      <TextInput
        style={styles.input}
        placeholder="Education"
        value={education}
        onChangeText={setEducation}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
});

export default TutorProfile;
