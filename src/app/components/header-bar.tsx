"use client"
import React from 'react'

import styles from "../page.module.css"
import { capitalizeFirstLetter } from '../../../lib/utils'

interface HeaderBarProps {
  baseScore: number
  severity: string
}

export default function HeaderBar({
  baseScore,
  severity,

}: HeaderBarProps) {
  const severityClassName = `score${capitalizeFirstLetter(severity)}`
  console.log(severityClassName)
  return (
    <div className={[styles[severityClassName], styles.score].join(" ")}>
      <span>Base Score</span>
      <div className={styles.scoreBadge}>
        {baseScore.toFixed(1)} ({severity})
      </div>
    </div>
  )
}
