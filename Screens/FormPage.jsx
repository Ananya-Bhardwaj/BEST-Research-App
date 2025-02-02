import { StyleSheet, Button, View, Text, TextInput, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import React from 'react';
// import { apiUrl } from "./url";
import RNPickerSelect from 'react-native-picker-select';
// import { hashPDF, signPDF, verifySignature } from "../Utils";
// import * as FileSystem from 'expo-file-system';
import { useNavigation } from "@react-navigation/native";

export default function FormPage() {
  const [subjectCode, setSubjectCode] = React.useState("");
  const [year, setYear] = React.useState("");
  const [branch, setBranch] = React.useState("");
  const [examType, setExamType] = React.useState("");
  const [file, setFile] = React.useState(null);

  const navigation = useNavigation();

  const handleFileUpload = async () => {
    try {
      const docRes = await DocumentPicker.getDocumentAsync({
        type: "*/*",
      });
      const formData = new FormData();
      const assets = docRes.assets;
      if (!assets) return;

      setFile(assets[0]);

      // console.log(assets[0]);

      // const pdfData = await FileSystem.readAsStringAsync(assets[0].uri, { encoding: FileSystem.EncodingType.Base64 });

      // print(pdfData);

        
  // // Sign the PDF
  // const { signature, hash } = signPDF(pdfData, privateKey);
  
  // console.log("Signature:", signature);
  // console.log("Hash:", hash);
  
  // // Verify the Signature
  // const isValid = verifySignature(pdfData, signature, publicKey);
  // console.log("Signature valid:", isValid);
  
  }
  catch (error) {
    console.error(error);
  }
};

  const handleSubmit = () => {
      axios.post(`${process.env.BACKEND_URL}/api/paper`, {
        pdf_id: file.file, 
        subject_code: subjectCode,
        year: year, 
        branch: branch,
        exam: examType,
        faculty: "674a0e38763b85df4ad59554"
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        navigation.navigate('PolyVals', {"id": response.data.id});
        console.log(response.data); // Handle successful upload response
      })
      .catch(error => {
        console.error(error); // Handle upload errors
      }); 
      
    } 

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleFileUpload}>
        <Text style={styles.buttonText}>Upload PDF</Text>
      </TouchableOpacity>

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
          inputAndroid: styles.dropdown
        }}
        placeholder={{ label: 'Select Exam Type', value: null }}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

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
    marginBottom: 15,
    marginTop: 15
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
