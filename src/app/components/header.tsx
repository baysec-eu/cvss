"use client"
import React from 'react'
import styles from '../page.module.css'
import ThemeToggle from './theme-toggle'
import { useTheme } from '../contexts/theme-context'

interface HeaderProps {
  cvssVersion: '3.1' | '4.0'
  setCvssVersion: (version: '3.1' | '4.0') => void
}

export default function Header({ cvssVersion, setCvssVersion }: HeaderProps) {
  const { theme } = useTheme()
  
  return (
    <header className={styles.appHeader}>
      <div className={styles.headerLeft}>
        <a href="https://baysec.eu" target="_blank" rel="noopener noreferrer" className={styles.logoLink}>
          <img 
            src={theme === 'light' ? "/logo-lightmode.svg" : "/logo.svg"}
            alt="Baysec Cybersecurity" 
            className={styles.baysecLogo}
          />
        </a>
      </div>
      <div className={styles.headerCenter}>
        <div className={styles.versionButtons}>
          <button
            className={`${styles.btn} ${cvssVersion === '3.1' ? styles.btnSelected : styles.btnUnselected}`}
            onClick={() => setCvssVersion('3.1')}
          >
            <span className={styles.versionLabel}>CVSS v3.1</span>
            <span className={styles.versionDesc}>Industry Standard</span>
          </button>
          <button
            className={`${styles.btn} ${cvssVersion === '4.0' ? styles.btnSelected : styles.btnUnselected}`}
            onClick={() => setCvssVersion('4.0')}
          >
            <span className={styles.versionLabel}>CVSS v4.0</span>
            <span className={styles.versionDesc}>Latest Version</span>
          </button>
        </div>
      </div>
      <div className={styles.headerRight}>
        <ThemeToggle />
      </div>
    </header>
  )
}