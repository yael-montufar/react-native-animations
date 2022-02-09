import React from 'react';
import { StyleSheet } from 'react-native';
import { GripProps, GripGestureContext } from '~types';

import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';

import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const Grip: React.FC<GripProps> = ({ gripWidth, color, opacity, gestureHandler, animatedStyle }) => {
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[
        styles.grip,
        {
          width: gripWidth,
          backgroundColor: color,
          opacity: opacity,
          borderTopLeftRadius: gripWidth / 8,
          borderBottomLeftRadius: gripWidth / 8
        },
        animatedStyle,
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

    position: 'absolute',

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
