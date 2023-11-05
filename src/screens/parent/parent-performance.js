import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  GetPerformances,
  listenToPerformanceChanges,
} from '../../redux/performances/performanceActions';
import { useNavigation } from '@react-navigation/native';

const ParentPerformance = () => {
  const [tutor, setTutor] = useState('');
  const [subject, setSubject] = useState('');
  const [exerciseDuration, setExerciseDuration] = useState('');
  const [exerciseFrequency, setExerciseFrequency] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedTutor, setSelectedTutor] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [image, setImage] = useState(null);

  const { performances } = useSelector((state) => state.performances);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const parentPerformance = performances.filter(
    (per) => per.parentId === user.id
  );
  const tutorSelection = parentPerformance.map((performance) => ({
    id: performance.tutorId,
    name: performance.tutor,
  }));

  const uniqueTutors = [];
  const seenIds = {};

  for (const tutor of tutorSelection) {
    if (!seenIds[tutor.id]) {
      uniqueTutors.push(tutor);
      seenIds[tutor.id] = true;
    }
  }

  console.log('performances:', parentPerformance);

  useEffect(() => {
    dispatch(GetPerformances());
    dispatch(listenToPerformanceChanges());
  }, []);

  const handleSelectTutor = (item) => {
    setSelectedTutor(item);
  };

  const handleSelectedWard = (item) => {
    setSelectedWard(item);
  };

  const handleSelectedSubject = (item) => {
    setSelectedSubject(item);
  };

  const ExerciseComponent = ({ Exercise }) => {
    return <Text>{Exercise}</Text>;
  };

  const getWards = () => {
    let Ward = [];
    parentPerformance.map((score) => {
      if (score.parent === user.fullName) Ward = score.ward;
    });
    return Ward;
  };
  const getSubjects = () => {
    let Subjects = [];
    getWards().map((ward) => {
      if (ward.name === selectedWard.name) {
        Subjects = ward.subjects;
      }
    });
    console.log('subject', Subjects);
    return Subjects;
  };
  const getExercises = () => {
    let Exercise = [];
    getSubjects().map((subject) => {
      if (subject.name === selectedSubject.name) {
        Exercise = subject.exercises;
      }
    });
    console.log('Exercises', Exercise);
    return Exercise;
  };

  console.log('selecteSubject:', selectedSubject);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Tutor</Text>
        <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          onItemSelect={handleSelectTutor}
          containerStyle={styles.dropdownContainer}
          textInputStyle={styles.input}
          itemStyle={styles.dropdownItem}
          itemTextStyle={styles.dropdownItemText}
          itemsContainerStyle={styles.dropdownItemsContainer}
          items={uniqueTutors}
          placeholder={selectedTutor ? selectedTutor.name : ''}
          placeholderTextColor="#000"
          resetValue={false}
          underlineColorAndroid="transparent"
          value={selectedTutor ? selectedTutor.name : 'Select tutor'}
          textSearch={true}
        />
      </View>
      <Text style={styles.label}>Ward</Text>
      <SearchableDropdown
        onTextChange={(text) => console.log(text)}
        onItemSelect={handleSelectedWard}
        containerStyle={styles.dropdownContainer}
        textInputStyle={styles.input}
        itemStyle={styles.dropdownItem}
        itemTextStyle={styles.dropdownItemText}
        itemsContainerStyle={styles.dropdownItemsContainer}
        items={getWards().map((ward) => ({
          id: ward.name,
          name: ward.name,
        }))}
        placeholder={selectedWard ? selectedWard.name : ''}
        placeholderTextColor="#000"
        resetValue={false}
        textSearch={true}
        underlineColorAndroid="transparent"
        value={selectedWard ? selectedWard.name : ''}
      />

      <Text style={styles.label}>Subject</Text>
      <SearchableDropdown
        onTextChange={(text) => console.log(text)}
        onItemSelect={handleSelectedSubject}
        containerStyle={styles.dropdownContainer}
        textInputStyle={styles.input}
        itemStyle={styles.dropdownItem}
        itemTextStyle={styles.dropdownItemText}
        itemsContainerStyle={styles.dropdownItemsContainer}
        items={getSubjects().map((subject) => ({
          id: subject.name,
          name: subject.name,
        }))}
        placeholder={selectedSubject ? selectedSubject.name : ''}
        placeholderTextColor="#000"
        resetValue={false}
        underlineColorAndroid="transparent"
        value={selectedWard ? selectedWard.name : ''}
        textSearch={true}
      />

      <Text style={styles.label}> Exercises and Tests </Text>
      <View style={styles.exercisesContainer}>
        {getExercises().map((exercise) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PerformanceDetails', {
                  data: exercise,
                  tutor: selectedTutor.name,
                  ward: selectedWard.name,
                  subject: selectedSubject.name,
                });
              }}
            >
              <ExerciseComponent Exercise={exercise.exercise} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  input: {
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#888',
    borderRadius: 5,
    marginBottom: 7,
  },
  dropdownItem: {
    padding: 3,
    marginTop: 2,
    backgroundColor: '#ddd',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
  },
  dropdownItemText: {
    color: '#222',
  },
  dropdownItemsContainer: {
    maxHeight: 140,
  },
  subjectExerciseContainer: {
    flexDirection: 'row',
    gap: 7,
  },
  subjectContainer: {
    width: '49%',
  },
  exercisesContainer: {
    paddingHorizontal: 5,
  },

  scoresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  imagePicker: {
    width: '100%',
    height: 350,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  selectImgText: {
    fontSize: 16,
    color: '#888',
  },
  submitBtn: {
    backgroundColor: '#3944bc',
    borderRadius: 5, // You can add other styles as needed
    paddingVertical: 10, // Adjust the padding as needed
    textAlign: 'center', // Center the text horizontally
  },
  submitBtnText: {
    color: '#ffffff', // Text color
    textAlign: 'center', // Center the text horizontally
    fontSize: 18, // Adjust the font size as needed
    fontWeight: 'normal', // Adjust the font weight as needed
  },
});

export default ParentPerformance;
