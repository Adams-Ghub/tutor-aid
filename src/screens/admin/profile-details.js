import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import InfoHeader from '../parent/info-header';
import { RadioButton } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { approval } from '../../redux/users/usersSlice';
import { ApproveTutor, listenToProfileUpdate } from '../../redux/users/usersAction';

function ProfileDetails() {
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

  const route = useRoute();
  const data = route.params.data;

  const [checked, setChecked] = useState(
    data.status === 'declined'
      ? 'first'
      : data.status === 'approved'
      ? 'second'
      : 'third'
  );
  const [status, setStatus] = useState(data.status);
  const dispatch = useDispatch();

  const handleApproval = () => {
    dispatch(approval(payload={id:data.id,status}));
    dispatch(ApproveTutor({id:data.id,status}))
    
  };

  useEffect(() => {
    const unsubscribe = dispatch(listenToProfileUpdate());

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Professional Info</Text>
      <View style={styles.headerContainer}>
        <InfoHeader info={data} distance={tutor.distance} />
      </View>
      <ScrollView
        style={styles.infoContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoItem}>
          <Text style={styles.label}>Education:</Text>
          <Text style={styles.value}>{data.profile.education}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Subjects:</Text>
          <Text style={styles.value}>{data.profile.subjects}</Text>
        </View>

        <View style={styles.profSummarySection}>
          <Text style={styles.label}>Professional Summary:</Text>
          <Text style={styles.value}>{data.profile.profSummary}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Resume link:</Text>
          <Text style={styles.link}>{data.profile.resume}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.label}>Rate per month:</Text>
          <Text style={styles.value}>{'GHS ' + data.profile.rate}</Text>
        </View>
        <View style={styles.radioButtonsContainer}>
          <View style={styles.regularRadioButtonContainer}>
            <RadioButton
              value="first"
              color="#3944bc"
              status={checked === 'first' ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked('first');
                setStatus('declined');
              }}
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
        <View style={styles.noteInputLabelContainer}>
          <Text style={styles.noteLabel}>note:</Text>
          <TextInput
            multiline={true}
            numberOfLines={5} // Optionally, you can set the number of lines to display
            textAlignVertical="top"
            placeholder={'enter notes'}
            style={styles.noteInput}
          />
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity style={styles.requestButton} onPress={handleApproval}>
          <Text style={styles.requestButtonText}>Submit</Text>
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
    flex: 0.8, // Occupy all available vertical space
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
  noteInputLabelContainer: {
    marginBottom: '15%',
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
  noteInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 5,
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
