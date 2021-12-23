//@ts-nocheck
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default function App() {
  const isHermes = JSON.stringify(!!global.HermesInternal)
  console.log(Constants)

  return (
    <View style={styles.container}>
      <Text>{isHermes}</Text>
      <StatusBar style="auto" />
    </View>
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
