import React from 'react';
import { Input, IndexPath, Layout, Select, SelectItem  } from '@ui-kitten/components';
import { View, StyleSheet } from 'react-native';

export const FacultyRegistration = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));

  return (
    <View>
      <Input
        placeholder='Organization Email'
        value={email}
        onChangeText={nextValue => setEmail(nextValue)}
      />
      <Input
        placeholder='Password'
        value={password}
        onChangeText={nextValue => setPassword(nextValue)}
      />
          <Layout
      style={styles.container}
      level='1'
    >
      <Select
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}
      >
        <SelectItem title='Faculty' />
        <SelectItem title='Examination Department' />
      </Select>
    </Layout>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    minHeight: 128,
  },
});
