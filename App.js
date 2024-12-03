import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UploadPaper from './Screens/UploadPaper'; // Import the UploadPaper page
import { Text } from 'react-native';
import LoginScreen from './Screens/LoginScreen';
import FacultyRegistration from './Screens/FacultyRegistration';
import FormPage from './Screens/FormPage';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FormPage">
         <Stack.Screen 
          name="UploadPaper" 
          component={UploadPaper} 
          options={{ title: 'Upload Paper' }} 
        />
         <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />
         <Stack.Screen 
          name="Register" 
          component={FacultyRegistration} 
          options={{ title: 'Register' }} 
        />
         <Stack.Screen 
          name="FormPage" 
          component={FormPage} 
          options={{ title: 'Form' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
);
}