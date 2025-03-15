export interface CVSSCalculationInput {
    attackVector: 'N' | 'A' | 'L' | 'P'
    attackComplexity: 'L' | 'H'
    privilegesRequired: 'N' | 'L' | 'H'
    userInteraction: 'N' | 'R'
    scope: 'U' | 'C'
    confidentiality: 'N' | 'L' | 'H'
    integrity: 'N' | 'L' | 'H'
    availability: 'N' | 'L' | 'H'
  }
  
  export function calculateCvss31BaseScore(input: CVSSCalculationInput): number {
    const AV = { N: 0.85, A: 0.62, L: 0.55, P: 0.2 }
    const AC = { L: 0.77, H: 0.44 }
  
    const PR_U = { N: 0.85, L: 0.62, H: 0.27 }
    const PR_C = { N: 0.85, L: 0.68, H: 0.50 }
  
    const UI = { N: 0.85, R: 0.62 }
  
    const CIA = { N: 0.0, L: 0.22, H: 0.56 }
  
    const {
      attackVector,
      attackComplexity,
      privilegesRequired,
      userInteraction,
      scope,
      confidentiality,
      integrity,
      availability,
    } = input
  
    const avVal = AV[attackVector]
    const acVal = AC[attackComplexity]
    const prVal = scope === 'U' ? PR_U[privilegesRequired] : PR_C[privilegesRequired]
    const uiVal = UI[userInteraction]
  
    const exploitability = 8.22 * avVal * acVal * prVal * uiVal
  
    const cVal = CIA[confidentiality]
    const iVal = CIA[integrity]
    const aVal = CIA[availability]
  
    const impact = 1 - (1 - cVal) * (1 - iVal) * (1 - aVal)
    const impactSubScore = 6.42 * impact
  
    let baseScore = 0
    if (impact > 0) {
      if (scope === 'U') {
        baseScore = roundUp1(Math.min(impactSubScore + exploitability, 10))
      } else {
        baseScore = roundUp1(Math.min(1.08 * (impactSubScore + exploitability), 10))
      }
    }
  
    return baseScore
  }
  
  export function cvssSeverityFromScore(score: number): string {
    if (score === 0.0) return 'None'
    if (score >= 0.1 && score < 4.0) return 'Low'
    if (score >= 4.0 && score < 7.0) return 'Medium'
    if (score >= 7.0 && score < 9.0) return 'High'
    if (score >= 9.0) return 'Critical'
    return 'Unknown'
  }
  
  function roundUp1(value: number): number {
    return Math.ceil(value * 10) / 10
  }
  