import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { FacultyRegistration } from './pages/FacultyRegistration';
import { ApplicationProvider, Layout } from '@ui-kitten/components';
import * as eva from '@eva-design/eva'; // Import Eva design system
import { UploadPaper } from './pages/UploadPaper';

export default function App() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View style={styles.container}>
        <UploadPaper />
      </View>
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
