"use client"
import React from 'react'
import styles from '../page.module.css'
import ThemeToggle from './theme-toggle'
import { useTheme } from '../contexts/theme-context'

export default function Header() {
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
      <div className={styles.headerRight}>
        <ThemeToggle />
      </div>
    </header>
  )
}