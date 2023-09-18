import React from 'react';
import { View, Text, TouchableOpacity, Image,StyleSheet } from 'react-native';
import profileImage from '../../../assets/profile.png';

function InfoHeader({info,distance}) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.feedbackProfileImage} source={profileImage} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.nameExperienceContainer}>
          <Text style={styles.fullNameText}>{info.fullName}</Text>
          <Text style={styles.experienceText}>{info.profile.experience} yrs</Text>
        </View>
        <View style={styles.contactLocationContainer}>
          <Text style={styles.contactText}>{info.phone}</Text>
          <Text style={styles.locationText}>{info.location}{" "+distance+"km"}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    
  
  },
  feedbackProfileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#3944bc',
  },
  imageContainer: {
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  nameExperienceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fullNameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  experienceText: {
    fontSize: 16,
    color: '#555',
  },
  contactLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#777',
  },
  locationText: {
    fontSize: 14,
    color: '#777',
  },
  detailsLinkText: {
    fontSize: 16,
    color: '#007AFF',
    alignSelf: 'flex-end',
    fontWeight: '600',
    marginTop: 8,
  },
});

export default InfoHeader;
