import React from "react"

/* ---------------------------------- ROOT ---------------------------------- */
export interface TrimmerProps {
  mediaDuration: number;
  clipDuration: number;

  height?: number;
  trackColor?: string;

  markerCap?: number;
  unitMarkerInterval?: number;
  markerWidth?: number;
  markerColor?: string;

  trimmerColor?: string;
  gripWidth?: number;
}

/* ----------------------------- COMPONENTS ----------------------------- */
export interface MarkerProps {
  gripOffset: number;

  markers: any[];

  markerWidth: number;
  markerColor: string;

  unitMarkerInterval: number;

  markerGap: number;
}

export interface TrackProps {
  dimensions: {
    rootHeight: number;
    rootWidth: number;
    trackWidth: number;
  }

  children: React.ReactNode;
}

export interface LeftGripProps {
  gripWidth: number;
  color: string;

  gripPosition: CalculateGripPosition;

  dimensions: {
    trackWidth: number;
  }
}

export interface ClipProps {
  handleGripPosition: CalculateGripPosition

  gripWidth: number,
  color: string,
}

/* -------------------------------- GESTURES -------------------------------- */
export type ScrollGestureContext = {
  changeX: number;
}

export type GripGestureContext = {
  changeX: number;
}

/* -------------------------------- UTILITIES ------------------------------- */
export type CalculateGripPosition = (secondsMark: number, variant: 'left' | 'right') => number;

export type Dimensions = {
  rootHeight?: number;
  rootWidth?: number;
  trackHeight?: number;
  trackWidth?: number;
}