import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UploadPaper from './Screens/UploadPaper'; // Import the UploadPaper page
import { Text } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import FacultyRegistration from './Screens/FacultyRegistration';
import FormPage from './Screens/FormPage';
import NotificationPage from './Screens/Notification';
import PolyVals from './Screens/PolyValues';
import DecryptPage from './Screens/DecryptPage';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
         <Stack.Screen 
          name="UploadPaper" 
          component={UploadPaper} 
          options={{ title: 'Upload Paper' }} 
        />
         <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ 
            title: 'Login'
          }} 
        />
         <Stack.Screen 
          name="Register" 
          component={FacultyRegistration} 
          options={{ title: 'Register' }} 
        />
         <Stack.Screen 
          name="FormPage" 
          component={FormPage} 
          options={{ title: 'Upload Paper' }} 
        />
         <Stack.Screen 
          name="Notification" 
          component={NotificationPage} 
          options={{ title: 'Notification' }} 
        />
        <Stack.Screen 
          name="PolyVals" 
          component={PolyVals} 
          options={{ title: 'Decrypt Paper'}} 
        />
        <Stack.Screen 
          name="DecryptPage" 
          component={DecryptPage} 
          options={{ title: 'DecryptPage'}} 
        />
      </Stack.Navigator>
    </NavigationContainer>
);
}