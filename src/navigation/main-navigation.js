import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import Login from '../screens/login';
import Signup from '../screens/signup';
import ParentNavigation from './parent-navigation';
import AdminNavigation from './admin-navigation';
import TutorNavigation from './tutor-navigation';

function MainNavigation() {
  const { user, logged } = useSelector((state) => state.users);

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      {logged ? (
        user.details.role === 'admin' ? (
          <Stack.Screen
            name="AdminWelcome"
            component={AdminNavigation}
            options={{ header: () => {} }}
          />
        ) : user.details.role === 'parent' ? (
          <Stack.Screen
            name="ParentWelcome"
            component={ParentNavigation}
            options={{ header: () => {} }}
          />
        ) : (
          <Stack.Screen
            name="TutorWelcome"
            component={TutorNavigation}
            options={{ header: () => {} }}
          />
        )
      ) : (
        <>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ header: () => {} }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ header: () => {} }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default MainNavigation;
