import { StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Trimmer } from "~projects";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
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
