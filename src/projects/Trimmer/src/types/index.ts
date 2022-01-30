export interface MarkerProps {
  duration: number,
  cap: number,
  interval: number,

  scrollWidth: number,
  gripWidth: number,
  markerWidth: number
  color: string,
}

export interface GripProps {
  gripWidth: number,
  color: string,
  opacity: number,

  gestureHandler: any,
  animatedStyle: any,
}

export interface TrimmerProps {
  handleGripPosition: CalculateGripPosition

  gripWidth: number,
  color: string,
}

export type CalculateGripPosition = (secondsMark: number, variant: 'left' | 'right') => number

export type GripGestureContext = {
  changeX: number;
}