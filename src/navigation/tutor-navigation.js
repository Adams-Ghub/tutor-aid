import React, { useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DrawerActions } from '@react-navigation/native';
import DrawerItem from '../components/drawer-item';
import Profile from '../screens/tutor/tutor-profile';
import Performance from '../screens/tutor/tutor-performance';
import Requests from '../screens/tutor/tutor-requests';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../redux/users/usersAction.js';
import { Entypo, EvilIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import profileImg from '../../assets/profile.png';

const Stack = createNativeStackNavigator();
// const chatNavigation=()=> {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         header: () => null,
//       }}
//       initialRouteName="feedback-list"

//     >
//       <Stack.Screen
//         name="feedback-list"
//         // options={{ header: () => {} }}
//         component={Feedback}
//       />
//       <Stack.Screen
//         name="chat"
//         // options={{ header: () => {} }}
//         component={Chat}
//       />
//     </Stack.Navigator>
//   );
// }

function TutorNavigation({ navigation }) {
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
              style={{ marginLeft: 12 }}
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
                width: 130,
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
                  marginRight: 15,
                  marginBottom: 0,
                  padding: 0,
                  fontWeight: '600',
                  fontSize: 16,
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
          height: 80,
          borderBottomWidth: 2,
          borderBottomColor: '#3944bc',
        },
        headerTitleContainerStyle: {
          display: 'none', // Adjust the top position to align with the drawer content
        },
        headerStatusBarHeight: 20,
        drawerStyle: {
          backgroundColor: '#3944bc',
          width: '55%',
          paddingTop: '20%',
        },
      }}
    >
      <Drawer.Screen
        name="Requests"
        component={Requests}
        options={{
          drawerLabel: () => {
            return (
              <DrawerItem
                icon={
                  <FontAwesome5
                    name="chalkboard-teacher"
                    style={{}}
                    size={16}
                    color="#fff"
                  />
                }
                title="Requests"
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
                  <EvilIcons name="chart" style={{}} size={20} color="#fff" />
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
                  <AntDesign name="user" style={{}} size={16} color="#fff" />
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
    </Drawer.Navigator>
  );
}

export default TutorNavigation;
