//@ts-nocheck
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import Constants from 'expo-constants';
import { AnimatedStyleUpdateExample } from '~components';

export default function App() {
  const isHermes = JSON.stringify(!!global.HermesInternal)
  const [state, setState] = useState(false)

  useEffect(() => {
    console.log(Constants)
  }, [])

  return (
    <View style={styles.container}>
      <AnimatedStyleUpdateExample />
      <Text>{isHermes}</Text>
      <Button title='log'
        onPress={() => {
          setState(prev => !prev)
          console.log(state)
        }}
      />
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
