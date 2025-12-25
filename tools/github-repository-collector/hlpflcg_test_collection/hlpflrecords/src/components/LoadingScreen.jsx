'use client'

import { useEffect, useState } from 'react'
import Logo from './Logo'
import styles from '../styles/Loading.module.css'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Increment progress with slight randomness for natural feel
        const increment = Math.random() * 15 + 5
        return Math.min(prev + increment, 100)
      })
    }, 100)

    // Hide loading screen after completion
    const timer = setTimeout(() => {
      const loader = document.getElementById('loading-screen')
      if (loader) {
        loader.style.opacity = '0'
        setTimeout(() => {
          loader.style.display = 'none'
        }, 500)
      }
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [])

  return (
    <div id="loading-screen" className={styles['loading-screen']}>
      <div className={styles['loading-content']}>
        <Logo width={80} height={80} className={styles['loading-logo']} />
        <div className={styles['loading-text']}>Loading HLPFL Records...</div>
        
        {/* Progress Bar */}
        <div className={styles['progress-container']}>
          <div 
            className={styles['progress-bar']}
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Progress Percentage */}
        <div className={styles['progress-text']}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen