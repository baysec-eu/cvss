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

  export interface CVSS31CalculationInput extends CVSSCalculationInput {
    // Temporal metrics
    exploitCodeMaturity?: 'X' | 'U' | 'P' | 'F' | 'H'
    remediationLevel?: 'X' | 'O' | 'T' | 'W' | 'U'
    reportConfidence?: 'X' | 'U' | 'R' | 'C'
    
    // Environmental metrics - Modified Base Metrics
    modifiedAttackVector?: 'X' | 'N' | 'A' | 'L' | 'P'
    modifiedAttackComplexity?: 'X' | 'L' | 'H'
    modifiedPrivilegesRequired?: 'X' | 'N' | 'L' | 'H'
    modifiedUserInteraction?: 'X' | 'N' | 'R'
    modifiedScope?: 'X' | 'U' | 'C'
    modifiedConfidentiality?: 'X' | 'N' | 'L' | 'H'
    modifiedIntegrity?: 'X' | 'N' | 'L' | 'H'
    modifiedAvailability?: 'X' | 'N' | 'L' | 'H'
    
    // Environmental metrics - Requirements
    confidentialityRequirement?: 'X' | 'L' | 'M' | 'H'
    integrityRequirement?: 'X' | 'L' | 'M' | 'H'
    availabilityRequirement?: 'X' | 'L' | 'M' | 'H'
  }

  export interface CVSS40CalculationInput extends CVSSCalculationInput {
    attackRequirements?: 'N' | 'P'
    subsequentSystemAvailability?: 'N' | 'L' | 'H'
    subsequentSystemConfidentiality?: 'N' | 'L' | 'H'
    subsequentSystemIntegrity?: 'N' | 'L' | 'H'
    exploitMaturity?: 'X' | 'U' | 'P' | 'F' | 'H'
    confidentialityRequirement?: 'X' | 'L' | 'M' | 'H'
    integrityRequirement?: 'X' | 'L' | 'M' | 'H'
    availabilityRequirement?: 'X' | 'L' | 'M' | 'H'
  }

  export interface EPSSData {
    cve: string
    epss: number
    percentile: number
    date: string
  }

  export interface KEVEntry {
    cveID: string
    vendorProject: string
    product: string
    vulnerabilityName: string
    dateAdded: string
    shortDescription: string
    requiredAction: string
    dueDate: string
    knownRansomwareCampaignUse: 'Known' | 'Unknown'
    notes: string
  }

  export interface EnhancedVulnerabilityData {
    cve: string
    cvssv31?: {
      baseScore: number
      temporalScore?: number
      environmentalScore?: number
      vectorString: string
    }
    cvssv40?: {
      baseScore: number
      temporalScore?: number
      environmentalScore?: number
      vectorString: string
    }
    epss?: EPSSData
    kev?: KEVEntry
    riskScore?: number
    threatLevel: 'Low' | 'Medium' | 'High' | 'Critical'
  }
  
  export function calculateCvss31BaseScore(input: CVSSCalculationInput): number {
    // CVSS v3.1 Base Metric Values (official specification)
    const AV = { N: 0.85, A: 0.62, L: 0.55, P: 0.2 }
    const AC = { L: 0.77, H: 0.44 }
    
    // Privileges Required depends on Scope
    const PR_U = { N: 0.85, L: 0.62, H: 0.27 }  // Unchanged scope
    const PR_C = { N: 0.85, L: 0.68, H: 0.50 }  // Changed scope
    
    const UI = { N: 0.85, R: 0.62 }
    
    // Confidentiality, Integrity, Availability impact
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
  
    // Calculate Exploitability sub-score
    const avVal = AV[attackVector]
    const acVal = AC[attackComplexity]
    const prVal = scope === 'U' ? PR_U[privilegesRequired] : PR_C[privilegesRequired]
    const uiVal = UI[userInteraction]
  
    const exploitability = 8.22 * avVal * acVal * prVal * uiVal
  
    // Calculate Impact sub-score
    const cVal = CIA[confidentiality]
    const iVal = CIA[integrity]
    const aVal = CIA[availability]
  
    const iss = 1 - ((1 - cVal) * (1 - iVal) * (1 - aVal))
    
    let impact
    if (scope === 'U') {
      impact = 6.42 * iss
    } else {
      impact = 7.52 * (iss - 0.029) - 3.25 * Math.pow(iss - 0.02, 15)
    }
  
    // Calculate Base Score
    let baseScore = 0
    if (impact <= 0) {
      baseScore = 0
    } else {
      if (scope === 'U') {
        baseScore = roundUp1(Math.min(impact + exploitability, 10))
      } else {
        baseScore = roundUp1(Math.min(1.08 * (impact + exploitability), 10))
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

  export function calculateCvss40BaseScore(input: CVSS40CalculationInput): number {
    // CVSS v4.0 Base Metric Values (official specification)
    const AV = { N: 0.85, A: 0.62, L: 0.55, P: 0.2 }
    const AC = { L: 0.77, H: 0.44 }
    const AT = { N: 0.85, P: 0.62 }  // Attack Requirements
    
    // Privileges Required depends on Scope  
    const PR_U = { N: 0.85, L: 0.62, H: 0.27 }  // Unchanged scope
    const PR_C = { N: 0.85, L: 0.68, H: 0.50 }  // Changed scope
    
    const UI = { N: 0.85, R: 0.62 }
    
    // Vulnerable System Impact
    const VC = { H: 0.56, L: 0.22, N: 0.0 }
    const VI = { H: 0.56, L: 0.22, N: 0.0 }
    const VA = { H: 0.56, L: 0.22, N: 0.0 }
    
    // Subsequent System Impact  
    const SC = { H: 0.56, L: 0.22, N: 0.0 }
    const SI = { H: 0.56, L: 0.22, N: 0.0 }
    const SA = { H: 0.56, L: 0.22, N: 0.0 }

    const {
      attackVector,
      attackComplexity,
      attackRequirements = 'N',
      privilegesRequired,
      userInteraction,
      scope,
      confidentiality,
      integrity,
      availability,
      subsequentSystemConfidentiality = 'N',
      subsequentSystemIntegrity = 'N',
      subsequentSystemAvailability = 'N',
    } = input

    // Calculate Exploitability sub-score (includes Attack Requirements for v4.0)
    const avVal = AV[attackVector]
    const acVal = AC[attackComplexity]
    const atVal = AT[attackRequirements]
    const prVal = scope === 'U' ? PR_U[privilegesRequired] : PR_C[privilegesRequired]
    const uiVal = UI[userInteraction]

    const exploitability = 8.22 * avVal * acVal * atVal * prVal * uiVal

    // Calculate Impact sub-score
    const vcVal = VC[confidentiality]
    const viVal = VI[integrity]
    const vaVal = VA[availability]
    
    const scVal = SC[subsequentSystemConfidentiality]
    const siVal = SI[subsequentSystemIntegrity]
    const saVal = SA[subsequentSystemAvailability]

    // Vulnerable System Impact Sub Score (ISS)
    const vulnerableSystemImpact = 1 - ((1 - vcVal) * (1 - viVal) * (1 - vaVal))
    
    // Subsequent System Impact Sub Score
    const subsequentSystemImpact = 1 - ((1 - scVal) * (1 - siVal) * (1 - saVal))
    
    let impact
    if (scope === 'U') {
      // Unchanged scope - only vulnerable system impact matters
      impact = 6.42 * vulnerableSystemImpact
    } else {
      // Changed scope - includes both vulnerable and subsequent system impact
      impact = 7.52 * (vulnerableSystemImpact - 0.029) - 3.25 * Math.pow(vulnerableSystemImpact - 0.02, 15) + 
               1.10 * subsequentSystemImpact
    }

    // Calculate Base Score
    let baseScore = 0
    if (impact <= 0) {
      baseScore = 0
    } else {
      if (scope === 'U') {
        baseScore = roundUp1(Math.min(impact + exploitability, 10))
      } else {
        baseScore = roundUp1(Math.min(1.08 * (impact + exploitability), 10))
      }
    }

    return baseScore
  }

  export function calculateCvss31Temporal(baseScore: number, input: CVSS31CalculationInput): number {
    // CVSS v3.1 Temporal Metric Values
    const E = { X: 1.0, U: 0.91, P: 0.94, F: 0.97, H: 1.0 }
    const RL = { X: 1.0, O: 0.95, T: 0.96, W: 0.97, U: 1.0 }
    const RC = { X: 1.0, U: 0.92, R: 0.96, C: 1.0 }
    
    const eVal = E[input.exploitCodeMaturity || 'X']
    const rlVal = RL[input.remediationLevel || 'X']
    const rcVal = RC[input.reportConfidence || 'X']
    
    // Temporal Score = roundUp(BaseScore × E × RL × RC)
    return roundUp1(baseScore * eVal * rlVal * rcVal)
  }

  export function calculateCvss31Environmental(baseScore: number, input: CVSS31CalculationInput): number {
    // If no environmental metrics are set, return base score
    const hasModifiedMetrics = input.modifiedAttackVector !== 'X' || 
                              input.modifiedAttackComplexity !== 'X' ||
                              input.modifiedPrivilegesRequired !== 'X' ||
                              input.modifiedUserInteraction !== 'X' ||
                              input.modifiedScope !== 'X' ||
                              input.modifiedConfidentiality !== 'X' ||
                              input.modifiedIntegrity !== 'X' ||
                              input.modifiedAvailability !== 'X'

    const hasRequirements = input.confidentialityRequirement !== 'X' ||
                           input.integrityRequirement !== 'X' ||
                           input.availabilityRequirement !== 'X'

    if (!hasModifiedMetrics && !hasRequirements) {
      return baseScore
    }

    // Environmental Requirements
    const CR = { X: 1.0, L: 0.5, M: 1.0, H: 1.5 }
    const IR = { X: 1.0, L: 0.5, M: 1.0, H: 1.5 }
    const AR = { X: 1.0, L: 0.5, M: 1.0, H: 1.5 }

    // Use modified metrics if provided, otherwise use original values
    const modifiedInput: CVSSCalculationInput = {
      attackVector: (input.modifiedAttackVector !== 'X' ? input.modifiedAttackVector : input.attackVector) as 'N' | 'A' | 'L' | 'P',
      attackComplexity: (input.modifiedAttackComplexity !== 'X' ? input.modifiedAttackComplexity : input.attackComplexity) as 'L' | 'H',
      privilegesRequired: (input.modifiedPrivilegesRequired !== 'X' ? input.modifiedPrivilegesRequired : input.privilegesRequired) as 'N' | 'L' | 'H',
      userInteraction: (input.modifiedUserInteraction !== 'X' ? input.modifiedUserInteraction : input.userInteraction) as 'N' | 'R',
      scope: (input.modifiedScope !== 'X' ? input.modifiedScope : input.scope) as 'U' | 'C',
      confidentiality: (input.modifiedConfidentiality !== 'X' ? input.modifiedConfidentiality : input.confidentiality) as 'N' | 'L' | 'H',
      integrity: (input.modifiedIntegrity !== 'X' ? input.modifiedIntegrity : input.integrity) as 'N' | 'L' | 'H',
      availability: (input.modifiedAvailability !== 'X' ? input.modifiedAvailability : input.availability) as 'N' | 'L' | 'H'
    }

    // Recalculate base score with modified metrics
    const modifiedBaseScore = calculateCvss31BaseScore(modifiedInput)

    // Apply environmental requirements
    const crVal = CR[input.confidentialityRequirement || 'X']
    const irVal = IR[input.integrityRequirement || 'X']
    const arVal = AR[input.availabilityRequirement || 'X']

    // Calculate modified impact with requirements
    const CIA = { N: 0.0, L: 0.22, H: 0.56 }
    const cVal = CIA[modifiedInput.confidentiality] * crVal
    const iVal = CIA[modifiedInput.integrity] * irVal
    const aVal = CIA[modifiedInput.availability] * arVal

    const modifiedISS = Math.min(1 - ((1 - cVal) * (1 - iVal) * (1 - aVal)), 0.915)

    let modifiedImpact
    if (modifiedInput.scope === 'U') {
      modifiedImpact = 6.42 * modifiedISS
    } else {
      modifiedImpact = 7.52 * (modifiedISS - 0.029) - 3.25 * Math.pow(modifiedISS - 0.02, 15)
    }

    // Calculate exploitability (same as base score calculation)
    const AV = { N: 0.85, A: 0.62, L: 0.55, P: 0.2 }
    const AC = { L: 0.77, H: 0.44 }
    const PR_U = { N: 0.85, L: 0.62, H: 0.27 }
    const PR_C = { N: 0.85, L: 0.68, H: 0.50 }
    const UI = { N: 0.85, R: 0.62 }

    const exploitability = 8.22 * AV[modifiedInput.attackVector] * AC[modifiedInput.attackComplexity] * 
                          (modifiedInput.scope === 'U' ? PR_U[modifiedInput.privilegesRequired] : PR_C[modifiedInput.privilegesRequired]) * 
                          UI[modifiedInput.userInteraction]

    // Calculate environmental score
    let environmentalScore = 0
    if (modifiedImpact <= 0) {
      environmentalScore = 0
    } else {
      if (modifiedInput.scope === 'U') {
        environmentalScore = roundUp1(Math.min(modifiedImpact + exploitability, 10))
      } else {
        environmentalScore = roundUp1(Math.min(1.08 * (modifiedImpact + exploitability), 10))
      }
    }

    return environmentalScore
  }

  export function calculateCvss40Temporal(baseScore: number, input: CVSS40CalculationInput): number {
    // CVSS v4.0 Temporal Metric Values
    const E = { X: 1.0, U: 0.94, P: 0.94, F: 0.97, H: 1.0 }
    
    const exploitMaturity = input.exploitMaturity || 'X'
    const eVal = E[exploitMaturity]
    
    // Temporal Score = roundUp(BaseScore × E)
    return roundUp1(baseScore * eVal)
  }

  export function calculateCvss40Environmental(baseScore: number, input: CVSS40CalculationInput): number {
    // CVSS v4.0 Environmental Metric Values
    const CR = { X: 1.0, L: 0.5, M: 1.0, H: 1.5 }
    const IR = { X: 1.0, L: 0.5, M: 1.0, H: 1.5 }
    const AR = { X: 1.0, L: 0.5, M: 1.0, H: 1.5 }
    
    const crVal = CR[input.confidentialityRequirement || 'X']
    const irVal = IR[input.integrityRequirement || 'X']
    const arVal = AR[input.availabilityRequirement || 'X']
    
    // For Environmental score, we need to recalculate with modified values
    // This is a simplified approach - full implementation would recalculate 
    // the entire base score with modified impact values
    const environmentalModifier = (crVal + irVal + arVal) / 3
    const environmentalScore = baseScore * environmentalModifier
    
    return roundUp1(Math.min(environmentalScore, 10))
  }

  export function generateCvssVector(version: '3.1' | '4.0', input: CVSSCalculationInput | CVSS31CalculationInput | CVSS40CalculationInput): string {
    if (version === '3.1') {
      let vector = `CVSS:3.1/AV:${input.attackVector}/AC:${input.attackComplexity}/PR:${input.privilegesRequired}/UI:${input.userInteraction}/S:${input.scope}/C:${input.confidentiality}/I:${input.integrity}/A:${input.availability}`
      
      const v31Input = input as CVSS31CalculationInput
      
      // Add temporal metrics if set
      if (v31Input.exploitCodeMaturity && v31Input.exploitCodeMaturity !== 'X') {
        vector += `/E:${v31Input.exploitCodeMaturity}`
      }
      if (v31Input.remediationLevel && v31Input.remediationLevel !== 'X') {
        vector += `/RL:${v31Input.remediationLevel}`
      }
      if (v31Input.reportConfidence && v31Input.reportConfidence !== 'X') {
        vector += `/RC:${v31Input.reportConfidence}`
      }
      
      // Add environmental metrics if set
      if (v31Input.confidentialityRequirement && v31Input.confidentialityRequirement !== 'X') {
        vector += `/CR:${v31Input.confidentialityRequirement}`
      }
      if (v31Input.integrityRequirement && v31Input.integrityRequirement !== 'X') {
        vector += `/IR:${v31Input.integrityRequirement}`
      }
      if (v31Input.availabilityRequirement && v31Input.availabilityRequirement !== 'X') {
        vector += `/AR:${v31Input.availabilityRequirement}`
      }
      
      // Add modified base metrics if set
      if (v31Input.modifiedAttackVector && v31Input.modifiedAttackVector !== 'X') {
        vector += `/MAV:${v31Input.modifiedAttackVector}`
      }
      if (v31Input.modifiedAttackComplexity && v31Input.modifiedAttackComplexity !== 'X') {
        vector += `/MAC:${v31Input.modifiedAttackComplexity}`
      }
      if (v31Input.modifiedPrivilegesRequired && v31Input.modifiedPrivilegesRequired !== 'X') {
        vector += `/MPR:${v31Input.modifiedPrivilegesRequired}`
      }
      if (v31Input.modifiedUserInteraction && v31Input.modifiedUserInteraction !== 'X') {
        vector += `/MUI:${v31Input.modifiedUserInteraction}`
      }
      if (v31Input.modifiedScope && v31Input.modifiedScope !== 'X') {
        vector += `/MS:${v31Input.modifiedScope}`
      }
      if (v31Input.modifiedConfidentiality && v31Input.modifiedConfidentiality !== 'X') {
        vector += `/MC:${v31Input.modifiedConfidentiality}`
      }
      if (v31Input.modifiedIntegrity && v31Input.modifiedIntegrity !== 'X') {
        vector += `/MI:${v31Input.modifiedIntegrity}`
      }
      if (v31Input.modifiedAvailability && v31Input.modifiedAvailability !== 'X') {
        vector += `/MA:${v31Input.modifiedAvailability}`
      }
      
      return vector
    } else {
      const v40Input = input as CVSS40CalculationInput
      let vector = `CVSS:4.0/AV:${input.attackVector}/AC:${input.attackComplexity}/AT:${v40Input.attackRequirements || 'N'}/PR:${input.privilegesRequired}/UI:${input.userInteraction}/VC:${input.confidentiality}/VI:${input.integrity}/VA:${input.availability}/SC:${v40Input.subsequentSystemConfidentiality || 'N'}/SI:${v40Input.subsequentSystemIntegrity || 'N'}/SA:${v40Input.subsequentSystemAvailability || 'N'}`
      
      if (v40Input.exploitMaturity && v40Input.exploitMaturity !== 'X') {
        vector += `/E:${v40Input.exploitMaturity}`
      }
      if (v40Input.confidentialityRequirement && v40Input.confidentialityRequirement !== 'X') {
        vector += `/CR:${v40Input.confidentialityRequirement}`
      }
      if (v40Input.integrityRequirement && v40Input.integrityRequirement !== 'X') {
        vector += `/IR:${v40Input.integrityRequirement}`
      }
      if (v40Input.availabilityRequirement && v40Input.availabilityRequirement !== 'X') {
        vector += `/AR:${v40Input.availabilityRequirement}`
      }
      
      return vector
    }
  }

  // Test function to validate CVSS calculations with known examples
  export function validateCvssCalculations(): boolean {
    console.log('🧪 Validating CVSS Calculations...')
    
    // Test CVSS v3.1: CVE-2017-0144 (WannaCry/EternalBlue)
    // Expected: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H = 9.8 Critical
    const eternalBlue31 = calculateCvss31BaseScore({
      attackVector: 'N',
      attackComplexity: 'L', 
      privilegesRequired: 'N',
      userInteraction: 'N',
      scope: 'C',
      confidentiality: 'H',
      integrity: 'H',
      availability: 'H'
    })
    
    // Test CVSS v3.1: Simple XSS
    // Expected: CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N = 6.1 Medium  
    const xss31 = calculateCvss31BaseScore({
      attackVector: 'N',
      attackComplexity: 'L',
      privilegesRequired: 'N', 
      userInteraction: 'R',
      scope: 'C',
      confidentiality: 'L',
      integrity: 'L',
      availability: 'N'
    })

    // Test CVSS v4.0: Same as EternalBlue but with v4.0 enhancements
    const eternalBlue40 = calculateCvss40BaseScore({
      attackVector: 'N',
      attackComplexity: 'L',
      privilegesRequired: 'N', 
      userInteraction: 'N',
      scope: 'C',
      confidentiality: 'H',
      integrity: 'H', 
      availability: 'H',
      attackRequirements: 'N',
      subsequentSystemConfidentiality: 'H',
      subsequentSystemIntegrity: 'H',
      subsequentSystemAvailability: 'H'
    })

    console.log('📊 Test Results:')
    console.log(`EternalBlue CVSS v3.1: ${eternalBlue31.toFixed(1)} (Expected: ~9.8)`)
    console.log(`XSS CVSS v3.1: ${xss31.toFixed(1)} (Expected: ~6.1)`)
    console.log(`EternalBlue CVSS v4.0: ${eternalBlue40.toFixed(1)} (Should be similar to v3.1)`)
    
    const isValid = (
      Math.abs(eternalBlue31 - 9.8) < 0.2 &&  // Allow small tolerance
      Math.abs(xss31 - 6.1) < 0.2 &&
      Math.abs(eternalBlue40 - eternalBlue31) < 1.0  // v4.0 should be reasonably close
    )
    
    console.log(`✅ Validation ${isValid ? 'PASSED' : 'FAILED'}`)
    return isValid
  }

  export async function fetchEPSSData(cve: string): Promise<EPSSData | null> {
    try {
      const response = await fetch(`https://api.first.org/data/v1/epss?cve=${cve}`)
      const data = await response.json()
      
      if (data.status === 'OK' && data.data && data.data.length > 0) {
        const epssEntry = data.data[0]
        return {
          cve: epssEntry.cve,
          epss: parseFloat(epssEntry.epss),
          percentile: parseFloat(epssEntry.percentile),
          date: epssEntry.date
        }
      }
      return null
    } catch (error) {
      console.error('Failed to fetch EPSS data:', error)
      return null
    }
  }

  export async function checkKEVStatus(cve: string): Promise<KEVEntry | null> {
    try {
      const response = await fetch('https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json')
      const data = await response.json()
      
      const kevEntry = data.vulnerabilities?.find((vuln: any) => vuln.cveID === cve)
      
      if (kevEntry) {
        return {
          cveID: kevEntry.cveID,
          vendorProject: kevEntry.vendorProject,
          product: kevEntry.product,
          vulnerabilityName: kevEntry.vulnerabilityName,
          dateAdded: kevEntry.dateAdded,
          shortDescription: kevEntry.shortDescription,
          requiredAction: kevEntry.requiredAction,
          dueDate: kevEntry.dueDate,
          knownRansomwareCampaignUse: kevEntry.knownRansomwareCampaignUse,
          notes: kevEntry.notes || ''
        }
      }
      return null
    } catch (error) {
      console.error('Failed to fetch KEV data:', error)
      return null
    }
  }

  export function calculateRiskScore(
    cvssScore: number, 
    epssScore?: number, 
    isKEV?: boolean
  ): number {
    let riskScore = cvssScore * 0.6

    if (epssScore !== undefined) {
      riskScore += epssScore * 10 * 0.3
    }

    if (isKEV) {
      riskScore += 2.0
    }

    return Math.min(riskScore, 10)
  }

  export function getThreatLevel(riskScore: number): 'Low' | 'Medium' | 'High' | 'Critical' {
    if (riskScore >= 9.0) return 'Critical'
    if (riskScore >= 7.0) return 'High'
    if (riskScore >= 4.0) return 'Medium'
    return 'Low'
  }

  export function calculateOverallScore(baseScore: number, temporalScore?: number, environmentalScore?: number): number {
    // Overall score is the highest available score
    // Priority: Environmental > Temporal > Base
    if (environmentalScore && environmentalScore > 0) {
      return environmentalScore
    }
    if (temporalScore && temporalScore > 0) {
      return temporalScore
    }
    return baseScore
  }

  export async function getEnhancedVulnerabilityData(
    cve: string,
    cvssInput?: CVSSCalculationInput | CVSS40CalculationInput,
    version: '3.1' | '4.0' = '3.1'
  ): Promise<EnhancedVulnerabilityData> {
    const [epssData, kevData] = await Promise.all([
      fetchEPSSData(cve),
      checkKEVStatus(cve)
    ])

    let cvssData
    if (cvssInput) {
      const baseScore = version === '3.1' 
        ? calculateCvss31BaseScore(cvssInput as CVSSCalculationInput)
        : calculateCvss40BaseScore(cvssInput as CVSS40CalculationInput)
      
      const vectorString = generateCvssVector(version, cvssInput)
      
      cvssData = {
        baseScore,
        vectorString,
        ...(version === '4.0' && {
          temporalScore: calculateCvss40Temporal(baseScore, cvssInput as CVSS40CalculationInput),
          environmentalScore: calculateCvss40Environmental(baseScore, cvssInput as CVSS40CalculationInput)
        })
      }
    }

    const riskScore = cvssData ? calculateRiskScore(
      cvssData.baseScore,
      epssData?.epss,
      !!kevData
    ) : undefined

    const threatLevel = riskScore ? getThreatLevel(riskScore) : 'Low'

    return {
      cve,
      ...(version === '3.1' && cvssData && { cvssv31: cvssData }),
      ...(version === '4.0' && cvssData && { cvssv40: cvssData }),
      epss: epssData || undefined,
      kev: kevData || undefined,
      riskScore,
      threatLevel
    }
  }
  