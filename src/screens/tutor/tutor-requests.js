import React from 'react';
import { View, FlatList, StyleSheet,Text,ScrollView, TouchableOpacity } from 'react-native';
import RequestItem from '../../components/request-item';

const TutorRequests = () => {
  const requests = [
    {
      id: 1,
      parent: 'Ronney Owusu Yeboah',
      location: 'Kasoa',
      long: '2222',
      lat: '3333',
      distance:'17.2',
      wards: [
        { student: 'John Owusu Yeboah', class: 'Basic 2' },
        { student: 'Clara Owusu Yeboah', class: 'Basic 5' },
      ],
    },
    {
      id: 2,
      parent: 'Johnson Oduro',
      location: 'Sprintex',
      long: '2222',
      lat: '3333',
      distance:'39.2',
      wards: [
        { student: 'Peter Oduro', class: 'Basic 2' },
       
      ],
    },
    {
      id: 3,
      parent: 'Stella Oppong',
      location: 'Kasoa',
      long: '2222',
      lat: '3333',
      distance:'15.6',
      wards: [
        { student: 'Abigail Oppong', class: 'Basic 4' },
        { student: 'Carl Oppong', class: 'Basic 2' },
        { student: 'Samuel Oppong', class: 'Basic 7' },
      ],
    },
  ];

  return (
    <View style={styles.mainContainer} >
      <Text style={styles.heading}>List of Requests</Text>
      <FlatList
        data={requests}
        renderItem={({ item }) => {
          return (
            <RequestItem
              parent={item.parent}
              students={item.wards}
              location={item.location}
              distance={item.distance}
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
    alignItems:'center',
    // width: '90%',  
    // backgroundColor: '#222', 
  },
  heading:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:8,

  }
})

export default TutorRequests;
