import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import InfoHeader from './info-header';

function TutorDetails({navigation}) {
  const tutor = {
    name: 'Samuel Boadu',
    location: 'Kasoa',
    distance: 17.2,
    profile: {
      experience: 5,
      contact: '+233 555 788590',
      resume: 'https://localhost/resume',
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Professional Info</Text>
      <View style={styles.headerContainer}>
        <InfoHeader
          name={tutor.name}
          location={tutor.location}
          profile={tutor.profile}
          distance={tutor.distance}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Education:</Text>
          <Text style={styles.value}>BEd. Basic Education</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Subjects:</Text>
          <Text style={styles.value}>English, Maths, Science</Text>
        </View>

        <View style={styles.profSummarySection}>
          <Text style={styles.label}>Professional Summary:</Text>
          <Text style={styles.value}>
            A passionate tutor with over five years of experience teaching basic
            school children
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Resume link:</Text>
          <Text style={styles.link}>https://localhost/resume</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Rate per month:</Text>
          <Text style={styles.value}>GHS 300</Text>
        </View>

        <TouchableOpacity style={styles.requestButton} onPress={()=>navigation.navigate('RequestForm')} >
          <Text style={styles.requestButtonText}>Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    elevation: 3,
    flex: 1, // Occupy all available vertical space
  },
  infoItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    marginBottom: 18,
    width: '100%',
  },
  profSummarySection: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginTop:18,
    marginBottom: 10,
   
  },
  headerContainer: {
  
    shadowColor: '#000',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius:10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    borderStyle:'solid',
    borderBottomWidth: 1,
    borderBlockColor: '#333333',
    width:'100%'
  },
  value: {
    fontSize: 16,
    alignSelf:'flex-start'
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  requestButton: {
    backgroundColor: '#3944bc',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 5,
    marginTop: 10, // Reduce the spacing between the button and the previous item
    alignSelf: 'flex-start', // Align the button to the left
    width: '25%', // Reduce the width of the button
    alignSelf:'center', // Align the button to the
  },
  requestButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'normal',
  },
});

export default TutorDetails;
