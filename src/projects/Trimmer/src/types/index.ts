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

  variant: string,
  animatedStyle: any,
}

export interface TrimmerProps {
  gripPosition: CalculateGripPosition

  gripWidth: number,
  color: string,
}

export type CalculateGripPosition = (secondsMark: number, variant: 'left' | 'right') => number
