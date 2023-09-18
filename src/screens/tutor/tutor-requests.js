import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import RequestItem from '../../components/request-item';
import { useDispatch, useSelector } from 'react-redux';
import { GetRequests } from '../../redux/requests/requestsActions';

const TutorRequests = () => {
  const Requests = [
    {
      id: 1,
      parent: 'Ronney Owusu Yeboah',
      location: 'Kasoa',
      long: '2222',
      lat: '3333',
      distance: '17.2',
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
      distance: '39.2',
      wards: [{ student: 'Peter Oduro', class: 'Basic 2' }],
    },
    {
      id: 3,
      parent: 'Stella Oppong',
      location: 'Kasoa',
      long: '2222',
      lat: '3333',
      distance: '15.6',
      wards: [
        { student: 'Abigail Oppong', class: 'Basic 4' },
        { student: 'Carl Oppong', class: 'Basic 2' },
        { student: 'Samuel Oppong', class: 'Basic 7' },
      ],
    },
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetRequests());
  }, [requests]);

  const { requests } = useSelector((state) => state.requests);
  const { user } = useSelector((state) => state.users);
  let filtered= [];
  requests?filtered= requests.filter((request) => request.tutorId === user.id):null;



  return (
    <View style={styles.mainContainer}>
      <Text style={styles.heading}>List of Requests</Text>
      {filtered.length === 0 ? (
        <Text style={styles.msg}>No request available!!</Text>
      ) : (
        <FlatList
          data={filtered}
          renderItem={({ item }) => {
            return <RequestItem info={item} distance={20} />;
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 10,
    marginHorizontal: 20,
    justifyContent: 'flex-start',
    alignItems: 'stretch',

    // width: '90%',
    // backgroundColor: '#222',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf:'center',
    marginBottom: 8,
  },
  msg: {
    fontSize: 16,
    alignSelf:'center'
  },
});

export default TutorRequests;
