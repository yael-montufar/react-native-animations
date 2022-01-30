import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { TrimmerProps } from '~types';

import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import Grip from './Grip'

const Trimmer: React.FC<TrimmerProps> = ({ gripPosition, gripWidth, color }) => {
  const gripPositionLeft = useSharedValue(0)
  const gripPositionRight = useSharedValue(0)

  useEffect(() => {
    gripPositionLeft.value = gripPosition(0, 'left')
    gripPositionRight.value = gripPosition(0, 'right')
  }, [])

  const gripStyleLeft = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: gripPositionLeft.value }
      ]
    }
  })

  const gripStyleRight = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: '180deg' },
        { translateX: gripPositionRight.value }
      ]
    }
  })

  return (
    <>
      {/* <View style={[styles.root, { width: width, borderRadius: gripWidth / 8 }]}> */}
      <Grip gripWidth={gripWidth} color={'cyan'} opacity={1} variant='left' animatedStyle={gripStyleLeft} />
      {/* <View style={[styles.frame, { borderColor: color, borderWidth: gripWidth / 8 }]} /> */}
      {/* <View style={[styles.window, { backgroundColor: color, opacity: .1, borderColor: 'blue' }]} /> */}
      <Grip gripWidth={gripWidth} color={'magenta'} opacity={1} variant='right' animatedStyle={gripStyleRight} />
      {/* </View> */}
    </>
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
