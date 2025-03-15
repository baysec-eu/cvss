"use client"
import React from 'react'

interface HeaderBarProps {
  baseScore: number
  severity: string
  headerStyle: React.CSSProperties
  titleStyle: React.CSSProperties
  badgeStyle: React.CSSProperties
}

export default function HeaderBar({
  baseScore,
  severity,
  headerStyle,
  titleStyle,
  badgeStyle,
}: HeaderBarProps) {
  return (
    <div style={headerStyle}>
      <span style={titleStyle}>Base Score</span>
      <div style={badgeStyle}>
        {baseScore.toFixed(1)} ({severity})
      </div>
    </div>
  )
}
