import React from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

export default function Reactive2() {
  const { width: screenWidth } = useWindowDimensions()

  const translationX = useSharedValue(0)
  const translationY = useSharedValue(0)

  type Context = {
    changeX: number;
    changeY: number;
  }

  const gestureEventHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, Context>({
    onStart: (_event, context) => {
      context.changeX = translationX.value
      context.changeY = translationY.value
    },
    onActive: (event, context) => {
      translationX.value = context.changeX + event.translationX
      translationY.value = context.changeY + event.translationY
    },
    onEnd: () => {
      const radius = screenWidth / 4 * 3 / 2
      const distance = Math.sqrt(translationX.value ** 2 + translationY.value ** 2)
      console.log(radius)

      if (distance < radius + 25) {
        translationX.value = withSpring(0)
        translationY.value = withSpring(0)
      }
    },
  })

  const circleStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translationX.value },
      { translateY: translationY.value },
    ]
  }), [])

  return (
    <View style={[
      styles.boundary,
      { width: screenWidth / 4 * 3, borderRadius: screenWidth / 2 },
    ]}>
      <PanGestureHandler onGestureEvent={gestureEventHandler}>
        <Animated.View style={[styles.circle, circleStyle]} />
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  boundary: {
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: '#C0C0C0',

    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 50,
    aspectRatio: 1,
    backgroundColor: 'white',
    borderRadius: 25
  },
})
