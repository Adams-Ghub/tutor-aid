import React, { useEffect, useState } from 'react';
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
import * as Crypto from 'expo-crypto';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import { AddPerformance } from '../../redux/performances/performanceActions';

const TutorPerformance = () => {
  const [parent, setParent] = useState('');
  const [exercise, setExercise] = useState('');
  const [subject, setSubject] = useState('');
  const [mark, setMark] = useState('');
  const [over, setOver] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const { requests } = useSelector((state) => state.requests);
  const { user } = useSelector((state) => state.users);
  const { performances, performanceMsg } = useSelector(
    (state) => state.performances
  );

  const handleSubmit = () => {
    const data = {
      id: Crypto.randomUUID().slice(-12),
      tutor: user.fullName,
      tutorId: user.id,
      parent: selectedItem.parent,
      parentId: selectedItem.id,
      ward: selectedWard.student,
      wardId: Crypto.randomUUID().slice(-10),
      subject,
      exercise,
      mark,
      over,
      image,
    };

    console.log('ward:',selectedWard)

    if (
      selectedItem === '' ||
      selectedWard === '' ||
      mark === '' ||
      over === '' ||
      image === null
    ) {
      alert('all text fields must be filled');
    } else {
      dispatch(AddPerformance(data));
      performanceMsg === 'performance added successfully'
        ? (setExercise(''), setImage(''), setMark(''), setOver(''),setSubject(''))
        : null;
    }
  };

  useEffect(() => {}, [performanceMsg]);

  console.log('performance status:', performanceMsg);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log('image', result.assets[0].uri);
    }
  };

  let parentSelection = [];
  const parents = requests.filter((req) => {
    if (req.tutorId === user.id)
      parentSelection.push({ parent: req.parent, id: req.parentId });
    return req;
  });

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleSelectedWard = (item) => {
    setSelectedWard(item);
  };

  const getWards = () => {
    let Ward = [];
    parents.map((par) => {
      if (par.parent === selectedItem.parent) Ward = par.wards;
    });
    console.log(Ward);
    return Ward;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>Add performance form</Text>
      <View>
        <Text style={styles.label}>Parent</Text>
        <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          onItemSelect={handleSelectItem}
          containerStyle={styles.dropdownContainer}
          textInputStyle={styles.input}
          itemStyle={styles.dropdownItem}
          itemTextStyle={styles.dropdownItemText}
          itemsContainerStyle={styles.dropdownItemsContainer}
          items={parentSelection}
          placeholder={selectedItem ? selectedItem.parent : ''}
          placeholderTextColor="#000"
          resetValue={false}
          underlineColorAndroid="transparent"
          value={selectedItem ? selectedItem.parent : ''}
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
        placeholder={selectedWard ? selectedWard.student : ''}
        placeholderTextColor="#000"
        resetValue={false}
        underlineColorAndroid="transparent"
        value={selectedWard ? selectedWard.student : ''}
      />
      <View style={styles.subjectExerciseContainer}>
        <View style={styles.subjectContainer}>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={styles.input}
            placeholder="Eg. English"
            onChangeText={(text) => setSubject(text)}
            value={subject}
            required={true}
          />
        </View>
        <View style={styles.exerciseContainer}>
          <Text style={styles.label}>Exercise</Text>
          <TextInput
            style={styles.input}
            placeholder="Eg. Exercise one"
            onChangeText={(text) => setExercise(text)}
            value={exercise}
            require
          />
        </View>
      </View>
      <Text style={styles.label}>Score</Text>
      <View style={styles.scoresContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setMark(text)}
          value={mark}
          multiline={true}
        />
        <Text> out of </Text>
        <TextInput
          style={styles.input}
          value={over}
          onChangeText={(text) => setOver(text)}
        />
      </View>
      <Text style={styles.label}> Picture of exercise or test</Text>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
          {image ? (
            image && <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <Text style={styles.selectImgText}>Select an image</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
        <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
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
  titleText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
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
  exerciseContainer: {
    width: '49%',
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

export default TutorPerformance;
