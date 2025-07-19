"use client"
import React from 'react'
import styles from '../page.module.css'
import { 
  calculateCvss31BaseScore, 
  calculateCvss40BaseScore, 
  calculateCvss40Temporal, 
  calculateCvss40Environmental,
  cvssSeverityFromScore,
  generateCvssVector,
  type CVSSCalculationInput,
  type CVSS40CalculationInput 
} from '../../../lib/cvss'

interface CVSSComparisonProps {
  cvss31Input: CVSSCalculationInput
  cvss40Input: CVSS40CalculationInput
}

export default function CVSSComparison({ cvss31Input, cvss40Input }: CVSSComparisonProps) {
  const cvss31Score = calculateCvss31BaseScore(cvss31Input)
  const cvss31Severity = cvssSeverityFromScore(cvss31Score)
  const cvss31Vector = generateCvssVector('3.1', cvss31Input)

  const cvss40BaseScore = calculateCvss40BaseScore(cvss40Input)
  const cvss40TemporalScore = calculateCvss40Temporal(cvss40BaseScore, cvss40Input)
  const cvss40EnvironmentalScore = calculateCvss40Environmental(cvss40BaseScore, cvss40Input)
  const cvss40Severity = cvssSeverityFromScore(cvss40BaseScore)
  const cvss40Vector = generateCvssVector('4.0', cvss40Input)

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'Critical': return styles.scoreCritical
      case 'High': return styles.scoreHigh
      case 'Medium': return styles.scoreMedium
      case 'Low': return styles.scoreLow
      default: return styles.scoreNone
    }
  }

  const getDifference = () => {
    const diff = cvss40BaseScore - cvss31Score
    return {
      value: Math.abs(diff),
      direction: diff > 0 ? 'higher' : diff < 0 ? 'lower' : 'same',
      percentage: cvss31Score > 0 ? Math.abs((diff / cvss31Score) * 100) : 0
    }
  }

  const difference = getDifference()

  return (
    <div className={styles.comparisonContainer}>
      <h3 className={styles.comparisonTitle}>
        📊 CVSS Version Comparison
      </h3>
      
      <div className={styles.comparisonGrid}>
        {/* CVSS v3.1 Column */}
        <div className={styles.comparisonColumn}>
          <div className={styles.versionHeader}>
            <h4>CVSS v3.1</h4>
            <span className={styles.versionBadge31}>Industry Standard</span>
          </div>
          
          <div className={`${styles.score} ${getSeverityClass(cvss31Severity)}`}>
            <span>Base Score</span>
            <div className={styles.scoreBadge}>
              {cvss31Score.toFixed(1)} ({cvss31Severity})
            </div>
          </div>

          <div className={styles.vectorDisplay}>
            <h5>Vector String:</h5>
            <code className={styles.vectorString}>{cvss31Vector}</code>
          </div>

          <div className={styles.metricsBreakdown}>
            <h5>Key Metrics:</h5>
            <div className={styles.metricsList}>
              <div className={styles.metricItem}>
                <span>Attack Vector:</span>
                <strong>{cvss31Input.attackVector}</strong>
              </div>
              <div className={styles.metricItem}>
                <span>Attack Complexity:</span>
                <strong>{cvss31Input.attackComplexity}</strong>
              </div>
              <div className={styles.metricItem}>
                <span>Privileges Required:</span>
                <strong>{cvss31Input.privilegesRequired}</strong>
              </div>
              <div className={styles.metricItem}>
                <span>User Interaction:</span>
                <strong>{cvss31Input.userInteraction}</strong>
              </div>
              <div className={styles.metricItem}>
                <span>Scope:</span>
                <strong>{cvss31Input.scope}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Comparison Middle */}
        <div className={styles.comparisonMiddle}>
          <div className={styles.comparisonArrow}>⚖️</div>
          
          <div className={styles.differenceCard}>
            <h5>Score Difference</h5>
            <div className={styles.differenceValue}>
              {difference.direction === 'same' ? (
                <span className={styles.sameDiff}>Identical</span>
              ) : (
                <>
                  <span className={difference.direction === 'higher' ? styles.higherDiff : styles.lowerDiff}>
                    {difference.direction === 'higher' ? '↗️' : '↘️'} {difference.value.toFixed(1)}
                  </span>
                  <small>({difference.percentage.toFixed(1)}% {difference.direction})</small>
                </>
              )}
            </div>
          </div>

          <div className={styles.recommendationCard}>
            <h5>Recommendation</h5>
            <p>
              {cvss40BaseScore > cvss31Score ? (
                "CVSS v4.0 provides a higher, more precise score reflecting enhanced threat modeling."
              ) : cvss40BaseScore < cvss31Score ? (
                "CVSS v4.0 provides a more conservative score with refined metrics."
              ) : (
                "Both versions yield identical base scores for this vulnerability."
              )}
            </p>
          </div>
        </div>

        {/* CVSS v4.0 Column */}
        <div className={styles.comparisonColumn}>
          <div className={styles.versionHeader}>
            <h4>CVSS v4.0</h4>
            <span className={styles.versionBadge40}>Latest Standard</span>
          </div>
          
          <div className={`${styles.score} ${getSeverityClass(cvss40Severity)}`}>
            <span>Base Score</span>
            <div className={styles.scoreBadge}>
              {cvss40BaseScore.toFixed(1)} ({cvss40Severity})
            </div>
          </div>

          {(cvss40TemporalScore > 0 || cvss40EnvironmentalScore > 0) && (
            <div className={styles.additionalScores}>
              {cvss40TemporalScore > 0 && (
                <div className={styles.additionalScore}>
                  <span>Temporal:</span>
                  <strong>{cvss40TemporalScore.toFixed(1)}</strong>
                </div>
              )}
              {cvss40EnvironmentalScore > 0 && (
                <div className={styles.additionalScore}>
                  <span>Environmental:</span>
                  <strong>{cvss40EnvironmentalScore.toFixed(1)}</strong>
                </div>
              )}
            </div>
          )}

          <div className={styles.vectorDisplay}>
            <h5>Vector String:</h5>
            <code className={styles.vectorString}>{cvss40Vector}</code>
          </div>

          <div className={styles.metricsBreakdown}>
            <h5>Enhanced Metrics:</h5>
            <div className={styles.metricsList}>
              <div className={styles.metricItem}>
                <span>Attack Requirements:</span>
                <strong>{cvss40Input.attackRequirements || 'N'}</strong>
              </div>
              <div className={styles.metricItem}>
                <span>Subsequent System (C/I/A):</span>
                <strong>
                  {cvss40Input.subsequentSystemConfidentiality || 'N'}/
                  {cvss40Input.subsequentSystemIntegrity || 'N'}/
                  {cvss40Input.subsequentSystemAvailability || 'N'}
                </strong>
              </div>
              {cvss40Input.exploitMaturity && cvss40Input.exploitMaturity !== 'X' && (
                <div className={styles.metricItem}>
                  <span>Exploit Maturity:</span>
                  <strong>{cvss40Input.exploitMaturity}</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}