import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UpdateProfile } from '../../redux/users/usersAction';
import { GetUser } from '../../redux/users/usersAction';
import { clearUpdateMsg, updateUser } from '../../redux/users/usersSlice';

const TutorProfileTwo = () => {
  const { updateMsg, user } = useSelector((state) => state.users);

  const [profSummary, setProfSummary] = useState(
    user.profile.profSummary
  );
  const [subjects, setSubjects] = useState(user.profile.subjects);
  const [experience, setExperience] = useState(user.profile.experience);
  const [education, setEducation] = useState(user.profile.education);
  const [resume, setResume] = useState(user.profile.resume);
  const [rate, setRate] = useState(user.profile.rate);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const route = useRoute();

  let data = route.params.data;
  console.log('data:', data);

  data = {
    ...data,
    rate,
    education,
    experience,
    profSummary,
    resume,
    subjects,
    role: user.role,
    id: user.id,
  };

  console.log('after:', data);

  const handleSubmit = () => {
    dispatch(UpdateProfile( data ));
  };

  useEffect(()=>{
    if(updateMsg==='profile updated successfully'){
      setTimeout(() => {
        dispatch(clearUpdateMsg());
      }, 5000);
    }
  },[updateMsg])

  const windowWidth = Dimensions.get('window').width;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <TouchableOpacity
        onPress={() => navigation.navigate('FormOne')}
        style={styles.prevButton}
      >
        <Text style={styles.prevButtonText}>{'<< previous'}</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Profession Information</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Highest Education level</Text>
        <TextInput
          style={[styles.input, { maxWidth: windowWidth - 40 }]} // Adjust maxWidth based on window width
          placeholder="Eg. BEd. Basic Education"
          value={education}
          onChangeText={setEducation}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Subjects</Text>
        <TextInput
          style={[styles.input, { maxWidth: windowWidth - 40 }]} // Adjust maxWidth based on window width
          placeholder="Eg. ICT, Science, Maths"
          value={subjects}
          onChangeText={setSubjects}
          multiline
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Teaching Experience (years)</Text>
        <TextInput
          style={[styles.input, { maxWidth: windowWidth - 40 }]} // Adjust maxWidth based on window width
          placeholder="Eg. 4"
          keyboardType="numeric"
          value={experience}
          onChangeText={setExperience}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Professional Summary</Text>
        <TextInput
          style={[styles.input, { maxWidth: windowWidth - 40 }]} // Adjust maxWidth based on window width
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          placeholder="Subjects"
          value={profSummary}
          onChangeText={setProfSummary}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Resume Link</Text>
        <TextInput
          style={[styles.input, { maxWidth: windowWidth - 40 }]} // Adjust maxWidth based on window width
          placeholder="Eg. https://docs.google.com/document"
          value={resume}
          onChangeText={setResume}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.labelText}>Rate per month (GHS)</Text>
        <TextInput
          style={[styles.input, { maxWidth: windowWidth - 40 }]} // Adjust maxWidth based on window width
          placeholder="Eg. 300"
          value={rate}
          onChangeText={setRate}
        />
      </View>
      <Text>{updateMsg}</Text>
      <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
        <Text style={styles.updateButtonText}>update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContent: {
    justifyContent: 'flex-start',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 5,
    paddingHorizontal: 4,
    borderRadius: 5,
  },
  labelText: {
    fontSize: 18,
    fontWeight: '600',
  },
  updateButton: {
    backgroundColor: '#3944bc',
    paddingVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom:40
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 20,
  },
  prevButton: {
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  prevButtonText: {
    color: '#3944bc',
    fontSize: 18,
  },
});

export default TutorProfileTwo;
