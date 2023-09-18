import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions } from '@react-navigation/native';
import DrawerItem from '../components/drawer-item';
import Performance from '../screens/parent/parent-performance';
import ParentTutors from '../screens/parent/parent-tutors';
import Profile from '../screens/parent/parent-profile';
import TutorDetails from '../screens/parent/tutor-details';
import RequestForm from '../components/request-form';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../redux/users/usersAction.js';
import {
  Entypo,
  Ionicons ,
  EvilIcons,
  AntDesign,
} from '@expo/vector-icons';
import profileImg from '../../assets/profile.png';

const Stack = createNativeStackNavigator();

const AllTutorSubNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="PTutors"
    >
      <Stack.Screen
        name="PTutors"        
        component={ParentTutors}
      />
      <Stack.Screen
        name="TutorDetails" 
        component={TutorDetails}
      />
      <Stack.Screen
        name="RequestForm"
        component={RequestForm}
      />
    </Stack.Navigator>
  );
};

function ParentNavigation({ navigation }) {
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const { user, loginMsg } = useSelector((state) => state.users);
  const handleLogout = () => {
    dispatch(Logout());
  };

  // useEffect(
  //   () => {
  //     if (loginMsg === '') {
  //       navigation.navigate('Login');
  //     }
  //   },
  //   [loginMsg]
  // );

  const displayName = loginMsg==="fulfilled" ? user.fullName.split(' ') : '';

  return (
    <Drawer.Navigator
      screenOptions={{
        headerLeft: () => {
          return (
            <TouchableOpacity
              style={{ marginLeft: 20 }}
              onPress={() => {
                navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <Entypo name="menu" size={30} color="#000" />
            </TouchableOpacity>
          );
        },
        headerRight: () => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                gap: 4,
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: 120,
              }}
            >
              <Image
                source={profileImg}
                style={{
                  width: 25,
                  height: 25,
                  borderWidth: 1.5,
                  borderColor: '#3944bc',
                  borderRadius: 50,
                }}
              />

              <Text
                style={{
                  padding: 0,
                  fontWeight: '600',
                  fontSize: 14,
                  marginRight: 15,
                  width: 50,
                }}
              >
                {displayName[0]}
              </Text>
              <TouchableOpacity onPress={handleLogout}>
                <AntDesign name="logout" size={16} color="blue" />
              </TouchableOpacity>
            </View>
          );
        },
        headerStyle: {
          backgroundColor: '#ddd',
          height: 70,
          borderBottomWidth: 2,
          borderBottomColor: '#3944bc'
        },
        headerTitleContainerStyle: {
          top: 0, // Adjust the top position to align with the drawer content
        },
        headerStatusBarHeight: 15,
        drawerStyle: {
          backgroundColor: '#3944bc',
          width: '55%',
          paddingTop: '10%',
        },
      }}
    >
      <Drawer.Screen
        name="Tutors"
        component={AllTutorSubNavigation}
        options={{
          drawerLabel: () => {
            return (
              <DrawerItem
                icon={
                  <Ionicons 
                    name="school"
                    style={{}}
                    size={16}
                    color="#fff"
                  />
                }
                title="Tutors"
              />
            );
          },
          drawerItemStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
       <Drawer.Screen
        name="Performance"
        component={Performance}
        options={{
          drawerLabel: () => {
            return (
              <DrawerItem
                icon={
                  <EvilIcons
                    name="chart"
                    style={{}}
                    size={16}
                    color="#fff"
                  />
                }
                title="Performance"
              />
            );
          },
          drawerItemStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: () => {
            return (
              <DrawerItem
                icon={
                  <AntDesign
                    name="user"
                    style={{}}
                    size={16}
                    color="#fff"
                  />
                }
                title="Profile"
              />
            );
          },
          drawerItemStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />
     

      {/* <Drawer.Screen name="AddPrescription" component={AddPrescriptionScreen} /> */}
    </Drawer.Navigator>
  );
}

export default ParentNavigation;
