


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import InfoHeader from './info-header';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { calculateDistance } from '../../components/distance-calculator';
import { Linking } from 'expo';

const TutorDetails = ({ navigation }) => {
  const tutor = {
    fullName: 'Samuel Boadu',
    location: 'Kasoa',
    distance: 17.2,
    profile: {
      experience: 5,
      phone: '+233 555 788590',
      resume: 'https://localhost/resume',
    },
  };

  const info = useRoute().params.info;
  const { user } = useSelector((state) => state.users);

  const openResumeLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.error('Cannot open URL: ' + url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Professional Info</Text>
      <View style={styles.headerContainer}>
        <InfoHeader
          info={info}
          distance={calculateDistance(user.lat, user.long, info.lat, info.long)}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Education:</Text>
          <Text style={styles.value}>{info.profile.education}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Subjects:</Text>
          <Text style={styles.value}>{info.profile.subjects}</Text>
        </View>

        <View style={styles.profSummarySection}>
          <Text style={styles.label}>Professional Summary:</Text>
          <Text style={styles.value}>{info.profile.profSummary}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Resume link:</Text>
          <TouchableOpacity onPress={() => { openResumeLink(info.profile.resume) }}>
            <Text style={styles.link}>Resume Link</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Rate per month:</Text>
          <Text style={styles.value}>{'GHS ' + info.profile.rate}</Text>
        </View>

        <TouchableOpacity
          style={styles.requestButton}
          onPress={() =>
            navigation.navigate('RequestForm', {
              data: { id: info.id, name: info.fullName },
            })
          }
        >
          <Text style={styles.requestButtonText}>Request</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const { width, height } = Dimensions.get('window');

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
  },
  infoItem: {
    marginBottom: 18,
  },
  profSummarySection: {
    marginTop: 18,
    marginBottom: 10,
  },
  headerContainer: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
  },
  value: {
    fontSize: 16,
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
    marginTop: 10,
    width: width * 0.25,
    alignSelf: 'center',
  },
  requestButtonText: {
    color: 'white',
    fontSize: 15,
  },
});

export default TutorDetails;
