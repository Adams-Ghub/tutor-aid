import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import profileImage from '../../assets/profile.png';
import { useNavigation } from '@react-navigation/native';

const AdminTutorComponent = ({ info, distance }) => {

  const navigation = useNavigation();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.feedbackProfileImage} source={profileImage} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.nameExperienceContainer}>
          <Text style={styles.fullNameText}>{info.fullName}</Text>
          <Text style={styles.experienceText}>
            {info.profile.experience} yrs
          </Text>
        </View>
        <View style={styles.contactLocationContainer}>
          <Text style={styles.contactText}>{info.phone}</Text>
          <View style={styles.locationDistanceContainer}>
            <Text style={styles.locationText}>{info.location}</Text>
            <Text style={styles.locationText}>{distance + 'km'}</Text>
          </View>
        </View>
        <View style={styles.statusDetailsBtnContainer}>
          {info.status === 'approved' ? (
            <Text style={styles.approved}>{info.status}</Text>
          ) : info.status === 'declined' ? (
            <Text style={styles.declined}>{info.status}</Text>
          ) : (
            <Text style={styles.pending}>{info.status}</Text>
          )}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProfileDetails', { data: info })
            }
          >
            <Text style={styles.detailsLinkText}>details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
  pending: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'orange',
  },
  approved: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'green',
  },
  declined: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'red',
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
  statusDetailsBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
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
    color: '#3944bc',
    alignSelf: 'flex-end',
    fontWeight: '600',
    marginTop: 8,
  },
  locationDistanceContainer: {
    flexDirection: 'row',
    gap: 4,
  },
});

export default AdminTutorComponent;
