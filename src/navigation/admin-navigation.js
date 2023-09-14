import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions } from '@react-navigation/native';
import DrawerItem from '../components/drawer-item';
import Profile from '../screens/admin/admin-profile';
import Registrations from '../screens/admin/registrations';
import ProfileDetails from '../screens/admin/profile-details';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../redux/users/usersAction.js';
import { Entypo, AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';
import profileImg from '../../assets/profile.png';


const Stack = createNativeStackNavigator();
const RegistrationNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}
      initialRouteName="AdminRegistrations"
    >
      <Stack.Screen
        name="AdminRegistrations"       
        component={Registrations}
      />
      <Stack.Screen
        name="ProfileDetails"
        component={ProfileDetails}
      />
    </Stack.Navigator>
  );
};

function AdminNavigation({ navigation }) {
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const { user, logged } = useSelector((state) => state.users);
  const handleLogout = () => {
    dispatch(Logout());
  };

  useEffect(
    () => {
      if (logged === false) {
        navigation.navigate('Login');
      }
    },
    [logged],
    dispatch
  );

  const displayName = logged ? user.details.fullName.split(' ') : '';

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
                gap: 3,
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
                  fontSize: 16,
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
        name="Profile"
        component={Profile}
        options={{
          drawerLabel: () => {
            return (
              <DrawerItem
                icon={
                  <AntDesign name="user" style={{}} size={16} color="#fff" />
                }
                title="Profie"
              />
            );
          },
          drawerItemStyle: {
            backgroundColor: 'transparent',
          },
        }}
      />

      <Drawer.Screen
        name="Registrations"
        component={RegistrationNav}
        options={{
          drawerLabel: () => {
            return (
              <DrawerItem
                icon={
                  <MaterialIcons
                    name="app-registration"
                    style={{}}
                    size={16}
                    color="#fff"
                  />
                }
                title="Registrations"
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

export default AdminNavigation;
