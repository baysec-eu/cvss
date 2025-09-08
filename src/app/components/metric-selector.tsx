"use client"
import React from "react"
import styles from "../page.module.css"

type AttackVector = "N" | "A" | "L" | "P"
type AttackComplexity = "L" | "H"
type PrivilegesRequired = "N" | "L" | "H"
type UserInteraction = "N" | "R"
type Scope = "U" | "C"
type Confidentiality = "N" | "L" | "H"
type Integrity = "N" | "L" | "H"
type Availability = "N" | "L" | "H"

interface MetricsSelectorProps {
  cvssVersion: '3.1' | '4.0'
  attackVector: AttackVector
  setAttackVector: (val: AttackVector) => void
  attackComplexity: AttackComplexity
  setAttackComplexity: (val: AttackComplexity) => void
  privilegesRequired: PrivilegesRequired
  setPrivilegesRequired: (val: PrivilegesRequired) => void
  userInteraction: UserInteraction
  setUserInteraction: (val: UserInteraction) => void
  scope: Scope
  setScope: (val: Scope) => void
  confidentiality: Confidentiality
  setConfidentiality: (val: Confidentiality) => void
  integrity: Integrity
  setIntegrity: (val: Integrity) => void
  availability: Availability
  setAvailability: (val: Availability) => void
  
  // CVSS 4.0 specific props
  attackRequirements?: 'N' | 'P'
  setAttackRequirements?: (val: 'N' | 'P') => void
  subsequentSystemConfidentiality?: 'N' | 'L' | 'H'
  setSubsequentSystemConfidentiality?: (val: 'N' | 'L' | 'H') => void
  subsequentSystemIntegrity?: 'N' | 'L' | 'H'
  setSubsequentSystemIntegrity?: (val: 'N' | 'L' | 'H') => void
  subsequentSystemAvailability?: 'N' | 'L' | 'H'
  setSubsequentSystemAvailability?: (val: 'N' | 'L' | 'H') => void
  exploitMaturity?: 'X' | 'U' | 'P' | 'F' | 'H'
  setExploitMaturity?: (val: 'X' | 'U' | 'P' | 'F' | 'H') => void
  confidentialityRequirement?: 'X' | 'L' | 'M' | 'H'
  setConfidentialityRequirement?: (val: 'X' | 'L' | 'M' | 'H') => void
  integrityRequirement?: 'X' | 'L' | 'M' | 'H'
  setIntegrityRequirement?: (val: 'X' | 'L' | 'M' | 'H') => void
  availabilityRequirement?: 'X' | 'L' | 'M' | 'H'
  setAvailabilityRequirement?: (val: 'X' | 'L' | 'M' | 'H') => void
  
  // CVSS 3.1 temporal and environmental props
  exploitCodeMaturity?: 'X' | 'U' | 'P' | 'F' | 'H'
  setExploitCodeMaturity?: (val: 'X' | 'U' | 'P' | 'F' | 'H') => void
  remediationLevel?: 'X' | 'O' | 'T' | 'W' | 'U'
  setRemediationLevel?: (val: 'X' | 'O' | 'T' | 'W' | 'U') => void
  reportConfidence?: 'X' | 'U' | 'R' | 'C'
  setReportConfidence?: (val: 'X' | 'U' | 'R' | 'C') => void
  modifiedAttackVector?: 'X' | 'N' | 'A' | 'L' | 'P'
  setModifiedAttackVector?: (val: 'X' | 'N' | 'A' | 'L' | 'P') => void
  modifiedAttackComplexity?: 'X' | 'L' | 'H'
  setModifiedAttackComplexity?: (val: 'X' | 'L' | 'H') => void
  modifiedPrivilegesRequired?: 'X' | 'N' | 'L' | 'H'
  setModifiedPrivilegesRequired?: (val: 'X' | 'N' | 'L' | 'H') => void
  modifiedUserInteraction?: 'X' | 'N' | 'R'
  setModifiedUserInteraction?: (val: 'X' | 'N' | 'R') => void
  modifiedScope?: 'X' | 'U' | 'C'
  setModifiedScope?: (val: 'X' | 'U' | 'C') => void
  modifiedConfidentiality?: 'X' | 'N' | 'L' | 'H'
  setModifiedConfidentiality?: (val: 'X' | 'N' | 'L' | 'H') => void
  modifiedIntegrity?: 'X' | 'N' | 'L' | 'H'
  setModifiedIntegrity?: (val: 'X' | 'N' | 'L' | 'H') => void
  modifiedAvailability?: 'X' | 'N' | 'L' | 'H'
  setModifiedAvailability?: (val: 'X' | 'N' | 'L' | 'H') => void
  confidentialityRequirement31?: 'X' | 'L' | 'M' | 'H'
  setConfidentialityRequirement31?: (val: 'X' | 'L' | 'M' | 'H') => void
  integrityRequirement31?: 'X' | 'L' | 'M' | 'H'
  setIntegrityRequirement31?: (val: 'X' | 'L' | 'M' | 'H') => void
  availabilityRequirement31?: 'X' | 'L' | 'M' | 'H'
  setAvailabilityRequirement31?: (val: 'X' | 'L' | 'M' | 'H') => void
}

export default function MetricsSelector({
  cvssVersion,
  attackVector,
  setAttackVector,
  attackComplexity,
  setAttackComplexity,
  privilegesRequired,
  setPrivilegesRequired,
  userInteraction,
  setUserInteraction,
  scope,
  setScope,
  confidentiality,
  setConfidentiality,
  integrity,
  setIntegrity,
  availability,
  setAvailability,
  attackRequirements,
  setAttackRequirements,
  subsequentSystemConfidentiality,
  setSubsequentSystemConfidentiality,
  subsequentSystemIntegrity,
  setSubsequentSystemIntegrity,
  subsequentSystemAvailability,
  setSubsequentSystemAvailability,
  exploitMaturity,
  setExploitMaturity,
  confidentialityRequirement,
  setConfidentialityRequirement,
  integrityRequirement,
  setIntegrityRequirement,
  availabilityRequirement,
  setAvailabilityRequirement,
  // CVSS 3.1 temporal and environmental
  exploitCodeMaturity,
  setExploitCodeMaturity,
  remediationLevel,
  setRemediationLevel,
  reportConfidence,
  setReportConfidence,
  modifiedAttackVector,
  setModifiedAttackVector,
  modifiedAttackComplexity,
  setModifiedAttackComplexity,
  modifiedPrivilegesRequired,
  setModifiedPrivilegesRequired,
  modifiedUserInteraction,
  setModifiedUserInteraction,
  modifiedScope,
  setModifiedScope,
  modifiedConfidentiality,
  setModifiedConfidentiality,
  modifiedIntegrity,
  setModifiedIntegrity,
  modifiedAvailability,
  setModifiedAvailability,
  confidentialityRequirement31,
  setConfidentialityRequirement31,
  integrityRequirement31,
  setIntegrityRequirement31,
  availabilityRequirement31,
  setAvailabilityRequirement31,
}: MetricsSelectorProps) {
  
  function btnClass(isSelected: boolean) {
    return isSelected ? styles.btnSelected : styles.btnUnselected
  }

  const renderMetricGroup = (title: string, tooltip: string, icon: string, children: React.ReactNode) => (
    <div className={styles.metricGroup}>
      <h4 className={styles.metricTitle}>
        {icon} {title}
        <span className={styles.metricTooltip}>{tooltip}</span>
      </h4>
      <div className={styles.metricButtons}>
        {children}
      </div>
    </div>
  )

  return (
    <div className={styles.metricsContainer}>
      <div className={cvssVersion === '4.0' ? styles.metricsGridV4 : styles.metricsGrid}>
        {/* Exploitability Metrics */}
        <div className={styles.metricsSection}>
          <h4 className={styles.sectionTitle}>🚀 Exploitability Metrics</h4>
          
          {renderMetricGroup(
            "Attack Vector (AV)",
            "How the vulnerability is exploited",
            "🌐",
            <>
              <button
                className={`${styles.btn} ${btnClass(attackVector === "N")}`}
                onClick={() => setAttackVector("N")}
                title="Remotely exploitable over a network"
              >
                <span className={styles.btnIcon}>🌐</span>
                <span className={styles.btnLabel}>Network</span>
                <span className={styles.btnCode}>(N)</span>
              </button>
              <button
                className={`${styles.btn} ${btnClass(attackVector === "A")}`}
                onClick={() => setAttackVector("A")}
                title="Adjacent network access required"
              >
                <span className={styles.btnIcon}>📡</span>
                <span className={styles.btnLabel}>Adjacent</span>
                <span className={styles.btnCode}>(A)</span>
              </button>
              <button
                className={`${styles.btn} ${btnClass(attackVector === "L")}`}
                onClick={() => setAttackVector("L")}
                title="Local access required"
              >
                <span className={styles.btnIcon}>💻</span>
                <span className={styles.btnLabel}>Local</span>
                <span className={styles.btnCode}>(L)</span>
              </button>
              <button
                className={`${styles.btn} ${btnClass(attackVector === "P")}`}
                onClick={() => setAttackVector("P")}
                title="Physical access required"
              >
                <span className={styles.btnIcon}>🔧</span>
                <span className={styles.btnLabel}>Physical</span>
                <span className={styles.btnCode}>(P)</span>
              </button>
            </>
          )}

          {renderMetricGroup(
            "Attack Complexity (AC)",
            "Conditions beyond attacker's control",
            "🧩",
            <>
              <button
                className={`${styles.btn} ${btnClass(attackComplexity === "L")}`}
                onClick={() => setAttackComplexity("L")}
                title="No special conditions required"
              >
                <span className={styles.btnIcon}>⚡</span>
                <span className={styles.btnLabel}>Low</span>
                <span className={styles.btnCode}>(L)</span>
              </button>
              <button
                className={`${styles.btn} ${btnClass(attackComplexity === "H")}`}
                onClick={() => setAttackComplexity("H")}
                title="Special conditions must exist"
              >
                <span className={styles.btnIcon}>🎯</span>
                <span className={styles.btnLabel}>High</span>
                <span className={styles.btnCode}>(H)</span>
              </button>
            </>
          )}

          {cvssVersion === '4.0' && setAttackRequirements && (
            renderMetricGroup(
              "Attack Requirements (AT)",
              "Deployment conditions required",
              "⚙️",
              <>
                <button
                  className={`${styles.btn} ${btnClass(attackRequirements === "N")}`}
                  onClick={() => setAttackRequirements("N")}
                  title="No specific deployment conditions"
                >
                  <span className={styles.btnIcon}>✅</span>
                  <span className={styles.btnLabel}>None</span>
                  <span className={styles.btnCode}>(N)</span>
                </button>
                <button
                  className={`${styles.btn} ${btnClass(attackRequirements === "P")}`}
                  onClick={() => setAttackRequirements("P")}
                  title="Specific deployment conditions required"
                >
                  <span className={styles.btnIcon}>🔧</span>
                  <span className={styles.btnLabel}>Present</span>
                  <span className={styles.btnCode}>(P)</span>
                </button>
              </>
            )
          )}

          {renderMetricGroup(
            "Privileges Required (PR)",
            "Level of access needed before attack",
            "🔑",
            <>
              <button
                className={`${styles.btn} ${btnClass(privilegesRequired === "N")}`}
                onClick={() => setPrivilegesRequired("N")}
                title="No privileges required"
              >
                <span className={styles.btnIcon}>🚫</span>
                <span className={styles.btnLabel}>None</span>
                <span className={styles.btnCode}>(N)</span>
              </button>
              <button
                className={`${styles.btn} ${btnClass(privilegesRequired === "L")}`}
                onClick={() => setPrivilegesRequired("L")}
                title="Basic user privileges required"
              >
                <span className={styles.btnIcon}>👤</span>
                <span className={styles.btnLabel}>Low</span>
                <span className={styles.btnCode}>(L)</span>
              </button>
              <button
                className={`${styles.btn} ${btnClass(privilegesRequired === "H")}`}
                onClick={() => setPrivilegesRequired("H")}
                title="Administrative privileges required"
              >
                <span className={styles.btnIcon}>👑</span>
                <span className={styles.btnLabel}>High</span>
                <span className={styles.btnCode}>(H)</span>
              </button>
            </>
          )}

          {renderMetricGroup(
            "User Interaction (UI)",
            "Human user participation required",
            "👥",
            <>
              <button
                className={`${styles.btn} ${btnClass(userInteraction === "N")}`}
                onClick={() => setUserInteraction("N")}
                title="No user interaction required"
              >
                <span className={styles.btnIcon}>🤖</span>
                <span className={styles.btnLabel}>None</span>
                <span className={styles.btnCode}>(N)</span>
              </button>
              <button
                className={`${styles.btn} ${btnClass(userInteraction === "R")}`}
                onClick={() => setUserInteraction("R")}
                title="User interaction required"
              >
                <span className={styles.btnIcon}>👆</span>
                <span className={styles.btnLabel}>Required</span>
                <span className={styles.btnCode}>(R)</span>
              </button>
            </>
          )}
        </div>

        {/* Scope and Impact Metrics */}
        <div className={styles.metricsSection}>
          <h4 className={styles.sectionTitle}>🎯 Scope & Impact</h4>
          
          {renderMetricGroup(
            "Scope (S)",
            "Impact beyond vulnerable component",
            "📊",
            <>
              <button
                className={`${styles.btn} ${btnClass(scope === "U")}`}
                onClick={() => setScope("U")}
                title="Impact limited to vulnerable component"
              >
                <span className={styles.btnIcon}>📦</span>
                <span className={styles.btnLabel}>Unchanged</span>
                <span className={styles.btnCode}>(U)</span>
              </button>
              <button
                className={`${styles.btn} ${btnClass(scope === "C")}`}
                onClick={() => setScope("C")}
                title="Impact extends beyond vulnerable component"
              >
                <span className={styles.btnIcon}>🌐</span>
                <span className={styles.btnLabel}>Changed</span>
                <span className={styles.btnCode}>(C)</span>
              </button>
            </>
          )}

          {cvssVersion === '3.1' ? (
            <>
              {renderMetricGroup(
                "Confidentiality Impact (C)",
                "Information disclosure impact",
                "🔒",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(confidentiality === "N")}`}
                    onClick={() => setConfidentiality("N")}
                    title="No confidentiality impact"
                  >
                    <span className={styles.btnIcon}>✅</span>
                    <span className={styles.btnLabel}>None</span>
                    <span className={styles.btnCode}>(N)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(confidentiality === "L")}`}
                    onClick={() => setConfidentiality("L")}
                    title="Limited confidentiality impact"
                  >
                    <span className={styles.btnIcon}>🔓</span>
                    <span className={styles.btnLabel}>Low</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(confidentiality === "H")}`}
                    onClick={() => setConfidentiality("H")}
                    title="Total confidentiality loss"
                  >
                    <span className={styles.btnIcon}>💥</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                </>
              )}

              {renderMetricGroup(
                "Integrity Impact (I)",
                "Data modification impact",
                "✏️",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(integrity === "N")}`}
                    onClick={() => setIntegrity("N")}
                    title="No integrity impact"
                  >
                    <span className={styles.btnIcon}>✅</span>
                    <span className={styles.btnLabel}>None</span>
                    <span className={styles.btnCode}>(N)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(integrity === "L")}`}
                    onClick={() => setIntegrity("L")}
                    title="Limited integrity impact"
                  >
                    <span className={styles.btnIcon}>📝</span>
                    <span className={styles.btnLabel}>Low</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(integrity === "H")}`}
                    onClick={() => setIntegrity("H")}
                    title="Complete integrity loss"
                  >
                    <span className={styles.btnIcon}>💥</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                </>
              )}

              {renderMetricGroup(
                "Availability Impact (A)",
                "Service disruption impact",
                "⚡",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(availability === "N")}`}
                    onClick={() => setAvailability("N")}
                    title="No availability impact"
                  >
                    <span className={styles.btnIcon}>✅</span>
                    <span className={styles.btnLabel}>None</span>
                    <span className={styles.btnCode}>(N)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(availability === "L")}`}
                    onClick={() => setAvailability("L")}
                    title="Limited availability impact"
                  >
                    <span className={styles.btnIcon}>⏳</span>
                    <span className={styles.btnLabel}>Low</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(availability === "H")}`}
                    onClick={() => setAvailability("H")}
                    title="Complete availability loss"
                  >
                    <span className={styles.btnIcon}>💥</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                </>
              )}
            </>
          ) : (
            <>
              {/* CVSS 4.0 Vulnerable System Impact */}
              <div className={styles.impactSubsection}>
                <h5 className={styles.subsectionTitle}>Vulnerable System Impact</h5>
                
                {renderMetricGroup(
                  "Vulnerable System Confidentiality (VC)",
                  "Confidentiality impact on vulnerable system",
                  "🔒",
                  <>
                    <button
                      className={`${styles.btn} ${btnClass(confidentiality === "H")}`}
                      onClick={() => setConfidentiality("H")}
                      title="Total confidentiality loss"
                    >
                      <span className={styles.btnIcon}>💥</span>
                      <span className={styles.btnLabel}>High</span>
                      <span className={styles.btnCode}>(H)</span>
                    </button>
                    <button
                      className={`${styles.btn} ${btnClass(confidentiality === "L")}`}
                      onClick={() => setConfidentiality("L")}
                      title="Limited confidentiality impact"
                    >
                      <span className={styles.btnIcon}>🔓</span>
                      <span className={styles.btnLabel}>Low</span>
                      <span className={styles.btnCode}>(L)</span>
                    </button>
                    <button
                      className={`${styles.btn} ${btnClass(confidentiality === "N")}`}
                      onClick={() => setConfidentiality("N")}
                      title="No confidentiality impact"
                    >
                      <span className={styles.btnIcon}>✅</span>
                      <span className={styles.btnLabel}>None</span>
                      <span className={styles.btnCode}>(N)</span>
                    </button>
                  </>
                )}

                {renderMetricGroup(
                  "Vulnerable System Integrity (VI)",
                  "Integrity impact on vulnerable system",
                  "✏️",
                  <>
                    <button
                      className={`${styles.btn} ${btnClass(integrity === "H")}`}
                      onClick={() => setIntegrity("H")}
                      title="Complete integrity loss"
                    >
                      <span className={styles.btnIcon}>💥</span>
                      <span className={styles.btnLabel}>High</span>
                      <span className={styles.btnCode}>(H)</span>
                    </button>
                    <button
                      className={`${styles.btn} ${btnClass(integrity === "L")}`}
                      onClick={() => setIntegrity("L")}
                      title="Limited integrity impact"
                    >
                      <span className={styles.btnIcon}>📝</span>
                      <span className={styles.btnLabel}>Low</span>
                      <span className={styles.btnCode}>(L)</span>
                    </button>
                    <button
                      className={`${styles.btn} ${btnClass(integrity === "N")}`}
                      onClick={() => setIntegrity("N")}
                      title="No integrity impact"
                    >
                      <span className={styles.btnIcon}>✅</span>
                      <span className={styles.btnLabel}>None</span>
                      <span className={styles.btnCode}>(N)</span>
                    </button>
                  </>
                )}

                {renderMetricGroup(
                  "Vulnerable System Availability (VA)",
                  "Availability impact on vulnerable system",
                  "⚡",
                  <>
                    <button
                      className={`${styles.btn} ${btnClass(availability === "H")}`}
                      onClick={() => setAvailability("H")}
                      title="Complete availability loss"
                    >
                      <span className={styles.btnIcon}>💥</span>
                      <span className={styles.btnLabel}>High</span>
                      <span className={styles.btnCode}>(H)</span>
                    </button>
                    <button
                      className={`${styles.btn} ${btnClass(availability === "L")}`}
                      onClick={() => setAvailability("L")}
                      title="Limited availability impact"
                    >
                      <span className={styles.btnIcon}>⏳</span>
                      <span className={styles.btnLabel}>Low</span>
                      <span className={styles.btnCode}>(L)</span>
                    </button>
                    <button
                      className={`${styles.btn} ${btnClass(availability === "N")}`}
                      onClick={() => setAvailability("N")}
                      title="No availability impact"
                    >
                      <span className={styles.btnIcon}>✅</span>
                      <span className={styles.btnLabel}>None</span>
                      <span className={styles.btnCode}>(N)</span>
                    </button>
                  </>
                )}
              </div>

              {/* CVSS 4.0 Subsequent System Impact */}
              <div className={styles.impactSubsection}>
                <h5 className={styles.subsectionTitle}>Subsequent System Impact</h5>
                
                {renderMetricGroup(
                  "Subsequent System Confidentiality (SC)",
                  "Confidentiality impact on other systems",
                  "🔒",
                  <>
                    <button
                      className={`${styles.btn} ${btnClass(subsequentSystemConfidentiality === "H")}`}
                      onClick={() => setSubsequentSystemConfidentiality?.("H")}
                      title="High subsequent confidentiality impact"
                    >
                      <span className={styles.btnIcon}>💥</span>
                      <span className={styles.btnLabel}>High</span>
                      <span className={styles.btnCode}>(H)</span>
                    </button>
                    <button
                      className={`${styles.btn} ${btnClass(subsequentSystemConfidentiality === "L")}`}
                      onClick={() => setSubsequentSystemConfidentiality?.("L")}
                      title="Low subsequent confidentiality impact"
                    >
                      <span className={styles.btnIcon}>🔓</span>
                      <span className={styles.btnLabel}>Low</span>
                      <span className={styles.btnCode}>(L)</span>
                    </button>
                    <button
                      className={`${styles.btn} ${btnClass(subsequentSystemConfidentiality === "N")}`}
                      onClick={() => setSubsequentSystemConfidentiality?.("N")}
                      title="No subsequent confidentiality impact"
                    >
                      <span className={styles.btnIcon}>✅</span>
                      <span className={styles.btnLabel}>None</span>
                      <span className={styles.btnCode}>(N)</span>
                    </button>
                  </>
                )}

                {renderMetricGroup(
                  "Subsequent System Integrity (SI)",
                  "Integrity impact on other systems",
                  "✏️",
                  <>
                    <button
                      className={`${styles.btn} ${btnClass(subsequentSystemIntegrity === "H")}`}
                      onClick={() => setSubsequentSystemIntegrity?.("H")}
                      title="High subsequent integrity impact"
                    >
                      <span className={styles.btnIcon}>💥</span>
                      <span className={styles.btnLabel}>High</span>
                      <span className={styles.btnCode}>(H)</span>
                    </button>
                    <button
                      className={`${styles.btn} ${btnClass(subsequentSystemIntegrity === "L")}`}
                      onClick={() => setSubsequentSystemIntegrity?.("L")}
                      title="Low subsequent integrity impact"
                    >
                      <span className={styles.btnIcon}>📝</span>
                      <span className={styles.btnLabel}>Low</span>
                      <span className={styles.btnCode}>(L)</span>
                    </button>
                    <button
                      className={`${styles.btn} ${btnClass(subsequentSystemIntegrity === "N")}`}
                      onClick={() => setSubsequentSystemIntegrity?.("N")}
                      title="No subsequent integrity impact"
                    >
                      <span className={styles.btnIcon}>✅</span>
                      <span className={styles.btnLabel}>None</span>
                      <span className={styles.btnCode}>(N)</span>
                    </button>
                  </>
                )}

                {renderMetricGroup(
                  "Subsequent System Availability (SA)",
                  "Availability impact on other systems",
                  "⚡",
                  <>
                    <button
                      className={`${styles.btn} ${btnClass(subsequentSystemAvailability === "H")}`}
                      onClick={() => setSubsequentSystemAvailability?.("H")}
                      title="High subsequent availability impact"
                    >
                      <span className={styles.btnIcon}>💥</span>
                      <span className={styles.btnLabel}>High</span>
                      <span className={styles.btnCode}>(H)</span>
                    </button>
                    <button
                      className={`${styles.btn} ${btnClass(subsequentSystemAvailability === "L")}`}
                      onClick={() => setSubsequentSystemAvailability?.("L")}
                      title="Low subsequent availability impact"
                    >
                      <span className={styles.btnIcon}>⏳</span>
                      <span className={styles.btnLabel}>Low</span>
                      <span className={styles.btnCode}>(L)</span>
                    </button>
                    <button
                      className={`${styles.btn} ${btnClass(subsequentSystemAvailability === "N")}`}
                      onClick={() => setSubsequentSystemAvailability?.("N")}
                      title="No subsequent availability impact"
                    >
                      <span className={styles.btnIcon}>✅</span>
                      <span className={styles.btnLabel}>None</span>
                      <span className={styles.btnCode}>(N)</span>
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>

        {/* Temporal & Environmental Metrics */}
        {(cvssVersion === '4.0' || 
          (cvssVersion === '3.1' && (setExploitCodeMaturity || setRemediationLevel || setReportConfidence || setConfidentialityRequirement31))) && (
          <div className={styles.metricsSection}>
            <h4 className={styles.sectionTitle}>⏱️ Temporal & Environmental</h4>
            
            {/* CVSS 3.1 Temporal Metrics */}
            {cvssVersion === '3.1' && setExploitCodeMaturity && (
              renderMetricGroup(
                "Exploit Code Maturity (E)",
                "Likelihood of successful exploitation",
                "💻",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(exploitCodeMaturity === "X")}`}
                    onClick={() => setExploitCodeMaturity("X")}
                    title="N/A (default)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(exploitCodeMaturity === "H")}`}
                    onClick={() => setExploitCodeMaturity("H")}
                    title="High - Functional code exists"
                  >
                    <span className={styles.btnIcon}>🔧</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(exploitCodeMaturity === "F")}`}
                    onClick={() => setExploitCodeMaturity("F")}
                    title="Functional exploit code available"
                  >
                    <span className={styles.btnIcon}>⚡</span>
                    <span className={styles.btnLabel}>Functional</span>
                    <span className={styles.btnCode}>(F)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(exploitCodeMaturity === "P")}`}
                    onClick={() => setExploitCodeMaturity("P")}
                    title="Proof-of-concept code exists"
                  >
                    <span className={styles.btnIcon}>🧪</span>
                    <span className={styles.btnLabel}>PoC</span>
                    <span className={styles.btnCode}>(P)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(exploitCodeMaturity === "U")}`}
                    onClick={() => setExploitCodeMaturity("U")}
                    title="Unproven - theoretical only"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>Unproven</span>
                    <span className={styles.btnCode}>(U)</span>
                  </button>
                </>
              )
            )}
            
            {cvssVersion === '3.1' && setRemediationLevel && (
              renderMetricGroup(
                "Remediation Level (RL)",
                "Availability of remediation",
                "🔧",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(remediationLevel === "X")}`}
                    onClick={() => setRemediationLevel("X")}
                    title="N/A (default)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(remediationLevel === "O")}`}
                    onClick={() => setRemediationLevel("O")}
                    title="Official fix available"
                  >
                    <span className={styles.btnIcon}>✅</span>
                    <span className={styles.btnLabel}>Official Fix</span>
                    <span className={styles.btnCode}>(O)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(remediationLevel === "T")}`}
                    onClick={() => setRemediationLevel("T")}
                    title="Temporary fix available"
                  >
                    <span className={styles.btnIcon}>🔄</span>
                    <span className={styles.btnLabel}>Temporary Fix</span>
                    <span className={styles.btnCode}>(T)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(remediationLevel === "W")}`}
                    onClick={() => setRemediationLevel("W")}
                    title="Workaround available"
                  >
                    <span className={styles.btnIcon}>⚠️</span>
                    <span className={styles.btnLabel}>Workaround</span>
                    <span className={styles.btnCode}>(W)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(remediationLevel === "U")}`}
                    onClick={() => setRemediationLevel("U")}
                    title="No fix available"
                  >
                    <span className={styles.btnIcon}>🚫</span>
                    <span className={styles.btnLabel}>Unavailable</span>
                    <span className={styles.btnCode}>(U)</span>
                  </button>
                </>
              )
            )}
            
            {cvssVersion === '3.1' && setReportConfidence && (
              renderMetricGroup(
                "Report Confidence (RC)",
                "Confidence in vulnerability existence",
                "📊",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(reportConfidence === "X")}`}
                    onClick={() => setReportConfidence("X")}
                    title="N/A (default)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(reportConfidence === "C")}`}
                    onClick={() => setReportConfidence("C")}
                    title="Confirmed by vendor"
                  >
                    <span className={styles.btnIcon}>✅</span>
                    <span className={styles.btnLabel}>Confirmed</span>
                    <span className={styles.btnCode}>(C)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(reportConfidence === "R")}`}
                    onClick={() => setReportConfidence("R")}
                    title="Reasonable confidence"
                  >
                    <span className={styles.btnIcon}>👍</span>
                    <span className={styles.btnLabel}>Reasonable</span>
                    <span className={styles.btnCode}>(R)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(reportConfidence === "U")}`}
                    onClick={() => setReportConfidence("U")}
                    title="Unknown or unconfirmed"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>Unknown</span>
                    <span className={styles.btnCode}>(U)</span>
                  </button>
                </>
              )
            )}
            
            {/* CVSS 4.0 Temporal Metrics */}
            {cvssVersion === '4.0' && setExploitMaturity && (
              renderMetricGroup(
                "Exploit Code Maturity (E)",
                "Likelihood of successful exploitation",
                "💻",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(exploitMaturity === "X")}`}
                    onClick={() => setExploitMaturity("X")}
                    title="N/A (default)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(exploitMaturity === "H")}`}
                    onClick={() => setExploitMaturity("H")}
                    title="High - Functional code exists"
                  >
                    <span className={styles.btnIcon}>🔧</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(exploitMaturity === "F")}`}
                    onClick={() => setExploitMaturity("F")}
                    title="Functional exploit code available"
                  >
                    <span className={styles.btnIcon}>⚡</span>
                    <span className={styles.btnLabel}>Functional</span>
                    <span className={styles.btnCode}>(F)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(exploitMaturity === "P")}`}
                    onClick={() => setExploitMaturity("P")}
                    title="Proof-of-concept code exists"
                  >
                    <span className={styles.btnIcon}>🧪</span>
                    <span className={styles.btnLabel}>PoC</span>
                    <span className={styles.btnCode}>(P)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(exploitMaturity === "U")}`}
                    onClick={() => setExploitMaturity("U")}
                    title="Unproven - theoretical only"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>Unproven</span>
                    <span className={styles.btnCode}>(U)</span>
                  </button>
                </>
              )
            )}

            {/* Environmental Requirements - CVSS 3.1 */}
            {cvssVersion === '3.1' && setConfidentialityRequirement31 && (
              renderMetricGroup(
                "Confidentiality Requirement (CR)",
                "Importance of confidentiality to organization",
                "🔐",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(confidentialityRequirement31 === "X")}`}
                    onClick={() => setConfidentialityRequirement31("X")}
                    title="N/A (default)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(confidentialityRequirement31 === "H")}`}
                    onClick={() => setConfidentialityRequirement31("H")}
                    title="High importance"
                  >
                    <span className={styles.btnIcon}>🔒</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(confidentialityRequirement31 === "M")}`}
                    onClick={() => setConfidentialityRequirement31("M")}
                    title="Medium importance"
                  >
                    <span className={styles.btnIcon}>🔓</span>
                    <span className={styles.btnLabel}>Medium</span>
                    <span className={styles.btnCode}>(M)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(confidentialityRequirement31 === "L")}`}
                    onClick={() => setConfidentialityRequirement31("L")}
                    title="Low importance"
                  >
                    <span className={styles.btnIcon}>📖</span>
                    <span className={styles.btnLabel}>Low</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                </>
              )
            )}
            
            {cvssVersion === '3.1' && setIntegrityRequirement31 && (
              renderMetricGroup(
                "Integrity Requirement (IR)",
                "Importance of integrity to organization",
                "🛡️",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(integrityRequirement31 === "X")}`}
                    onClick={() => setIntegrityRequirement31("X")}
                    title="N/A (default)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(integrityRequirement31 === "H")}`}
                    onClick={() => setIntegrityRequirement31("H")}
                    title="High importance"
                  >
                    <span className={styles.btnIcon}>🛡️</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(integrityRequirement31 === "M")}`}
                    onClick={() => setIntegrityRequirement31("M")}
                    title="Medium importance"
                  >
                    <span className={styles.btnIcon}>📝</span>
                    <span className={styles.btnLabel}>Medium</span>
                    <span className={styles.btnCode}>(M)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(integrityRequirement31 === "L")}`}
                    onClick={() => setIntegrityRequirement31("L")}
                    title="Low importance"
                  >
                    <span className={styles.btnIcon}>📄</span>
                    <span className={styles.btnLabel}>Low</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                </>
              )
            )}
            
            {cvssVersion === '3.1' && setAvailabilityRequirement31 && (
              renderMetricGroup(
                "Availability Requirement (AR)",
                "Importance of availability to organization",
                "⚡",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(availabilityRequirement31 === "X")}`}
                    onClick={() => setAvailabilityRequirement31("X")}
                    title="N/A (default)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(availabilityRequirement31 === "H")}`}
                    onClick={() => setAvailabilityRequirement31("H")}
                    title="High importance"
                  >
                    <span className={styles.btnIcon}>⚡</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(availabilityRequirement31 === "M")}`}
                    onClick={() => setAvailabilityRequirement31("M")}
                    title="Medium importance"
                  >
                    <span className={styles.btnIcon}>⏳</span>
                    <span className={styles.btnLabel}>Medium</span>
                    <span className={styles.btnCode}>(M)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(availabilityRequirement31 === "L")}`}
                    onClick={() => setAvailabilityRequirement31("L")}
                    title="Low importance"
                  >
                    <span className={styles.btnIcon}>⏰</span>
                    <span className={styles.btnLabel}>Low</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                </>
              )
            )}
            
            {/* Environmental Requirements - CVSS 4.0 */}
            {cvssVersion === '4.0' && setConfidentialityRequirement && (
              renderMetricGroup(
                "Confidentiality Requirement (CR)",
                "Importance of confidentiality to organization",
                "🔐",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(confidentialityRequirement === "X")}`}
                    onClick={() => setConfidentialityRequirement("X")}
                    title="N/A (default)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(confidentialityRequirement === "H")}`}
                    onClick={() => setConfidentialityRequirement("H")}
                    title="High importance"
                  >
                    <span className={styles.btnIcon}>🔒</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(confidentialityRequirement === "M")}`}
                    onClick={() => setConfidentialityRequirement("M")}
                    title="Medium importance"
                  >
                    <span className={styles.btnIcon}>🔓</span>
                    <span className={styles.btnLabel}>Medium</span>
                    <span className={styles.btnCode}>(M)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(confidentialityRequirement === "L")}`}
                    onClick={() => setConfidentialityRequirement("L")}
                    title="Low importance"
                  >
                    <span className={styles.btnIcon}>📖</span>
                    <span className={styles.btnLabel}>Low</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                </>
              )
            )}
            
            {cvssVersion === '4.0' && setIntegrityRequirement && (
              renderMetricGroup(
                "Integrity Requirement (IR)",
                "Importance of integrity to organization",
                "🛡️",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(integrityRequirement === "X")}`}
                    onClick={() => setIntegrityRequirement("X")}
                    title="N/A (default)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(integrityRequirement === "H")}`}
                    onClick={() => setIntegrityRequirement("H")}
                    title="High importance"
                  >
                    <span className={styles.btnIcon}>🛡️</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(integrityRequirement === "M")}`}
                    onClick={() => setIntegrityRequirement("M")}
                    title="Medium importance"
                  >
                    <span className={styles.btnIcon}>📝</span>
                    <span className={styles.btnLabel}>Medium</span>
                    <span className={styles.btnCode}>(M)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(integrityRequirement === "L")}`}
                    onClick={() => setIntegrityRequirement("L")}
                    title="Low importance"
                  >
                    <span className={styles.btnIcon}>📄</span>
                    <span className={styles.btnLabel}>Low</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                </>
              )
            )}
            
            {cvssVersion === '4.0' && setAvailabilityRequirement && (
              renderMetricGroup(
                "Availability Requirement (AR)",
                "Importance of availability to organization",
                "⚡",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(availabilityRequirement === "X")}`}
                    onClick={() => setAvailabilityRequirement("X")}
                    title="N/A (default)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(availabilityRequirement === "H")}`}
                    onClick={() => setAvailabilityRequirement("H")}
                    title="High importance"
                  >
                    <span className={styles.btnIcon}>⚡</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(availabilityRequirement === "M")}`}
                    onClick={() => setAvailabilityRequirement("M")}
                    title="Medium importance"
                  >
                    <span className={styles.btnIcon}>⏳</span>
                    <span className={styles.btnLabel}>Medium</span>
                    <span className={styles.btnCode}>(M)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(availabilityRequirement === "L")}`}
                    onClick={() => setAvailabilityRequirement("L")}
                    title="Low importance"
                  >
                    <span className={styles.btnIcon}>⏰</span>
                    <span className={styles.btnLabel}>Low</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                </>
              )
            )}
          </div>
        )}
        
        {/* CVSS 3.1 Environmental Metrics - Modified Base Metrics */}
        {cvssVersion === '3.1' && (setModifiedAttackVector || setModifiedConfidentiality) && (
          <div className={styles.metricsSection}>
            <h4 className={styles.sectionTitle}>🌍 Environmental Metrics (Modified Base)</h4>
            
            {setModifiedAttackVector && (
              renderMetricGroup(
                "Modified Attack Vector (MAV)",
                "Modified attack vector for environment",
                "🌐",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedAttackVector === "X")}`}
                    onClick={() => setModifiedAttackVector("X")}
                    title="N/A (use base metric)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedAttackVector === "N")}`}
                    onClick={() => setModifiedAttackVector("N")}
                    title="Network access"
                  >
                    <span className={styles.btnIcon}>🌐</span>
                    <span className={styles.btnLabel}>Network</span>
                    <span className={styles.btnCode}>(N)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedAttackVector === "A")}`}
                    onClick={() => setModifiedAttackVector("A")}
                    title="Adjacent network"
                  >
                    <span className={styles.btnIcon}>📡</span>
                    <span className={styles.btnLabel}>Adjacent</span>
                    <span className={styles.btnCode}>(A)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedAttackVector === "L")}`}
                    onClick={() => setModifiedAttackVector("L")}
                    title="Local access"
                  >
                    <span className={styles.btnIcon}>💻</span>
                    <span className={styles.btnLabel}>Local</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedAttackVector === "P")}`}
                    onClick={() => setModifiedAttackVector("P")}
                    title="Physical access"
                  >
                    <span className={styles.btnIcon}>🔧</span>
                    <span className={styles.btnLabel}>Physical</span>
                    <span className={styles.btnCode}>(P)</span>
                  </button>
                </>
              )
            )}
            
            {setModifiedAttackComplexity && (
              renderMetricGroup(
                "Modified Attack Complexity (MAC)",
                "Modified attack complexity for environment",
                "🧩",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedAttackComplexity === "X")}`}
                    onClick={() => setModifiedAttackComplexity("X")}
                    title="N/A (use base metric)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedAttackComplexity === "L")}`}
                    onClick={() => setModifiedAttackComplexity("L")}
                    title="Low complexity"
                  >
                    <span className={styles.btnIcon}>⚡</span>
                    <span className={styles.btnLabel}>Low</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedAttackComplexity === "H")}`}
                    onClick={() => setModifiedAttackComplexity("H")}
                    title="High complexity"
                  >
                    <span className={styles.btnIcon}>🎯</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                </>
              )
            )}
            
            {setModifiedPrivilegesRequired && (
              renderMetricGroup(
                "Modified Privileges Required (MPR)",
                "Modified privileges required for environment",
                "🔑",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedPrivilegesRequired === "X")}`}
                    onClick={() => setModifiedPrivilegesRequired("X")}
                    title="N/A (use base metric)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedPrivilegesRequired === "N")}`}
                    onClick={() => setModifiedPrivilegesRequired("N")}
                    title="No privileges required"
                  >
                    <span className={styles.btnIcon}>🚫</span>
                    <span className={styles.btnLabel}>None</span>
                    <span className={styles.btnCode}>(N)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedPrivilegesRequired === "L")}`}
                    onClick={() => setModifiedPrivilegesRequired("L")}
                    title="Low privileges required"
                  >
                    <span className={styles.btnIcon}>👤</span>
                    <span className={styles.btnLabel}>Low</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedPrivilegesRequired === "H")}`}
                    onClick={() => setModifiedPrivilegesRequired("H")}
                    title="High privileges required"
                  >
                    <span className={styles.btnIcon}>👑</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                </>
              )
            )}
            
            {setModifiedUserInteraction && (
              renderMetricGroup(
                "Modified User Interaction (MUI)",
                "Modified user interaction for environment",
                "👥",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedUserInteraction === "X")}`}
                    onClick={() => setModifiedUserInteraction("X")}
                    title="N/A (use base metric)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedUserInteraction === "N")}`}
                    onClick={() => setModifiedUserInteraction("N")}
                    title="No user interaction"
                  >
                    <span className={styles.btnIcon}>🤖</span>
                    <span className={styles.btnLabel}>None</span>
                    <span className={styles.btnCode}>(N)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedUserInteraction === "R")}`}
                    onClick={() => setModifiedUserInteraction("R")}
                    title="User interaction required"
                  >
                    <span className={styles.btnIcon}>👆</span>
                    <span className={styles.btnLabel}>Required</span>
                    <span className={styles.btnCode}>(R)</span>
                  </button>
                </>
              )
            )}
            
            {setModifiedScope && (
              renderMetricGroup(
                "Modified Scope (MS)",
                "Modified scope for environment",
                "📊",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedScope === "X")}`}
                    onClick={() => setModifiedScope("X")}
                    title="N/A (use base metric)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedScope === "U")}`}
                    onClick={() => setModifiedScope("U")}
                    title="Scope unchanged"
                  >
                    <span className={styles.btnIcon}>📦</span>
                    <span className={styles.btnLabel}>Unchanged</span>
                    <span className={styles.btnCode}>(U)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedScope === "C")}`}
                    onClick={() => setModifiedScope("C")}
                    title="Scope changed"
                  >
                    <span className={styles.btnIcon}>🌐</span>
                    <span className={styles.btnLabel}>Changed</span>
                    <span className={styles.btnCode}>(C)</span>
                  </button>
                </>
              )
            )}
            
            {setModifiedConfidentiality && (
              renderMetricGroup(
                "Modified Confidentiality (MC)",
                "Modified confidentiality impact for environment",
                "🔒",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedConfidentiality === "X")}`}
                    onClick={() => setModifiedConfidentiality("X")}
                    title="N/A (use base metric)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedConfidentiality === "N")}`}
                    onClick={() => setModifiedConfidentiality("N")}
                    title="No confidentiality impact"
                  >
                    <span className={styles.btnIcon}>✅</span>
                    <span className={styles.btnLabel}>None</span>
                    <span className={styles.btnCode}>(N)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedConfidentiality === "L")}`}
                    onClick={() => setModifiedConfidentiality("L")}
                    title="Low confidentiality impact"
                  >
                    <span className={styles.btnIcon}>🔓</span>
                    <span className={styles.btnLabel}>Low</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedConfidentiality === "H")}`}
                    onClick={() => setModifiedConfidentiality("H")}
                    title="High confidentiality impact"
                  >
                    <span className={styles.btnIcon}>💥</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                </>
              )
            )}
            
            {setModifiedIntegrity && (
              renderMetricGroup(
                "Modified Integrity (MI)",
                "Modified integrity impact for environment",
                "✏️",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedIntegrity === "X")}`}
                    onClick={() => setModifiedIntegrity("X")}
                    title="N/A (use base metric)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedIntegrity === "N")}`}
                    onClick={() => setModifiedIntegrity("N")}
                    title="No integrity impact"
                  >
                    <span className={styles.btnIcon}>✅</span>
                    <span className={styles.btnLabel}>None</span>
                    <span className={styles.btnCode}>(N)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedIntegrity === "L")}`}
                    onClick={() => setModifiedIntegrity("L")}
                    title="Low integrity impact"
                  >
                    <span className={styles.btnIcon}>📝</span>
                    <span className={styles.btnLabel}>Low</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedIntegrity === "H")}`}
                    onClick={() => setModifiedIntegrity("H")}
                    title="High integrity impact"
                  >
                    <span className={styles.btnIcon}>💥</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                </>
              )
            )}
            
            {setModifiedAvailability && (
              renderMetricGroup(
                "Modified Availability (MA)",
                "Modified availability impact for environment",
                "⚡",
                <>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedAvailability === "X")}`}
                    onClick={() => setModifiedAvailability("X")}
                    title="N/A (use base metric)"
                  >
                    <span className={styles.btnIcon}>❓</span>
                    <span className={styles.btnLabel}>N/A</span>
                    <span className={styles.btnCode}>(X)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedAvailability === "N")}`}
                    onClick={() => setModifiedAvailability("N")}
                    title="No availability impact"
                  >
                    <span className={styles.btnIcon}>✅</span>
                    <span className={styles.btnLabel}>None</span>
                    <span className={styles.btnCode}>(N)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedAvailability === "L")}`}
                    onClick={() => setModifiedAvailability("L")}
                    title="Low availability impact"
                  >
                    <span className={styles.btnIcon}>⏳</span>
                    <span className={styles.btnLabel}>Low</span>
                    <span className={styles.btnCode}>(L)</span>
                  </button>
                  <button
                    className={`${styles.btn} ${btnClass(modifiedAvailability === "H")}`}
                    onClick={() => setModifiedAvailability("H")}
                    title="High availability impact"
                  >
                    <span className={styles.btnIcon}>💥</span>
                    <span className={styles.btnLabel}>High</span>
                    <span className={styles.btnCode}>(H)</span>
                  </button>
                </>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}