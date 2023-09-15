import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UpdateProfile } from '../../redux/users/usersAction';
import { GetUser } from '../../redux/users/usersAction';
import { updateUser } from '../../redux/users/usersSlice';

const TutorProfileTwo = () => {
  const { updateMsg, user } = useSelector((state) => state.users);

  const [profSummary, setProfSummary] = useState(
    user.details.profile.profSummary
  );
  const [subjects, setSubjects] = useState(user.details.profile.subjects);
  const [experience, setExperience] = useState(user.details.profile.experience);
  const [education, setEducation] = useState(user.details.profile.education);
  const [resume, setResume] = useState(user.details.profile.resume);
  const [rate, setRate] = useState(user.details.profile.rate);

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
    role: user.details.role,
    id: user.id,
  };

  const handleSubmit = () => {
    dispatch(UpdateProfile({ data }));
    // dispatch(updateUser(data));
    console.log('after:', data);
  };

  useEffect(()=>{
    dispatch(GetUser)
  },[user])

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('FormOne')}
        style={styles.prevButton}
      >
        <Text style={styles.prevButtonText}>{'<< previous'}</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Profession Information</Text>
      <View style={styles.usernameAndInputContainer}>
        <View style={styles.usernameEditContainer}>
          <Text style={[styles.usernameText, styles.labelText]}>
            Highest Education level
          </Text>
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
          <Text style={[styles.usernameText, styles.labelText]}>
            {'Teaching Experience (years)'}
          </Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>edit</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Eg. 4"
          keyboardType="numeric"
          value={experience}
          onChangeText={setExperience}
        />
      </View>

      <View style={styles.usernameAndInputContainer}>
        <View style={styles.usernameEditContainer}>
          <Text style={[styles.usernameText, styles.labelText]}>
            Professional Summary
          </Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>edit</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={5}
          textAlignVertical="top"
          placeholder="Subjects"
          value={profSummary}
          onChangeText={setProfSummary}
        />
      </View>

      <View style={styles.usernameAndInputContainer}>
        <View style={styles.usernameEditContainer}>
          <Text style={[styles.usernameText, styles.labelText]}>
            Resume Link
          </Text>
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
          <Text style={[styles.usernameText, styles.labelText]}>
            {'Rate per month (GHS)'}
          </Text>
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
      <Text>{updateMsg}</Text>
      <TouchableOpacity style={styles.updateButton} onPress={handleSubmit}>
        <Text style={styles.updateButtonText}>update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'flex-start',
    gap: 10,
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
  updateButton: {
    backgroundColor: '#3944bc',
    paddingVertical: 5,
    marginTop: 30,
    alignItems: 'center',
    borderRadius: 5,
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
  editButtonText: {
    color: '#3944bc',
    fontSize: 16,
  },
  prevButton: {
    marginTop: 10,
    alignItems: 'center',
    alignSelf: 'flex-end',
    // borderRadius: 5,
  },
  prevButtonText: {
    color: '#3944bc',
    fontSize: 18,
  },
});

export default TutorProfileTwo;
