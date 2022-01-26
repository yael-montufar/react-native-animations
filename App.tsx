import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Reactive1, Reactive2, Reactive3, Reactive7, Trimmer } from "~components";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      {/* <Reactive1 /> */}
      {/* <Reactive2 /> */}
      {/* <Reactive3 /> */}
      {/* <Reactive7 /> */}
      <Trimmer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,

    backgroundColor: '#181818',
  }
});
