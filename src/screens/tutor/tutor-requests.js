import React from 'react';
import { View, FlatList, StyleSheet,Text,ScrollView, TouchableOpacity } from 'react-native';
import RequestItem from '../../components/request-item';

const TutorRequests = () => {
  const requests = [
    {
      id: 1,
      parent: 'Stephen Appiah',
      location: 'Kasoa',
      long: '2222',
      lat: '3333',
      wards: [
        { student: 'John Doe', class: 'B2' },
        { student: 'Clara Doe', class: 'B5' },
      ],
    },
    {
      id: 2,
      parent: 'Johnson Oduro',
      location: 'Sprintex',
      long: '2222',
      lat: '3333',
      wards: [
        { student: 'Peter Oduro', class: 'B2' },
       
      ],
    },
    {
      id: 3,
      parent: 'Stella Oppong',
      location: 'Kasoa',
      long: '2222',
      lat: '3333',
      wards: [
        { student: 'Abigail Oppong', class: 'B4' },
        { student: 'Carl Oppong', class: 'B2' },
        { student: 'Samuel Oppong', class: 'B7' },
      ],
    },
  ];

  return (
    <View style={styles.mainContainer} >
      <FlatList
        data={requests}
        renderItem={({ item }) => {
          return (
            <RequestItem
              parent={item.parent}
              students={item.wards}
              location={item.location}
              distance={'20km'}
            />
          );
        }}
      />
    </View>
  );
};

const styles=StyleSheet.create({
  mainContainer:{
    flex: 1,
    flexDirection: 'column',
    marginVertical: 10,
    marginHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    
  }
})

export default TutorRequests;
