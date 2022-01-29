//@ts-nocheck
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TrimmerProps } from '~types';

import Grip from './Grip'

const Trimmer: React.FC<TrimmerProps> = ({ duration, scale, gripWidth, color }) => {
  const width = (gripWidth * 2) + (duration * scale) + 2

  return (
    <View style={[styles.root, { width: width, borderRadius: gripWidth / 8 }]}>
      <Grip gripWidth={gripWidth} color={color} opacity={1} variant='left' />
      <View style={[styles.frame, { borderColor: color, borderWidth: gripWidth / 8 }]} />
      <View style={[styles.window, { backgroundColor: color, opacity: .1, borderColor: 'blue' }]} />
      <Grip gripWidth={gripWidth} color={color} opacity={1} variant='right' />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    height: '100%',
    flexDirection: 'row',

    position: 'absolute',
    zIndex: 1,
    overflow: 'hidden',
  },
  window: {
    flexGrow: 1,
  },
  frame: {
    position: 'absolute',
    width: '100%',
    height: '100%',

    backgroundColor: 'transparent',
  }
});

export default Trimmer
