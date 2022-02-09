import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Track from './components/Track';

export default function index() {
  const [rootWidth, setRootWidth] = useState(0)
  const ROOT_HEIGHT = 72
  const TRACK_COLOR = '#202020'

  return (
    <View
      style={[
        styles.root,
        { height: ROOT_HEIGHT, backgroundColor: TRACK_COLOR }
      ]}
      onLayout={(event) => setRootWidth(event.nativeEvent.layout.width)}
    >
      <Track rootWidth={rootWidth} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
  },
});
