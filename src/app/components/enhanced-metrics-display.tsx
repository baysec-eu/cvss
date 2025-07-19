"use client"
import React from 'react'
import styles from '../page.module.css'
import { type EnhancedVulnerabilityData } from '../../../lib/cvss'

interface EnhancedMetricsDisplayProps {
  data?: EnhancedVulnerabilityData
}

export default function EnhancedMetricsDisplay({ data }: EnhancedMetricsDisplayProps) {
  if (!data) return null

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'Critical': return styles.scoreCritical
      case 'High': return styles.scoreHigh
      case 'Medium': return styles.scoreMedium
      case 'Low': return styles.scoreLow
      default: return styles.scoreNone
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  return (
    <div className={styles.enhancedMetrics}>
      <h3>Enhanced Threat Intelligence</h3>
      
      {/* Risk Score Summary */}
      <div className={styles.riskSummary}>
        <div className={`${styles.score} ${getRiskLevelColor(data.threatLevel)}`}>
          <span>Combined Risk Score</span>
          <div className={styles.scoreBadge}>
            {data.riskScore?.toFixed(1) || 'N/A'} ({data.threatLevel})
          </div>
        </div>
      </div>

      <div className={styles.metricsGrid}>
        {/* EPSS Data */}
        {data.epss && (
          <div className={styles.metricCard}>
            <h4>🎯 EPSS (Exploit Prediction)</h4>
            <div className={styles.metricDetails}>
              <div className={styles.metricRow}>
                <span>EPSS Score:</span>
                <strong>{(data.epss.epss * 100).toFixed(2)}%</strong>
              </div>
              <div className={styles.metricRow}>
                <span>Percentile:</span>
                <strong>{(data.epss.percentile * 100).toFixed(1)}%</strong>
              </div>
              <div className={styles.metricRow}>
                <span>Last Updated:</span>
                <span>{formatDate(data.epss.date)}</span>
              </div>
            </div>
            <div className={styles.epssBar}>
              <div 
                className={styles.epssProgress}
                style={{ width: `${data.epss.epss * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* KEV Status */}
        {data.kev ? (
          <div className={`${styles.metricCard} ${styles.kevActive}`}>
            <h4>🚨 KEV (Known Exploited)</h4>
            <div className={styles.metricDetails}>
              <div className={styles.metricRow}>
                <span>Vendor:</span>
                <strong>{data.kev.vendorProject}</strong>
              </div>
              <div className={styles.metricRow}>
                <span>Product:</span>
                <strong>{data.kev.product}</strong>
              </div>
              <div className={styles.metricRow}>
                <span>Added to KEV:</span>
                <span>{formatDate(data.kev.dateAdded)}</span>
              </div>
              <div className={styles.metricRow}>
                <span>Due Date:</span>
                <span>{formatDate(data.kev.dueDate)}</span>
              </div>
              <div className={styles.metricRow}>
                <span>Ransomware Use:</span>
                <strong className={data.kev.knownRansomwareCampaignUse === 'Known' ? styles.ransomwareKnown : ''}>
                  {data.kev.knownRansomwareCampaignUse}
                </strong>
              </div>
            </div>
            <div className={styles.kevDescription}>
              <p><strong>Description:</strong> {data.kev.shortDescription}</p>
              <p><strong>Required Action:</strong> {data.kev.requiredAction}</p>
            </div>
          </div>
        ) : (
          <div className={styles.metricCard}>
            <h4>✅ KEV Status</h4>
            <div className={styles.metricDetails}>
              <p>Not listed in CISA's Known Exploited Vulnerabilities catalog.</p>
            </div>
          </div>
        )}

        {/* CVSS Data */}
        {(data.cvssv31 || data.cvssv40) && (
          <div className={styles.metricCard}>
            <h4>📊 CVSS Details</h4>
            <div className={styles.metricDetails}>
              {data.cvssv31 && (
                <div className={styles.cvssVersion}>
                  <strong>CVSS v3.1:</strong> {data.cvssv31.baseScore.toFixed(1)}
                  {data.cvssv31.temporalScore && (
                    <span> (Temporal: {data.cvssv31.temporalScore.toFixed(1)})</span>
                  )}
                </div>
              )}
              {data.cvssv40 && (
                <div className={styles.cvssVersion}>
                  <strong>CVSS v4.0:</strong> {data.cvssv40.baseScore.toFixed(1)}
                  {data.cvssv40.temporalScore && (
                    <span> (Temporal: {data.cvssv40.temporalScore.toFixed(1)})</span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}