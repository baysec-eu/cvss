"use client"
import React from 'react'
import { useTheme } from '../contexts/theme-context'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <path d="m12 1-1.5 1.5L12 4l1.5-1.5L12 1zM12 20l-1.5 1.5L12 23l1.5-1.5L12 20zM4.22 4.22l1.5 1.5-1.5 1.5-1.5-1.5 1.5-1.5zM18.36 18.36l1.5 1.5-1.5 1.5-1.5-1.5 1.5-1.5zM1 12l1.5-1.5L4 12l-1.5 1.5L1 12zM20 12l1.5-1.5L23 12l-1.5 1.5L20 12zM4.22 19.78l1.5-1.5 1.5 1.5-1.5 1.5-1.5-1.5zM18.36 5.64l1.5-1.5 1.5 1.5-1.5 1.5-1.5-1.5z" />
        </svg>
      )}
    </button>
  )
}