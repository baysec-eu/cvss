"use client"
import React from 'react'

import styles from "../page.module.css"
import { capitalizeFirstLetter } from '../../../lib/utils'

interface HeaderBarProps {
  baseScore: number
  temporalScore?: number
  environmentalScore?: number
  overallScore?: number
  severity: string
  overallSeverity?: string
  cvssVersion: '3.1' | '4.0'
}

export default function HeaderBar({
  baseScore,
  temporalScore,
  environmentalScore,
  overallScore,
  severity,
  overallSeverity,
  cvssVersion,
}: HeaderBarProps) {
  const severityClassName = `score${capitalizeFirstLetter(severity)}`
  
  return (
    <div className={styles.headerContainer}>
      <div className={styles.versionBadge}>CVSS {cvssVersion}</div>
      
      <div className={[styles[severityClassName], styles.score].join(" ")}>
        <span>Base Score</span>
        <div className={styles.scoreBadge}>
          {baseScore.toFixed(1)} ({severity})
        </div>
      </div>

      {temporalScore !== undefined && temporalScore > 0 && (
        <div className={[styles[severityClassName], styles.score].join(" ")}>
          <span>Temporal Score</span>
          <div className={styles.scoreBadge}>
            {temporalScore.toFixed(1)}
          </div>
        </div>
      )}

      {environmentalScore !== undefined && environmentalScore > 0 && (
        <div className={[styles[severityClassName], styles.score].join(" ")}>
          <span>Environmental Score</span>
          <div className={styles.scoreBadge}>
            {environmentalScore.toFixed(1)}
          </div>
        </div>
      )}

      {overallScore !== undefined && overallScore > 0 && (temporalScore !== undefined && temporalScore > 0 || environmentalScore !== undefined && environmentalScore > 0) && (
        <div className={[styles[`score${capitalizeFirstLetter(overallSeverity || 'None')}`], styles.score].join(" ")}>
          <span>Overall Score</span>
          <div className={styles.scoreBadge}>
            {overallScore.toFixed(1)} ({overallSeverity})
          </div>
        </div>
      )}
    </div>
  )
}
