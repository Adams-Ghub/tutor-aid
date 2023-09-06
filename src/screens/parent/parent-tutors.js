import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import TutorComponent from '../../components/tutor-component';
import { useNavigation } from '@react-navigation/native';

const ParentTutors = () => {
  const navigation = useNavigation();
  const tutors = [
    {
      name: 'John Kingston',
      location: 'Kasoa',
      profile: {
        experience: 2,
        contact: '+233 546 789590',
        resume: 'http://localhost/resume',
      },
    },
    {
      name: 'Vivian Baidoo',
      location: 'Tema',
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
      <FlatList
        data={tutors}
        renderItem={({ item }) => {
          return (
           
              <TutorComponent
                name={item.name}
                profile={item.profile}
                location={item.location}
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
});

export default ParentTutors;
