import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TutorProfileTwo = () => {
  const [name, setName] = useState('');
  const [profSummary, setProfSummary] = useState(' A passionate tutor with over five years of experience teaching basic school children');
  const [subjects, setSubjects] = useState('English, Maths, Science');
  const [teachingExperience, setTeachingExperience] = useState('5');
  const [education, setEducation] = useState('BEd. Basic Education');
  const [resume, setResume] = useState('https://localhost/resume');
  const [rate, setRate] = useState('300');

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
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
       
      <TouchableOpacity
        onPress={() => navigation.navigate('FormOne')}
        style={styles.prevButton}
      >
        <Text style={styles.prevButtonText}>{"<< previous"}</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Profession Information</Text>
      <View style={styles.usernameAndInputContainer}>
        <View style={styles.usernameEditContainer}>
          <Text style={[styles.usernameText, styles.labelText]}>Highest Education level</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>edit</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Eg. BEd. Basic Education"
          value={education}
          onChangeText={setEducation}
        />
      </View>
      <View style={styles.usernameAndInputContainer}>
        <View style={styles.usernameEditContainer}>
          <Text style={[styles.usernameText, styles.labelText]}>Subjects</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>edit</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Eg. ICT, Science, Maths"
          value={subjects}
          onChangeText={setSubjects}
          multiline
        />
      </View>
      <View style={styles.usernameAndInputContainer}>
        <View style={styles.usernameEditContainer}>
          <Text style={[styles.usernameText, styles.labelText]}>{"Teaching Experience (years)"}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>edit</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Eg. 4"
          keyboardType='numeric'
          value={teachingExperience}
          onChangeText={setTeachingExperience}
        />
      </View>

      <View style={styles.usernameAndInputContainer}>
        <View style={styles.usernameEditContainer}>
          <Text style={[styles.usernameText, styles.labelText]}>Professional Summary</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>edit</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={5} 
          textAlignVertical='top'
          placeholder="Subjects"
          value={profSummary}
          onChangeText={setProfSummary}
        />
      </View>

      <View style={styles.usernameAndInputContainer}>
        <View style={styles.usernameEditContainer}>
          <Text style={[styles.usernameText, styles.labelText]}>Resume Link</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>edit</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Eg. https://docs.google.com/document"
          value={resume}
          onChangeText={setResume}
        />
      </View>
      <View style={styles.usernameAndInputContainer}>
        <View style={styles.usernameEditContainer}>
          <Text style={[styles.usernameText, styles.labelText]}>{'Rate per month (GHS)'}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>edit</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Eg. 300"
          value={rate}
          onChangeText={setRate}
        />
      </View>

      <TouchableOpacity style={styles.updateButton}>
        <Text style={styles.updateButtonText}>update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent:'flex-start',
    gap:10
  },
  
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 4,
    borderRadius: 5,
  },
  labelText: {
    fontSize: 18,
    fontWeight: '600',
  },
  usernameEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  updateButton:{
    backgroundColor:'#3944bc',
    paddingVertical:5,
    marginTop:30,
    alignItems: 'center',
    borderRadius:5,

  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  updateButtonText:{
    color:'#fff',
    fontSize:20,
  },
  editButtonText: {
    color: '#3944bc',
    fontSize: 16,
  },
  prevButton: {
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'flex-end'
    // borderRadius: 5,
  },
  prevButtonText: {
    color: '#3944bc',
    fontSize: 18,
  },
});

export default TutorProfileTwo;

