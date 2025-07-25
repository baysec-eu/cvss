"use client"

import React, { useState, useEffect, useMemo } from 'react'

import Header from '@/app/components/header'
import HeaderBar from '@/app/components/header-bar'
import MetricsSelector from '@/app/components/metric-selector'
import CVSSComparison from '@/app/components/cvss-comparison'
import CVSSHelp from '@/app/components/cvss-help'
import { 
  calculateCvss31BaseScore, 
  calculateCvss31Temporal, 
  calculateCvss31Environmental, 
  calculateCvss40BaseScore, 
  calculateCvss40Temporal, 
  calculateCvss40Environmental, 
  calculateOverallScore,
  cvssSeverityFromScore, 
  generateCvssVector,
  type CVSS31CalculationInput,
  type CVSS40CalculationInput,
  validateCvssCalculations 
} from '../../lib/cvss'

import styles from "./page.module.css"

export default function HomePage() {
  const [cvssVersion, setCvssVersion] = useState<'3.1' | '4.0'>('3.1')
  const [attackVector, setAttackVector] = useState<'N' | 'A' | 'L' | 'P'>('N')
  const [attackComplexity, setAttackComplexity] = useState<'L' | 'H'>('L')
  const [privilegesRequired, setPrivilegesRequired] = useState<'N' | 'L' | 'H'>('N')
  const [userInteraction, setUserInteraction] = useState<'N' | 'R'>('N')
  const [scope, setScope] = useState<'U' | 'C'>('U')
  const [confidentiality, setConfidentiality] = useState<'N' | 'L' | 'H'>('N')
  const [integrity, setIntegrity] = useState<'N' | 'L' | 'H'>('N')
  const [availability, setAvailability] = useState<'N' | 'L' | 'H'>('N')

  const [attackRequirements, setAttackRequirements] = useState<'N' | 'P'>('N')
  const [subsequentSystemConfidentiality, setSubsequentSystemConfidentiality] = useState<'N' | 'L' | 'H'>('N')
  const [subsequentSystemIntegrity, setSubsequentSystemIntegrity] = useState<'N' | 'L' | 'H'>('N')
  const [subsequentSystemAvailability, setSubsequentSystemAvailability] = useState<'N' | 'L' | 'H'>('N')
  const [exploitMaturity, setExploitMaturity] = useState<'X' | 'U' | 'P' | 'F' | 'H'>('X')
  const [confidentialityRequirement, setConfidentialityRequirement] = useState<'X' | 'L' | 'M' | 'H'>('X')
  const [integrityRequirement, setIntegrityRequirement] = useState<'X' | 'L' | 'M' | 'H'>('X')
  const [availabilityRequirement, setAvailabilityRequirement] = useState<'X' | 'L' | 'M' | 'H'>('X')

  // CVSS 3.1 Temporal and Environmental metrics
  const [exploitCodeMaturity, setExploitCodeMaturity] = useState<'X' | 'U' | 'P' | 'F' | 'H'>('X')
  const [remediationLevel, setRemediationLevel] = useState<'X' | 'O' | 'T' | 'W' | 'U'>('X')
  const [reportConfidence, setReportConfidence] = useState<'X' | 'U' | 'R' | 'C'>('X')
  const [modifiedAttackVector, setModifiedAttackVector] = useState<'X' | 'N' | 'A' | 'L' | 'P'>('X')
  const [modifiedAttackComplexity, setModifiedAttackComplexity] = useState<'X' | 'L' | 'H'>('X')
  const [modifiedPrivilegesRequired, setModifiedPrivilegesRequired] = useState<'X' | 'N' | 'L' | 'H'>('X')
  const [modifiedUserInteraction, setModifiedUserInteraction] = useState<'X' | 'N' | 'R'>('X')
  const [modifiedScope, setModifiedScope] = useState<'X' | 'U' | 'C'>('X')
  const [modifiedConfidentiality, setModifiedConfidentiality] = useState<'X' | 'N' | 'L' | 'H'>('X')
  const [modifiedIntegrity, setModifiedIntegrity] = useState<'X' | 'N' | 'L' | 'H'>('X')
  const [modifiedAvailability, setModifiedAvailability] = useState<'X' | 'N' | 'L' | 'H'>('X')
  const [confidentialityRequirement31, setConfidentialityRequirement31] = useState<'X' | 'L' | 'M' | 'H'>('X')
  const [integrityRequirement31, setIntegrityRequirement31] = useState<'X' | 'L' | 'M' | 'H'>('X')
  const [availabilityRequirement31, setAvailabilityRequirement31] = useState<'X' | 'L' | 'M' | 'H'>('X')


  const [baseScore, setBaseScore] = useState<number>(0.0)
  const [temporalScore, setTemporalScore] = useState<number>(0.0)
  const [environmentalScore, setEnvironmentalScore] = useState<number>(0.0)
  const [overallScore, setOverallScore] = useState<number>(0.0)
  const [severity, setSeverity] = useState<string>('None')
  const [overallSeverity, setOverallSeverity] = useState<string>('None')
  const [showComparison, setShowComparison] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  // Validate calculations on component mount
  useEffect(() => {
    validateCvssCalculations()
  }, [])

  useEffect(() => {
    let newScore = 0
    
    if (cvssVersion === '3.1') {
      const cvss31Input: CVSS31CalculationInput = {
        attackVector,
        attackComplexity,
        privilegesRequired,
        userInteraction,
        scope,
        confidentiality,
        integrity,
        availability,
        exploitCodeMaturity,
        remediationLevel,
        reportConfidence,
        modifiedAttackVector,
        modifiedAttackComplexity,
        modifiedPrivilegesRequired,
        modifiedUserInteraction,
        modifiedScope,
        modifiedConfidentiality,
        modifiedIntegrity,
        modifiedAvailability,
        confidentialityRequirement: confidentialityRequirement31,
        integrityRequirement: integrityRequirement31,
        availabilityRequirement: availabilityRequirement31,
      }
      
      newScore = calculateCvss31BaseScore(cvss31Input)
      
      // Calculate CVSS 3.1 temporal score
      if (exploitCodeMaturity !== 'X' || remediationLevel !== 'X' || reportConfidence !== 'X') {
        setTemporalScore(calculateCvss31Temporal(newScore, cvss31Input))
      } else {
        setTemporalScore(0)
      }
      
      // Calculate CVSS 3.1 environmental score
      if (confidentialityRequirement31 !== 'X' || integrityRequirement31 !== 'X' || availabilityRequirement31 !== 'X' ||
          modifiedAttackVector !== 'X' || modifiedAttackComplexity !== 'X' || modifiedPrivilegesRequired !== 'X' ||
          modifiedUserInteraction !== 'X' || modifiedScope !== 'X' || modifiedConfidentiality !== 'X' ||
          modifiedIntegrity !== 'X' || modifiedAvailability !== 'X') {
        setEnvironmentalScore(calculateCvss31Environmental(newScore, cvss31Input))
      } else {
        setEnvironmentalScore(0)
      }
    } else {
      const cvss40Input: CVSS40CalculationInput = {
        attackVector,
        attackComplexity,
        privilegesRequired,
        userInteraction,
        scope,
        confidentiality,
        integrity,
        availability,
        attackRequirements,
        subsequentSystemConfidentiality,
        subsequentSystemIntegrity,
        subsequentSystemAvailability,
        exploitMaturity,
        confidentialityRequirement,
        integrityRequirement,
        availabilityRequirement,
      }
      newScore = calculateCvss40BaseScore(cvss40Input)
      setTemporalScore(calculateCvss40Temporal(newScore, cvss40Input))
      setEnvironmentalScore(calculateCvss40Environmental(newScore, cvss40Input))
    }
    
    setBaseScore(newScore)
    setSeverity(cvssSeverityFromScore(newScore))
    
    // Calculate overall score
    const newOverallScore = calculateOverallScore(newScore, temporalScore > 0 ? temporalScore : undefined, environmentalScore > 0 ? environmentalScore : undefined)
    setOverallScore(newOverallScore)
    setOverallSeverity(cvssSeverityFromScore(newOverallScore))
  }, [
    cvssVersion,
    attackVector,
    attackComplexity,
    privilegesRequired,
    userInteraction,
    scope,
    confidentiality,
    integrity,
    availability,
    attackRequirements,
    subsequentSystemConfidentiality,
    subsequentSystemIntegrity,
    subsequentSystemAvailability,
    exploitMaturity,
    confidentialityRequirement,
    integrityRequirement,
    availabilityRequirement,
    exploitCodeMaturity,
    remediationLevel,
    reportConfidence,
    modifiedAttackVector,
    modifiedAttackComplexity,
    modifiedPrivilegesRequired,
    modifiedUserInteraction,
    modifiedScope,
    modifiedConfidentiality,
    modifiedIntegrity,
    modifiedAvailability,
    confidentialityRequirement31,
    integrityRequirement31,
    availabilityRequirement31,
  ])

  const vectorString = useMemo(() => {
    if (cvssVersion === '3.1') {
      return generateCvssVector('3.1', {
        attackVector,
        attackComplexity,
        privilegesRequired,
        userInteraction,
        scope,
        confidentiality,
        integrity,
        availability,
        exploitCodeMaturity,
        remediationLevel,
        reportConfidence,
        modifiedAttackVector,
        modifiedAttackComplexity,
        modifiedPrivilegesRequired,
        modifiedUserInteraction,
        modifiedScope,
        modifiedConfidentiality,
        modifiedIntegrity,
        modifiedAvailability,
        confidentialityRequirement: confidentialityRequirement31,
        integrityRequirement: integrityRequirement31,
        availabilityRequirement: availabilityRequirement31,
      })
    } else {
      return generateCvssVector('4.0', {
        attackVector,
        attackComplexity,
        privilegesRequired,
        userInteraction,
        scope,
        confidentiality,
        integrity,
        availability,
        attackRequirements,
        subsequentSystemConfidentiality,
        subsequentSystemIntegrity,
        subsequentSystemAvailability,
        exploitMaturity,
        confidentialityRequirement,
        integrityRequirement,
        availabilityRequirement,
      })
    }
  }, [
    cvssVersion,
    attackVector,
    attackComplexity,
    privilegesRequired,
    userInteraction,
    scope,
    confidentiality,
    integrity,
    availability,
    attackRequirements,
    subsequentSystemConfidentiality,
    subsequentSystemIntegrity,
    subsequentSystemAvailability,
    exploitMaturity,
    confidentialityRequirement,
    integrityRequirement,
    availabilityRequirement,
  ])



  return (
    <div className="app">
      <div className={styles.container}>
        <Header />

        <div className={styles.headerBar}>
          <HeaderBar 
            baseScore={baseScore}
            temporalScore={temporalScore}
            environmentalScore={environmentalScore}
            overallScore={overallScore}
            severity={severity}
            overallSeverity={overallSeverity}
            cvssVersion={cvssVersion}
          />
        </div>
        
        <div className={styles.versionSelector}>
          <h3>CVSS Version</h3>
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

        <div 
          onClick={() => {
            navigator.clipboard.writeText(vectorString); 
            alert(`Copied to clipboard:\n${vectorString}`)
          }} 
          className={styles.vectorBar}
        >
          {vectorString}
        </div>

        <div className={styles.metrics}>
          <MetricsSelector
            cvssVersion={cvssVersion}
            attackVector={attackVector}
            setAttackVector={setAttackVector}
            attackComplexity={attackComplexity}
            setAttackComplexity={setAttackComplexity}
            privilegesRequired={privilegesRequired}
            setPrivilegesRequired={setPrivilegesRequired}
            userInteraction={userInteraction}
            setUserInteraction={setUserInteraction}
            scope={scope}
            setScope={setScope}
            confidentiality={confidentiality}
            setConfidentiality={setConfidentiality}
            integrity={integrity}
            setIntegrity={setIntegrity}
            availability={availability}
            setAvailability={setAvailability}
            attackRequirements={attackRequirements}
            setAttackRequirements={setAttackRequirements}
            subsequentSystemConfidentiality={subsequentSystemConfidentiality}
            setSubsequentSystemConfidentiality={setSubsequentSystemConfidentiality}
            subsequentSystemIntegrity={subsequentSystemIntegrity}
            setSubsequentSystemIntegrity={setSubsequentSystemIntegrity}
            subsequentSystemAvailability={subsequentSystemAvailability}
            setSubsequentSystemAvailability={setSubsequentSystemAvailability}
            exploitMaturity={exploitMaturity}
            setExploitMaturity={setExploitMaturity}
            confidentialityRequirement={confidentialityRequirement}
            setConfidentialityRequirement={setConfidentialityRequirement}
            integrityRequirement={integrityRequirement}
            setIntegrityRequirement={setIntegrityRequirement}
            availabilityRequirement={availabilityRequirement}
            setAvailabilityRequirement={setAvailabilityRequirement}
            
            // CVSS 3.1 Temporal and Environmental metrics
            exploitCodeMaturity={exploitCodeMaturity}
            setExploitCodeMaturity={setExploitCodeMaturity}
            remediationLevel={remediationLevel}
            setRemediationLevel={setRemediationLevel}
            reportConfidence={reportConfidence}
            setReportConfidence={setReportConfidence}
            modifiedAttackVector={modifiedAttackVector}
            setModifiedAttackVector={setModifiedAttackVector}
            modifiedAttackComplexity={modifiedAttackComplexity}
            setModifiedAttackComplexity={setModifiedAttackComplexity}
            modifiedPrivilegesRequired={modifiedPrivilegesRequired}
            setModifiedPrivilegesRequired={setModifiedPrivilegesRequired}
            modifiedUserInteraction={modifiedUserInteraction}
            setModifiedUserInteraction={setModifiedUserInteraction}
            modifiedScope={modifiedScope}
            setModifiedScope={setModifiedScope}
            modifiedConfidentiality={modifiedConfidentiality}
            setModifiedConfidentiality={setModifiedConfidentiality}
            modifiedIntegrity={modifiedIntegrity}
            setModifiedIntegrity={setModifiedIntegrity}
            modifiedAvailability={modifiedAvailability}
            setModifiedAvailability={setModifiedAvailability}
            confidentialityRequirement31={confidentialityRequirement31}
            setConfidentialityRequirement31={setConfidentialityRequirement31}
            integrityRequirement31={integrityRequirement31}
            setIntegrityRequirement31={setIntegrityRequirement31}
            availabilityRequirement31={availabilityRequirement31}
            setAvailabilityRequirement31={setAvailabilityRequirement31}
          />

  
        </div>


        {/* Help and Comparison Toggles */}
        <div className={styles.comparisonToggle}>
          <button
            className={`${styles.btn} ${showHelp ? styles.btnSelected : styles.btnUnselected}`}
            onClick={() => setShowHelp(!showHelp)}
            style={{ marginRight: '12px' }}
          >
            {showHelp ? '❓ Hide' : '❓ Show'} CVSS Guide
          </button>
          <button
            className={`${styles.btn} ${showComparison ? styles.btnSelected : styles.btnUnselected}`}
            onClick={() => setShowComparison(!showComparison)}
          >
            {showComparison ? '📊 Hide' : '📊 Show'} Version Comparison
          </button>
        </div>

        {/* CVSS Help Guide */}
        {showHelp && (
          <CVSSHelp cvssVersion={cvssVersion} />
        )}
        
        {/* CVSS Comparison */}
        {showComparison && (
          <CVSSComparison
            cvss31Input={{
              attackVector,
              attackComplexity,
              privilegesRequired,
              userInteraction,
              scope,
              confidentiality,
              integrity,
              availability,
            }}
            cvss40Input={{
              attackVector,
              attackComplexity,
              privilegesRequired,
              userInteraction,
              scope,
              confidentiality,
              integrity,
              availability,
              attackRequirements,
              subsequentSystemConfidentiality,
              subsequentSystemIntegrity,
              subsequentSystemAvailability,
              exploitMaturity,
              confidentialityRequirement,
              integrityRequirement,
              availabilityRequirement,
            }}
          />
        )}
      </div>
    </div> 
  )
}
