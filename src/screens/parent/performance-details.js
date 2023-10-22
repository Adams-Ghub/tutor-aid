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
} from '../../redux/performances/performanceActions';
import { useRoute } from '@react-navigation/native';

const PerformanceDetails = () => {
  const [parent, setParent] = useState('');
  const [exercise, setExercise] = useState('');
  const [subject, setSubject] = useState('');
  const [mark, setMark] = useState('');
  const [over, setOver] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const route = useRoute();

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

  const data = route.params;

  //   console.log('performance status:', specificPerformance);

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

  console.log('RouteData:', data);

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{data.ward + "'s "}Performance </Text>
      <View style={styles.labelValueContainer}>
        <Text style={styles.label}>Tutor:</Text>
        <Text style={styles.Value}>{data.tutor}</Text>
      </View>
      <View style={styles.labelValueContainer}>
        <Text style={styles.label}>Subject:</Text>

        <Text style={styles.Value}>{data.subject}</Text>
      </View>
      <View style={styles.labelValueContainer}>
        <Text style={styles.label}>Exercise:</Text>
        <Text style={styles.Value}>{data.data.exercise}</Text>
      </View>
      <View style={styles.labelValueContainer}>
        <Text style={styles.label}>Marks:</Text>
        <Text style={styles.Value}>
          {data.data.mark + ' / ' + data.data.of}
        </Text>
      </View>
      <View style={styles.testImageLabelContainer}>
        <Text style={styles.label}>Test image</Text>
        <View style={styles.imageContainer}>
          <Image style={styles.testImage} source={{ uri: data.data.image }} />
        </View>
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
  labelValueContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  testImageLabelContainer:{

  },

  titleText: {
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: '700',
  },

  testImage: {
    height: '90%',
    width: '100%',
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
    marginTop:'none'
    
  },

  Value: {
    fontSize: 16,
    color: '#444',
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

export default PerformanceDetails;
