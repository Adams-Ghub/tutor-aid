import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useSelector, useDispatch } from 'react-redux';
import { GetAllUsers } from '../redux/users/usersAction';
import { calculateDistance } from './distance-calculator';

function RequestItem({ info, distance }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(GetAllUsers());
    },
    []);

  const { user, allUsers } = useSelector((state) => state.users);
  
  const parent = allUsers.filter(user=>user.id===info.parentId)
 
  return (
    <View style={styles.principalContainer}>
      <View style={styles.parentLocDistanceContainer}>
        <Text style={styles.parentText}>{info.parent} </Text>
        <View style={styles.locationDistanceContainer}>
          <Text style={styles.locationDistanceText}>{info.location + ' '}</Text>
          <Text style={styles.locationDistanceText}>
            {calculateDistance(user.lat, user.long, parent[0].lat,parent[0].long) +
              ' km'}
          </Text>
        </View>
      </View>
      <View style={styles.studentsDetailsContainer}>
        <Text style={styles.studentsQtyClassTexts}>
          {info.wards.length < 2
            ? info.wards.length + ' student'
            : info.wards.length + ' students'}{' '}
          {info.wards.length < 2
            ? '(' + info.wards[0].class + ')'
            : '(' + info.wards[0].class + ', ' + info.wards[1].class + ')'}
        </Text>
      </View>
      <View style={styles.dateStatusContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('details', { data: { info, distance:calculateDistance(user.lat, user.long, parent[0].lat,parent[0].long) } })
          }
        >
          <Text style={styles.detailsText}>details</Text>
        </TouchableOpacity>
        {info.status === 'accepted' ? (
          <Text style={[styles.accepted, styles.status]}>{info.status}</Text>
        ) : info.status === 'declined' ? (
          <Text style={[styles.declined, styles.status]}>{info.status}</Text>
        ) : (
          <Text style={[styles.pending, styles.status]}>{info.status}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  principalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    padding: 5,
  },

  parentLocDistanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  locationDistanceContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },

  status: {
    alignSelf: 'flex-end',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pending: {
    color: 'orange',
  },
  accepted: {
    color: 'green',
  },
  declined: {
    color: 'red',
  },

  parentText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  locationDistanceText: {
    alignSelf: 'flex-end',
  },
  studentsDetailsContainer: {
    alignSelf: 'flex-start',
  },
  dateStatusContainer: {
    flex: 0.23,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  studentsQtyClassTexts: {
    fontSize: 17,
    fontWeight: 'normal',
    margin: 0,
  },
  pharmacyText: {
    fontSize: 16,
    color: '#000',
  },
  detailsText: {
    color: '#3944bc',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RequestItem;
