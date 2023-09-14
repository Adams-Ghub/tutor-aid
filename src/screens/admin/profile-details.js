import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import InfoHeader from '../parent/info-header';
import { RadioButton } from 'react-native-paper';

function ProfileDetails({ navigation }) {
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

  const [checked, setChecked] = useState('first');
  const [status, setStatus] = useState('review');

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
        <View style={styles.radioButtonsContainer}>
          <View style={styles.regularRadioButtonContainer}>
            <RadioButton
              value="first"
              color="#3944bc"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('first')}
            />
            <Text>declined</Text>
          </View>
          <View style={styles.pharmacistRadioButtonContainer}>
            <RadioButton
              value="second"
              color="#3944bc"
              status={checked === 'second' ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked('second');
                setStatus('approved');
              }}
            />
            <Text>approved</Text>
          </View>
          <View style={styles.pharmacistRadioButtonContainer}>
            <RadioButton
              value="third"
              color="#3944bc"
              status={checked === 'third' ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked('third');
                setStatus('pending');
              }}
            />
            <Text>pending</Text>
          </View>
        </View>
        <View>
          <Text style={styles.noteLabel}>note:</Text>
          <TextInput
            multiline={true}
            numberOfLines={5} // Optionally, you can set the number of lines to display
            textAlignVertical="top"
            placeholder={'enter notes'}
            style={styles.noteInput}
          />
        </View>
        <View>
          <TouchableOpacity
            style={styles.requestButton}
            onPress={() => navigation.navigate('RequestForm')}
          >
            <Text style={styles.requestButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
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
  radioButtonsContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    // marginBottom: 20,
  },
  regularRadioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pharmacistRadioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    marginTop: 18,
    marginBottom: 10,
  },
  headerContainer: {
    shadowColor: '#000',
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBlockColor: '#333333',
    width: '100%',
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '100%',
  },
  noteInput:{
borderStyle:'solid',
borderWidth:1,
borderColor:'#ddd',
padding:5
  },
  value: {
    fontSize: 16,
    alignSelf: 'flex-start',
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
    width: '100%', // Reduce the width of the button
    alignSelf: 'center', // Align the button to the
  },
  requestButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'normal',
  },
});

export default ProfileDetails;
