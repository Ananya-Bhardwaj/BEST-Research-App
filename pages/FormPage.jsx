import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const FormPage = () => {
  const [subjectCode, setSubjectCode] = useState('');
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [examType, setExamType] = useState('');
  const [faculty, setFaculty] = useState('');

  const handleSubmit = () => {
    Alert.alert('Form Submitted', `Details:
    - Subject Code: ${subjectCode}
    - Year: ${year}
    - Branch: ${branch}
    - Exam Type: ${examType}
    - Faculty: ${faculty}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Subject Code</Text>
      <TextInput 
        style={styles.input}
        value={subjectCode}
        onChangeText={setSubjectCode}
        placeholder="Enter Subject Code"
      />

      <Text style={styles.label}>Year</Text>
      <TextInput 
        style={styles.input}
        value={year}
        onChangeText={setYear}
        placeholder="Enter Year"
      />

      <Text style={styles.label}>Branch</Text>
      <TextInput 
        style={styles.input}
        value={branch}
        onChangeText={setBranch}
        placeholder="Enter Branch"
      />

      <Text style={styles.label}>Exam Type</Text>
      <RNPickerSelect
        onValueChange={setExamType}
        items={[
          { label: 'Midterm', value: 'Midterm' },
          { label: 'Endterm', value: 'Endterm' },
          { label: 'Remid', value: 'Remid' },
          { label: 'Supplementary', value: 'Supplementary' },
        ]}
        style={{
          inputIOS: styles.dropdown,
          inputAndroid: styles.dropdown,
        }}
        placeholder={{ label: 'Select Exam Type', value: null }}
      />

      <Text style={styles.label}>Associated Faculty</Text>
      <TextInput 
        style={styles.input}
        value={faculty}
        onChangeText={setFaculty}
        placeholder="Enter Faculty Name"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
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
});

export default FormPage;
