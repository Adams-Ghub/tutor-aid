import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import profile from '../../assets/profile.png';

export default function TutorComponent({ name, profile, location }) {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.feedbackProfileImage} source={profile} />
      </View>
      <View>
        <View style={styles.nameLastMessageContainer}>
          <Text style={styles.fullNameText}>{name}</Text>
          <Text style={styles.lastMessageText}>{profile.experience}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{profile.contact}</Text>
          <Text style={styles.dateText}>{location}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    marginVertical: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedbackProfileImage: {
    width: 70,
    height: 70,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: '#03C043',
  },
  imageContainer: {
    flex: 0.22,
  },
  nameLastMessageContainer: {
    flex: 0.55,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  dateContainer: {
    flex: 0.23,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  fullNameText: {
    fontSize: 20,
    fontWeight: '600',
  },
  lastMessageText: {
    fontSize: 16,
  },
});
