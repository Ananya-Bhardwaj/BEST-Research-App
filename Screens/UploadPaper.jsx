import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const UploadPaper = () => {
  const [fileName, setFileName] = useState(null);

  const handleFileUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf', // Restrict to PDF files
    });

    if (result.type === 'success') {
      setFileName(result.name);
      Alert.alert(`File Selected', You selected: ${result.name}`);
      console.log('File Details:', result);
    } else {
      console.log('File selection canceled');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Paper</Text>
      <TouchableOpacity style={styles.button} onPress={handleFileUpload}>
        <Text style={styles.buttonText}>Upload PDF</Text>
      </TouchableOpacity>
      {fileName && <Text style={styles.fileName}>Selected: {fileName}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  fileName: {
    marginTop: 15,
    fontSize: 16,
    color: '#333',
  },
});

export default UploadPaper;