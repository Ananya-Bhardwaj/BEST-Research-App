import React, { useState}from "react";
import {
  Input,
  IndexPath,
  Layout,
  Select,
  SelectItem
} from "@ui-kitten/components";
import { View, StyleSheet, View, StyleSheet } from "react-native";
import * as DocumentPicker from 'expo-document-picker';
import Button from "../components/Button";


export const UploadPaper = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  const handleUpload = async () => {
    // try {
    //   const doc = await DocumentPicker.pick();
    //   console.log(doc);
    // } catch (err) {
    //   if (DocumentPicker.isCancel(err)) {
    //     console.log("User cancelled the upload", err);
    //   } else {
    //     console.log(err);
    //   }
    // }
    //use expo DocumentPicker
    console.log("Uploading Paper");
  }

  return (
    <View>
      
      <Input
        placeholder="Subject Code"
        value={email}
        onChangeText={(nextValue) => setEmail(nextValue)}
      />
      <Input
        placeholder="Year"
        value={password}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <Input
        placeholder="Branch"
        value={password}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6FA',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
