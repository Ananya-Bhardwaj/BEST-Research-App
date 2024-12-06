import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const DecryptPage = () => {
    const navigation = useNavigation();
    const [paperText, setPaperText] = useState(null);

    const handleDecryptPaper = () => {
        // id = "675229a303de3031eab4a0ac";
        axios.get(`http://192.168.199.97:5000/api/paper/${id}`).then((response) => {
          setPaperText(response.data);
        }).catch((error) => {console.log(error)});
      };
  return (
    <View>
        <Button title="Decrypt Paper" onPress={handleDecryptPaper} color="blue" />
    </View>
  )
}

export default DecryptPage

const styles = StyleSheet.create({})