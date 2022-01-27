import React, { useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSpring,
} from 'react-native-reanimated'

const SIZE = 50

export default function Reactive1() {
  const scale = useSharedValue(2)
  const translationX = useSharedValue(-100)
  const rotation = useSharedValue(0)

  const animatedCircle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value },
        { rotate: `${rotation.value * Math.PI}rad` },
        { scale: scale.value }
      ]
    }
  }, [])


  useEffect(() => {
    scale.value = withRepeat(withTiming(0, { duration: 5000 }), -1, true)
    translationX.value = withRepeat(withSpring(100), -1, true)
    rotation.value = withRepeat(withTiming(2, { duration: 3000 }), -1, false)
  }, [])

  return (
    <Animated.View style={[styles.circle, animatedCircle]}>
      <Animated.View style={[styles.line]} />
      <Animated.View style={[styles.point]} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  circle: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: 'white',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    height: '50%',
    width: 4,
    backgroundColor: '#202020',
    top: 0
  },
  point: {
    width: SIZE / 5,
    height: SIZE / 5,
    borderRadius: SIZE / 5 / 2,
    backgroundColor: '#202020',
  },
})
