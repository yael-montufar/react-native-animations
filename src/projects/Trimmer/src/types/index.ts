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
}

export interface TrimmerProps {
  duration: number,
  scale: number,

  gripWidth: number,
  color: string,
}
