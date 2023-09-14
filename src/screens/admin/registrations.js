
import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TextInput,
} from 'react-native';
import AdminTutorComponent from '../../components/admin-tutor-component';
import { useNavigation } from '@react-navigation/native';

const Registrations = () => {
  const navigation = useNavigation();
  const tutors = [
    {
      name: 'Samuel Boadu',
      location: 'Bortianor',
      distance:17.2,
      profile: {
        experience: 5,
        contact: '+233 555 788590',
        resume: 'http://localhost/resume',
      },
    },
    {
      name: 'Vivian Baidoo',
      location: 'Sprintex',
      distance:39.3,
      profile: {
        experience: 3,
        contact: '+233 546 789590',
        resume: 'http://localhost/resume',
      },
    },
  ];

  const handlePressDetails = (details) => {
    navigation.navigate(details);
  };

  return (
    <View style={styles.mainContainer}>
      <TextInput placeholder='enter location to filter tutors' style={styles.locationSearch} />
      <FlatList
        data={tutors}
        renderItem={({ item }) => {
          return (
           
              <AdminTutorComponent
                name={item.name}
                profile={item.profile}
                location={item.location}
                distance={item.distance}
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
  locationSearch:{
    borderStyle:'solid',
    borderWidth:1,
    borderColor: '#bbb',
    borderRadius:5,
    fontSize:16,
    paddingHorizontal:5,
    marginVertical:5,
  }
});

export default Registrations;
