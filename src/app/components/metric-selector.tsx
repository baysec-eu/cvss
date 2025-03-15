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
}

export default function MetricsSelector({
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
}: MetricsSelectorProps) {
  
  function btnClass(isSelected: boolean) {
    return isSelected ? styles.btnSelected : styles.btnUnselected
  }

  return (
    <div className={styles.metricsRow}>
      <div className={styles.metricsColumn}>
        <h4>Attack Vector (AV)</h4>
        <div>
          <button
            className={`${styles.btn} ${btnClass(attackVector === "N")}`}
            onClick={() => setAttackVector("N")}
          >
            Network (N)
          </button>
          <button
            className={`${styles.btn} ${btnClass(attackVector === "A")}`}
            onClick={() => setAttackVector("A")}
          >
            Adjacent (A)
          </button>
          <button
            className={`${styles.btn} ${btnClass(attackVector === "L")}`}
            onClick={() => setAttackVector("L")}
          >
            Local (L)
          </button>
          <button
            className={`${styles.btn} ${btnClass(attackVector === "P")}`}
            onClick={() => setAttackVector("P")}
          >
            Physical (P)
          </button>
        </div>

        <h4>Attack Complexity (AC)</h4>
        <div>
          <button
            className={`${styles.btn} ${btnClass(attackComplexity === "L")}`}
            onClick={() => setAttackComplexity("L")}
          >
            Low (L)
          </button>
          <button
            className={`${styles.btn} ${btnClass(attackComplexity === "H")}`}
            onClick={() => setAttackComplexity("H")}
          >
            High (H)
          </button>
        </div>

        <h4>Privileges Required (PR)</h4>
        <div>
          <button
            className={`${styles.btn} ${btnClass(privilegesRequired === "N")}`}
            onClick={() => setPrivilegesRequired("N")}
          >
            None (N)
          </button>
          <button
            className={`${styles.btn} ${btnClass(privilegesRequired === "L")}`}
            onClick={() => setPrivilegesRequired("L")}
          >
            Low (L)
          </button>
          <button
            className={`${styles.btn} ${btnClass(privilegesRequired === "H")}`}
            onClick={() => setPrivilegesRequired("H")}
          >
            High (H)
          </button>
        </div>

        <h4>User Interaction (UI)</h4>
        <div>
          <button
            className={`${styles.btn} ${btnClass(userInteraction === "N")}`}
            onClick={() => setUserInteraction("N")}
          >
            None (N)
          </button>
          <button
            className={`${styles.btn} ${btnClass(userInteraction === "R")}`}
            onClick={() => setUserInteraction("R")}
          >
            Required (R)
          </button>
        </div>
      </div>

      <div className={styles.metricsColumn}>
        <h4>Scope (S)</h4>
        <div>
          <button
            className={`${styles.btn} ${btnClass(scope === "U")}`}
            onClick={() => setScope("U")}
          >
            Unchanged (U)
          </button>
          <button
            className={`${styles.btn} ${btnClass(scope === "C")}`}
            onClick={() => setScope("C")}
          >
            Changed (C)
          </button>
        </div>

        <h4>Confidentiality (C)</h4>
        <div>
          <button
            className={`${styles.btn} ${btnClass(confidentiality === "N")}`}
            onClick={() => setConfidentiality("N")}
          >
            None (N)
          </button>
          <button
            className={`${styles.btn} ${btnClass(confidentiality === "L")}`}
            onClick={() => setConfidentiality("L")}
          >
            Low (L)
          </button>
          <button
            className={`${styles.btn} ${btnClass(confidentiality === "H")}`}
            onClick={() => setConfidentiality("H")}
          >
            High (H)
          </button>
        </div>

        <h4>Integrity (I)</h4>
        <div>
          <button
            className={`${styles.btn} ${btnClass(integrity === "N")}`}
            onClick={() => setIntegrity("N")}
          >
            None (N)
          </button>
          <button
            className={`${styles.btn} ${btnClass(integrity === "L")}`}
            onClick={() => setIntegrity("L")}
          >
            Low (L)
          </button>
          <button
            className={`${styles.btn} ${btnClass(integrity === "H")}`}
            onClick={() => setIntegrity("H")}
          >
            High (H)
          </button>
        </div>

        <h4>Availability (A)</h4>
        <div>
          <button
            className={`${styles.btn} ${btnClass(availability === "N")}`}
            onClick={() => setAvailability("N")}
          >
            None (N)
          </button>
          <button
            className={`${styles.btn} ${btnClass(availability === "L")}`}
            onClick={() => setAvailability("L")}
          >
            Low (L)
          </button>
          <button
            className={`${styles.btn} ${btnClass(availability === "H")}`}
            onClick={() => setAvailability("H")}
          >
            High (H)
          </button>
        </div>
      </div>
    </div>
  )
}
