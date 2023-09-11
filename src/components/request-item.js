import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function RequestItem({ parent, location, distance, students }) {
  return (
    <View style={styles.principalContainer}>
      <View style={styles.parentLocDistanceContainer}>
        <Text style={styles.parentText}>{parent} </Text>
        <Text style={styles.locationDistanceText}>{location + ' '}</Text>
        <Text style={styles.locationDistanceText}>{distance+' km'}</Text>
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
          <Text style={styles.detailsText}>details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  principalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
    padding: 5,
    width: '100%',
  },

  parentLocDistanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  parentText: {
    fontSize: 22,
    fontWeight: 'bold',
    width:250,
    marginRight: '2%',
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
    margin: 0,
  },
  pharmacyText: {
    fontSize: 16,
    color: '#000',
  },
  detailsText:{
    color:'#3944bc',
    fontSize: 16,
    fontWeight:'600'
  }
});

export default RequestItem;
