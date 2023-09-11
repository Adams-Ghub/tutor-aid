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

const ParentPerformance = () => {
  const [tutor, setTutor] = useState('');
  const [subject, setSubject] = useState('');
  const [exerciseDuration, setExerciseDuration] = useState('');
  const [exerciseFrequency, setExerciseFrequency] = useState('');
  const [exerciseDescription, setExerciseDescription] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedTutor, setSelectedTutor]=useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    // Here, you can send the form data to your desired destination or store it in state.
    // You can use the state variables (Parent, exerciseDuration, etc.) to store the form data.
    // Implement your logic to save or process the data as needed.
    console.log('Form submitted:', {
      parent,
      exerciseDuration,
      exerciseFrequency,
      exerciseDescription,
    });
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // const parents = [
  //   {
  //     name: 'John Kinsgton',
  //     ward: [{ name: 'Ama Kingston' }, { name: 'Kofi Kignston' }],
  //   },
  //   {
  //     name: 'John Appiah',
  //     ward: [{ name: 'Ama Appiah' }, { name: 'Kofi Appiah' }],
  //   },
  // ];
  const scores = [
    {
      tutor: 'Samuel Boadu',
      parent: 'Ronney Owusu Yeboah',
      ward: [
        {
          name: 'John Owusu Yeboah',
          subjects: [
            {
              name: 'Maths',
              exercises: [
                { number: 1, score: '10/10', image: 'url' },
                { number: 2, score: '10/10', image: 'url' },
              ],
            },
          ],
        },
        {
          name: 'Clara Owusu Yeboah',
          subjects: [
            {
              name: 'Maths',
              exercises: [
                { number: 1, score: '10/10', image: 'url' },
                { number: 2, score: '10/10', image: 'url' },
              ],
            },
            {
              name: 'Science',
              exercises: [
                { number: 1, score: '7/10', image: 'url' },
                { number: 2, score: '9/10', image: 'url' },
              ],
            },
          ],
        },
      ],
    },
    {
      tutor: 'Vivian Baidoo',
      name: 'John Appiah',
      ward: [
        {
          name: 'Ama Appiah',
          subjects: [
            {
              name: 'English',
              exercises: [
                { number: 1, score: '10/10', image: 'url' },
                { number: 2, score: '10/10', image: 'url' },
              ],
            },
          ],
        },
        {
          name: 'Kofi Appiah',
          subjects: [
            {
              name: 'English',
              exercises: [
                { number: 1, score: '10/10', image: 'url' },
                { number: 2, score: '10/10', image: 'url' },
              ],
            },
          ],
        },
      ],
    },
  ];

  const handleSelectTutor = (item) => {
    setSelectedTutor(item);
  };

  const handleSelectedWard = (item) => {
    setSelectedWard(item);
  };

  const handleSelectedSubject = (item) => {
    setSelectedSubject(item);
  };

const ExerciseComponent=({Exercise})=>{
  return(
    <Text>Exercise {Exercise}</Text>
  )
}

  const getWards = () => {
    let Ward = [];
    scores.map((score) => {
      if (score.parent === "Ronney Owusu Yeboah") Ward = score.ward;
    });
    return Ward;
  };
  const getSubjects = () => {
    let Subjects = [];
    getWards().map((ward) => {      
      if (ward.name === selectedWard.name) {Subjects = ward.subjects};
    });
  console.log('ward', getWards())
    return Subjects;
  };
  const getExercises = () => {
    let  Exercise= [];
    getSubjects().map((subject) => {      
      if (subject.name === selectedSubject.name) {Exercise = subject.exercises};
    });
  console.log('Exercises', Exercise);
    return Exercise;
  };

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
          items={scores}
          placeholder={selectedTutor? selectedTutor.tutor : ''}
          placeholderTextColor="#888"
          resetValue={false}
          underlineColorAndroid="transparent"
          value={selectedTutor ? selectedTutor.tutor : ''}
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
        items={getWards()}
        placeholder={selectedWard ? selectedWard.name : ''}
        placeholderTextColor="#888"
        resetValue={false}
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
        items={getSubjects()}
        placeholder={selectedSubject ? selectedSubject.name : ''}
        placeholderTextColor="#888"
        resetValue={false}
        underlineColorAndroid="transparent"
        value={selectedWard ? selectedWard.name : ''}
      />

      {/* <View style={styles.subjectContainer}>
        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Eg. English"
          onChangeText={(text) => setExerciseFrequency(text)}
          value={exerciseFrequency}
        />
      </View> */}

      <Text style={styles.label}> Exercises and Tests </Text>
      <View style={styles.exercisesContainer}>
        {
          getExercises().map(exercise=>{
            return(
              <TouchableOpacity>
                <ExerciseComponent Exercise={exercise.number}/>
              </TouchableOpacity>
            )
          })
        }
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
