import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import TutorComponent from '../../components/tutor-component';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
  GetAllUsers,
  listenToProfileUpdate,
} from '../../redux/users/usersAction';

const ParentTutors = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllUsers());
  }, [allUsers]);

  useEffect(() => {
    const unsubscribe = dispatch(listenToProfileUpdate());

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, [dispatch]);

  const { allUsers } = useSelector((state) => state.users);

  const [location, setLocation] = useState('');

  const approvedTutors = allUsers.filter(
    (tutor) =>
      tutor.status === 'approved' &&
      tutor.location.toLowerCase().includes(location)
  );

  const handlePressDetails = (details) => {
    navigation.navigate(details.link, details.data);
  };

  return (
    <View style={styles.mainContainer}>
      <TextInput
        placeholder="enter location to filter tutors"
        style={styles.locationSearch}
        onChangeText={(text) => setLocation(text.toLowerCase())}
      />
      <FlatList
        data={approvedTutors}
        renderItem={({ item }) => {
          return (
            <TutorComponent
              info={item}
              distance={'20'}
              onPressDetails={handlePressDetails}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  locationSearch: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 5,
    fontSize: 16,
    paddingHorizontal: 5,
    marginVertical: 5,
  },
});

export default ParentTutors;
