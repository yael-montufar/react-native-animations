import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { ClipProps, GripGestureContext } from '~types';

import {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

import Grip from './Grip'

const Trimmer: React.FC<ClipProps> = ({ handleGripPosition, gripWidth, color }) => {
  const gripPositionLeft = useSharedValue(0)
  const gripPositionRight = useSharedValue(0)

  const gripStyleLeft = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: gripPositionLeft.value }
      ]
    }
  }, [gripPositionLeft])

  const gripStyleRight = useAnimatedStyle(() => {
    return {
      transform: [
        { rotate: '180deg' },
        { translateX: gripPositionRight.value }
      ]
    }
  }, [gripPositionRight])

  useEffect(() => {
    gripPositionLeft.value = handleGripPosition(5, 'left')
    gripPositionRight.value = handleGripPosition(5, 'right')
  }, [gripStyleLeft, gripStyleRight])

  const gripGestureLeft = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, GripGestureContext>({
    onStart: (_event, context) => {
      context.changeX = gripPositionLeft.value
    },
    onActive: (event, context) => {
      gripPositionLeft.value = context.changeX + event.translationX
    },
    onEnd: () => {
    }
  })

  const gripGestureRight = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, GripGestureContext>({
    onStart: (_event, context) => {
      context.changeX = -gripPositionRight.value
    },
    onActive: (event, context) => {
      gripPositionRight.value = -(context.changeX + event.translationX)
    },
    onEnd: () => {
    }
  })

  return (
    <>
      {/* <View style={[styles.root, { width: width, borderRadius: gripWidth / 8 }]}> */}
      <Grip
        gripWidth={gripWidth}
        color={'cyan'}
        opacity={1}
        animatedStyle={gripStyleLeft}
        gestureHandler={gripGestureLeft}
      />
      {/* <View style={[styles.frame, { borderColor: color, borderWidth: gripWidth / 8 }]} /> */}
      {/* <View style={[styles.window, { backgroundColor: color, opacity: .1, borderColor: 'blue' }]} /> */}
      <Grip
        gripWidth={gripWidth}
        color={'magenta'}
        opacity={1}
        animatedStyle={gripStyleRight}
        gestureHandler={gripGestureRight}
      />
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
