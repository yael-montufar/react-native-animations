import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { TrimmerProps } from '~types';

import Grip from './Grip'

const Trimmer: React.FC<TrimmerProps> = ({ duration, scale, gripWidth, color, markerWidth }) => {
  // const width = (gripWidth * 2) + (duration * scale) + 2
  const getPosition = (duration: number, variant: string) => {
    return variant === 'left'
      ? duration * scale
      : -((gripWidth * 2) + (duration * scale) + markerWidth) + gripWidth
  }

  const gripPositionLeft = useSharedValue(0)
  const gripPositionRight = useSharedValue(0)

  useEffect(() => {
    gripPositionLeft.value = getPosition(0, 'left')
    gripPositionRight.value = getPosition(duration, 'right')
  }, [duration, gripWidth, scale])

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
