import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { AcceptRequest } from '../../redux/requests/requestsActions';
import { acceptReqUpdate } from '../../redux/requests/requestsSlice';

function RequestDetails() {
  const data = useRoute().params.data;
  const dispatch = useDispatch();

  const [notes, setNotes] = useState(data.info.notes);
  const [status, setStatus] = useState(data.info.status);

  const handleAccept = () => {
    setStatus('accepted');
    const datum ={ id: data.info.id, status }
    dispatch(AcceptRequest(datum));
    dispatch(acceptReqUpdate(payload={ id: data.info.id, status }));
     
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Parent Request Details</Text>
      <View style={styles.infoContainer}>
        {status === 'accepted' ? (
          <Text style={[styles.accepted, styles.status]}>{status}</Text>
        ) : status === 'declined' ? (
          <Text style={[styles.declined, styles.status]}>{status}</Text>
        ) : (
          <Text style={[styles.pending, styles.status]}>{status}</Text>
        )}
        <View style={styles.labelInputContainer}>
          <Text style={styles.label}>Parent:</Text>
          <Text style={styles.text}>{data.info.parent}</Text>
        </View>
        <View style={styles.labelInputContainer}>
          <Text style={styles.label}>Contact:</Text>
          <Text style={styles.text}>{data.info.phone}</Text>
        </View>
        <View style={styles.labelInputContainer}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.text}>{data.info.location}</Text>
        </View>
        <View style={styles.labelInputContainer}>
          <Text style={styles.label}>Distance:</Text>
          <Text style={styles.text}>{data.distance + ' km'}</Text>
        </View>

        {data.info.wards.map((student, index) => {
          return (
            <View style={styles.wardInfoContainer}>
              <View style={styles.wardLabelInputContainer}>
                <Text style={styles.label}>Ward {index + 1}:</Text>
                <Text style={styles.text}>{student.student}</Text>
              </View>
              <View style={styles.classLabelInputContainer}>
                <Text style={styles.label}>Class:</Text>
                <Text style={styles.text}>{student.class}</Text>
              </View>
            </View>
          );
        })}

        <View style={styles.labelNoteInputContainer}>
          <Text style={styles.label}>Notes:</Text>
          <TextInput
            style={styles.noteInput}
            placeholder="Important notes"
            value={notes}
            onChangeText={(text) => setNotes(text)}
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.acceptDeclineBtnsContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleAccept}>
            <Text style={styles.submitButtonText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Decline</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'column',
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
    flex: 1,
  },
  status: {
    alignSelf: 'flex-end',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pending: {
    color: 'orange',
  },
  accepted: {
    color: 'green',
  },
  declined: {
    color: 'red',
  },
  labelInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  wardLabelInputContainer: {
    marginBottom: 12,
  },
  classLabelInputContainer: {
    marginBottom: 12,
  },
  labelNoteInputContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 17,
  },
  acceptDeclineBtnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteInput: {
    fontSize: 16,
    padding: 4,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#333',
    marginVertical: 10,
    textAlign: 'justify',
  },
  submitButton: {
    backgroundColor: '#3944bc',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 10,
    width: '48%',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'normal',
  },
  wardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});

export default RequestDetails;
