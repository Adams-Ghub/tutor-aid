import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function DetailsComponent({ name, profile, ratings, location, distance }) {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.nameText}>Name: {name}</Text>
      <Text style={styles.educationText}>Education: {profile.education}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.experienceText}>Experience: {profile.experience}</Text>
        <Text style={styles.ratingsText}>Ratings: {ratings}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.locationText}>Location: {location}</Text>
        <Text style={styles.distanceText}>Distance: {distance}</Text>
      </View>
      <View style={styles.resumeContainer}>
        <Text style={styles.resumeLinkText}>Resume Link</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.requestButtonText}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '100%',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  educationText: {
    fontSize: 16,
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  experienceText: {
    fontSize: 16,
    flex: 1, // Adjust flex as needed
    marginRight: 10, // Add margin as needed
  },
  ratingsText: {
    fontSize: 16,
    flex: 1, // Adjust flex as needed
    marginLeft: 10, // Add margin as needed
  },
  locationText: {
    fontSize: 16,
    flex: 1, // Adjust flex as needed
    marginRight: 10, // Add margin as needed
  },
  distanceText: {
    fontSize: 16,
    flex: 1, // Adjust flex as needed
    marginLeft: 10, // Add margin as needed
  },
  resumeContainer: {
    marginBottom: 10,
  },
  resumeLinkText: {
    fontSize: 16,
    color: 'blue',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 10,
  },
  requestButton: {
    backgroundColor: '#007AFF', // Example background color
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  requestButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default DetailsComponent;
