import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { LeftGripProps, GripGestureContext } from '~types';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useDerivedValue,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Grip: React.FC<LeftGripProps> = ({ gripWidth, color, gripPosition, dimensions }) => {
  const translationX = useSharedValue(0)

  const boundedTranslationX = useDerivedValue(() => {
    const lowerBound = Math.max(translationX.value, 0)
    // const upperBound = dimensions.rightOffset
    const upperBound = dimensions.trackWidth - gripWidth

    return Math.min(lowerBound, upperBound)
  })

  const gripEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, GripGestureContext>({
    onStart: (_event, context) => {
      context.changeX = boundedTranslationX.value
    },
    onActive: (event, context) => {
      translationX.value = context.changeX + event.translationX
      console.log(boundedTranslationX.value)
    },
    onEnd: () => {
    }
  })

  const gripStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: boundedTranslationX.value }
      ]
    }
  }, [translationX])

  // useEffect(() => {
  //   translationX.value = gripPosition(0, 'left')
  // }, [gripStyle])


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
