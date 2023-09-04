import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function RequestItem({ parent, location, distance, students }) {
  return (
    <View style={styles.principalContainer}>
      <View style={styles.parentLocDistanceContainer}>
        <Text style={styles.parentText}>{parent} </Text>
        <Text style={styles.locationDistanceText}>
          {location + ' '}
          {distance}
        </Text>
      </View>
      <View style={styles.studentsDetailsContainer}>
        <Text style={styles.studentsQtyClassTexts}>
          {students.length < 2
            ? students.length + ' student'
            : students.length + ' students'}{' '}
          {students.length < 2
            ? '(' + students[0].class + ')'
            : '(' + students[0].class + ', ' + students[1].class + ')'}
        </Text>
      </View>
      <View style={styles.dateContainer}>
        <TouchableOpacity>
          <Text style={styles.dateText}>details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  principalContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 10,
    marginVertical: 5,
    padding: 7,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#ccc',
    borderRadius: 5,
  },

  parentLocDistanceContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  parentText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  locationDistanceText: {
    alignSelf: 'flex-end',
  },
  studentsDetailsContainer: {},
  dateContainer: {
    flex: 0.23,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  studentsQtyClassTexts: {
    fontSize: 17,
    fontWeight: 'normal',
    margin:0
  },
  pharmacyText: {
    fontSize: 16,
    color: '#000',
  },
});

export default RequestItem;
