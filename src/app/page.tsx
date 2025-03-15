"use client"

import React, { useState, useEffect, useMemo } from 'react'

import HeaderBar from '@/app/components/header-bar'
import AdditionalFields from '@/app/components/additional-fields'
import FindingsTable from '@/app/components/findings-table'
import MetricsSelector from '@/app/components/metric-selector'
import { calculateCvss31BaseScore, cvssSeverityFromScore } from '../../lib/cvss'

import { handleExportHtml } from "../../lib/download"
import styles from "./page.module.css"
import { Finding } from '../../types/finding'

export default function HomePage() {
  const [attackVector, setAttackVector] = useState<'N' | 'A' | 'L' | 'P'>('N')
  const [attackComplexity, setAttackComplexity] = useState<'L' | 'H'>('L')
  const [privilegesRequired, setPrivilegesRequired] = useState<'N' | 'L' | 'H'>('N')
  const [userInteraction, setUserInteraction] = useState<'N' | 'R'>('N')
  const [scope, setScope] = useState<'U' | 'C'>('U')
  const [confidentiality, setConfidentiality] = useState<'N' | 'L' | 'H'>('N')
  const [integrity, setIntegrity] = useState<'N' | 'L' | 'H'>('N')
  const [availability, setAvailability] = useState<'N' | 'L' | 'H'>('N')

  const [nazwa, setNazwa] = useState('')
  const [opis, setOpis] = useState('')
  const [obserwacje, setObserwacje] = useState('')
  const [zakres, setZakres] = useState('')
  const [referencje, setReferencje] = useState('')
  const [prawdopodobienstwo, setPrawdopodobienstwo] = useState('')
  const [ryzyko, setRyzyko] = useState('')
  const [impakt, setImpakt] = useState('')

  const [baseScore, setBaseScore] = useState<number>(0.0)
  const [severity, setSeverity] = useState<string>('None')
  const [findings, setFindings] = useState<Finding[]>([])

  useEffect(() => {
    const newScore = calculateCvss31BaseScore({
      attackVector,
      attackComplexity,
      privilegesRequired,
      userInteraction,
      scope,
      confidentiality,
      integrity,
      availability,
    })
    setBaseScore(newScore)
    setSeverity(cvssSeverityFromScore(newScore))
  }, [
    attackVector,
    attackComplexity,
    privilegesRequired,
    userInteraction,
    scope,
    confidentiality,
    integrity,
    availability,
  ])

  const vectorString = useMemo(() => {
    return `CVSS:3.1/AV:${attackVector}/AC:${attackComplexity}/PR:${privilegesRequired}/UI:${userInteraction}/S:${scope}/C:${confidentiality}/I:${integrity}/A:${availability}`
  }, [
    attackVector,
    attackComplexity,
    privilegesRequired,
    userInteraction,
    scope,
    confidentiality,
    integrity,
    availability,
  ])

  const handleAddFinding = () => {
    const newFinding: Finding = {
      attackVector,
      attackComplexity,
      privilegesRequired,
      userInteraction,
      scope,
      confidentiality,
      integrity,
      availability,
      nazwa,
      opis,
      zakres,
      referencje,
      obserwacje,
      score: baseScore,
      severity,
      prawdopodobienstwo,
      ryzyko,
      impakt
    }
    setFindings((prev) => [...prev, newFinding])

    setNazwa('')
    setOpis('')
    setObserwacje('')
  }

  return (
    <div className="app">
      <div className={styles.container}>
        <div className={styles.headerBar}>
          <HeaderBar 
            baseScore={baseScore}
            severity={severity}
          />
        </div>

        <div className={styles.metrics}>
          <MetricsSelector
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
          />

          <AdditionalFields
            nazwa={nazwa}
            setNazwa={setNazwa}
            opis={opis}
            setOpis={setOpis}
            obserwacje={obserwacje}
            setObserwacje={setObserwacje}
            onAddFinding={handleAddFinding}
            zakres={zakres}
            setZakres={setZakres}
            prawdopodobienstwo={prawdopodobienstwo}
            setPrawdopodobienstwo={setPrawdopodobienstwo}
            ryzyko={ryzyko}
            setRyzyko={setRyzyko}
            impakt={impakt}
            setImpakt={setImpakt}
            referencje={referencje}
            setReferencje={setReferencje}
          />
        </div>

        <div className="vectorBar">
          Vector String - {vectorString}
        </div>

        <h3 style={{ marginTop: 30 }}>Findings</h3>
        <FindingsTable findings={findings} />

        <button className={[styles.btn, styles.btnSelected].join(" ")} onClick={() => handleExportHtml(findings)}>Download Findings</button>
      </div>
    </div> 
  )
}
