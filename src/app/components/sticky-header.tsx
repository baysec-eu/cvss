"use client"
import React from 'react'
import styles from "./sticky-header.module.css"

interface StickyHeaderProps {
  score: number
  severity: string
  vectorString: string
  cvssVersion: '3.1' | '4.0'
}

export default function StickyHeader({ score, severity, vectorString, cvssVersion }: StickyHeaderProps) {
  const handleCopyVector = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#${vectorString}`;
    navigator.clipboard.writeText(shareUrl);
    
    // Show a temporary tooltip
    const tooltip = document.createElement('div');
    tooltip.textContent = 'Copied!';
    tooltip.className = styles.copyTooltip;
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
      tooltip.remove();
    }, 2000);
  }

  return (
    <div className={styles.stickyHeader}>
      <div className={styles.stickyContent}>
        <div className={styles.scoreSection}>
          <span className={styles.version}>CVSS {cvssVersion}</span>
          <div className={`${styles.scoreIndicator} ${styles[`score${severity}`]}`}>
            <span className={styles.scoreValue}>{score.toFixed(1)}</span>
            <span className={styles.severityLabel}>{severity}</span>
          </div>
        </div>
        
        <div className={styles.vectorSection} onClick={handleCopyVector}>
          <span className={styles.vectorLabel}>Vector:</span>
          <code className={styles.vectorCode}>{vectorString}</code>
          <span className={styles.copyIcon}>📋</span>
        </div>
      </div>
    </div>
  )
}