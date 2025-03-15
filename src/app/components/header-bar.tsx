"use client"
import React from 'react'

interface HeaderBarProps {
  baseScore: number
  severity: string
}

export default function HeaderBar({
  baseScore,
  severity,

}: HeaderBarProps) {
  return (
    <div>
      <span>Base Score</span>
      <div>
        {baseScore.toFixed(1)} ({severity})
      </div>
    </div>
  )
}
