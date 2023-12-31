import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { useSelector } from 'react-redux';

function ParentRequestItem({ info, distance }) {
  const navigation = useNavigation();
  const { allUsers } = useSelector((state) => state.users);

  const returnTutorLocation = (id) => {
    const selected = allUsers.filter((user) => user.id === id);
    return selected[0].location;
  };

  return (
    <View style={styles.principalContainer}>
      <View style={styles.parentLocDistanceContainer}>
        <Text style={styles.parentText}>{info.tutor} </Text>
        <View style={styles.locationDistanceContainer}>
          <Text style={styles.locationDistanceText}>
            {returnTutorLocation(info.tutorId) + ' '}
          </Text>
          <Text style={styles.locationDistanceText}>{distance + ' km'}</Text>
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
            navigation.navigate('PRequestDetails', { data: { info, distance } })
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

export default ParentRequestItem;
