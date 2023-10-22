import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Crypto from 'expo-crypto';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { useSelector, useDispatch } from 'react-redux';
import {
  AddPerformance,
  GetPerformances,
  listenToPerformanceChanges
} from '../../redux/performances/performanceActions';


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
    let data;
    if (getWardPerformance(selectedWard).status === true) {
      const performance = getWardPerformance(selectedWard).performance;
      data = {
        id: user.id.slice(0, 11) + selectedItem.id.slice(0, 11),
        tutor: user.fullName,
        tutorId: user.id,
        parent: selectedItem.name,
        parentId: selectedItem.id,
        ward: selectedWard.name,
        wardId: performance.wardId,
        subject,
        exercise,
        mark,
        over,
        image,
        status: true,
      };
    } else {
      data = {
        id: user.id.slice(0, 11) + selectedItem.id.slice(0, 11),
        tutor: user.fullName,
        tutorId: user.id,
        parent: selectedItem.name,
        parentId: selectedItem.id,
        ward: selectedWard.name,
        wardId: Crypto.randomUUID().slice(-10),
        subject,
        exercise,
        mark,
        over,
        image,
        status: false,
      };

      console.log('PerformanceData:', data);

      if (
        selectedItem === '' ||
        selectedWard === '' ||
        mark === '' ||
        over === '' ||
        image === null
      ) {
        Alert.alert('Error', 'all text fields must be filled');
      } else {
        dispatch(AddPerformance(data));
        performanceMsg === 'performance added successfully'
          ? (setExercise(''),
            setImage(''),
            setMark(''),
            setOver(''),
            setSubject(''))
          : null;
        console.log('performanceId:', data.id);
      }
    }
  };
  useEffect(() => {
    dispatch(GetPerformances());
    dispatch(listenToPerformanceChanges());
  }, []);


  const specificPerformance = [];

  if (performance.length > 0 && selectedItem) {
    performance.map((per) => {
      if (per.id === user.id.slice(0, 11) + selectedItem.id.slice(0, 11)) {
        specificPerformance.push(per);
      }
    });
  }

  const getSpecificPerformance = (id) => {
    const specificPerformance = [];
    if (performances.length > 0 && selectedItem) {
      performances.map((per) => {
        if (per.id === id) {
          specificPerformance.push(per);
        }
      });
    }
    return specificPerformance;
  };

  const getWardPerformance = (ward) => {
    const performance = getSpecificPerformance(
      user.id.slice(0, 11) + selectedItem.id.slice(0, 11)
    );
    console.log("getWardPerFuncition:",performance)
    let result;
    if (performance.length === 0) {
      result = { status: false, performance: null };
    } else {
      const theWard = performance[0].ward.filter((child) => child.name === ward);
      theWard.length === 0
        ? (result = { status: false, performance: null })
        : (result = { status: true, performance: theWard });
    }

    return result;
  };

  if(selectedWard){

    console.log('getWardPerformance:', getWardPerformance(selectedWard.name));
  }

 
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
    if (req.tutorId === user.id) {
      parentSelection.push({ id: req.parentId, name: req.parent });
    }

    return req;
  });

  console.log('parents:', parents);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    // const specifics = parents.filter((par) => par.parentId === selectedItem.id&&par.tutorId===user.id);
    // console.log("Wards:",specifics[0].wards)
  };

  const handleSelectedWard = (item) => {
    setSelectedWard(item);
  };

  const getWards = () => {
    let wardSelection = [];
    parents.map((par) => {
      if (par.parentId === selectedItem.id && par.tutorId === user.id) {
        par.wards.forEach((element) => {
          wardSelection.push({ id: element.student, name: element.student });
        });
      }
    });

    return wardSelection;
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
          placeholder={selectedItem ? selectedItem.name : ''}
          placeholderTextColor="#000"
          resetValue={false}
          underlineColorAndroid="transparent"
          value={selectedItem ? selectedItem.name : ''}
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
        placeholderTextColor="#000"
        resetValue={false}
        underlineColorAndroid="transparent"
        value={selectedWard ? selectedWard.name : ''}
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
