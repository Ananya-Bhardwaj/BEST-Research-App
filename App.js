// import { StyleSheet, View, Text } from 'react-native';
// // import UploadPaper from './pages/UploadPaper';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { StyleSheet } from 'react-native';



// export default function App() {
//   return (
//       <View style={styles.container}>
//         <Text style={styles.text}>Hello, world!</Text>
//         {/* <UploadPaper/> */}
//       </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   text: {
//     fontSize: 20,
//     marginBottom: 20,
//   },

// });
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import UploadPaper from './pages/UploadPaper'; // Import the UploadPaper page
import FormPage from './pages/FormPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FormPage">
        {/* <Stack.Screen 
          name="UploadPaper" 
          component={UploadPaper} 
          options={{ title: 'Upload Paper' }} 
        /> */}
        <Stack.Screen 
          name="FormPage" 
          component={FormPage} 
          options={{ title: 'Enter Paper Details' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
