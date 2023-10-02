import React, { useState, useEffect } from 'react';
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
import { listenToRequestUpdate } from '../../redux/requests/requestsActions';
import {GetAllUsers} from '../../redux/users/usersAction';

function ParentRequestDetails() {
  const data = useRoute().params.data;
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(GetAllUsers())
  },[])

  const [notes, setNotes] = useState(data.info.notes);
  const [status, setStatus] = useState(data.info.status);

  const {allUsers}=useSelector(state=>state.users)

  const tutor = allUsers.filter(tutor=>tutor.id===data.info.tutorId);

  useEffect(() => {
    const unsubscribe = dispatch(listenToRequestUpdate());
    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, [dispatch]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Request Details</Text>
      <View style={styles.infoContainer}>
        {status === 'accepted' ? (
          <Text style={[styles.accepted, styles.status]}>{status}</Text>
        ) : status === 'declined' ? (
          <Text style={[styles.declined, styles.status]}>{status}</Text>
        ) : (
          <Text style={[styles.pending, styles.status]}>{status}</Text>
        )}
        <View style={styles.labelInputContainer}>
          <Text style={styles.label}>Tutor:</Text>
          <Text style={styles.text}>{data.info.tutor}</Text>
        </View>
        <View style={styles.labelInputContainer}>
          <Text style={styles.label}>Contact:</Text>
          <Text style={styles.text}>{tutor[0].phone}</Text>
        </View>
        <View style={styles.labelInputContainer}>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.text}>{tutor[0].location}</Text>
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

export default ParentRequestDetails;
