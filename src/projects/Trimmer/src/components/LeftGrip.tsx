import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GripProps, GripGestureContext } from '~types';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Grip: React.FC<GripProps> = ({ gripWidth, color, gripPosition }) => {
  const translationX = useSharedValue(0)

  const gripStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value }
      ]
    }
  }, [translationX])

  useEffect(() => {
    translationX.value = gripPosition(0, 'left')
  }, [gripStyle])

  const gripEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, GripGestureContext>({
    onStart: (_event, context) => {
      context.changeX = translationX.value
    },
    onActive: (event, context) => {
      translationX.value = context.changeX + event.translationX
    },
    onEnd: () => {
    }
  })

  return (
    <PanGestureHandler onGestureEvent={gripEventHandler}>
      <Animated.View style={[
        styles.grip,
        {
          width: gripWidth,
          backgroundColor: color,
          borderTopLeftRadius: gripWidth / 8,
          borderBottomLeftRadius: gripWidth / 8
        },
        gripStyle,
      ]}>
        <GripIcon />
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  grip: {
    height: '100%',

    justifyContent: 'center',
    alignItems: 'center',

    zIndex: 1,
  },
});

export default Grip

const GripIcon = () => (
  <>
    <FontAwesome5 name="grip-vertical" size={12} color="black" />
    <FontAwesome name="angle-left" size={16} color="black" />
    <FontAwesome5 name="grip-vertical" size={12} color="black" />
  </>
)
