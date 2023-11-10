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
import { GetRequests, listenToRequestUpdate } from '../../redux/requests/requestsActions';

const TutorRequests = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetRequests());
  }, []);

  useEffect(() => {
    const unsubscribe = dispatch(listenToRequestUpdate());

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, [dispatch]);


  const { requests } = useSelector((state) => state.requests);
  const { user } = useSelector((state) => state.users);
  let filtered= [];
  requests?filtered= requests.filter((request) => request.tutorId === user.id):null;

console.log('Filtered:',filtered)

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
