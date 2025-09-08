"use client"
import React, { useState } from 'react'
import styles from '../page.module.css'

interface CVSSHelpProps {
  cvssVersion: '3.1' | '4.0'
}

export default function CVSSHelp({ cvssVersion }: CVSSHelpProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const baseMetrics = [
    {
      id: 'av',
      name: 'Attack Vector (AV)',
      description: 'This metric reflects the context by which vulnerability exploitation is possible.',
      values: [
        { code: 'N', label: 'Network', description: 'The vulnerable component is bound to the network stack and attackers can exploit it remotely over the internet.', example: 'CVE-2014-6271 (Shellshock) - Remote code execution via HTTP requests' },
        { code: 'A', label: 'Adjacent Network', description: 'The vulnerable component is bound to the network stack, but the attack is limited to the same shared physical network.', example: 'ARP spoofing attacks or attacks requiring network adjacency' },
        { code: 'L', label: 'Local', description: 'The vulnerable component is not bound to the network stack and requires local access.', example: 'Privilege escalation vulnerabilities requiring local shell access' },
        { code: 'P', label: 'Physical', description: 'The attack requires physical access to the vulnerable component.', example: 'Hardware-based attacks or console access exploitation' }
      ]
    },
    {
      id: 'ac',
      name: 'Attack Complexity (AC)',
      description: 'This metric describes the conditions beyond the attacker\'s control that must exist in order to exploit the vulnerability.',
      values: [
        { code: 'L', label: 'Low', description: 'Specialized access conditions or extenuating circumstances do not exist.', example: 'Simple buffer overflow with reliable exploitation' },
        { code: 'H', label: 'High', description: 'A successful attack depends on conditions beyond the attacker\'s control.', example: 'Race condition vulnerabilities or attacks requiring specific timing' }
      ]
    },
    {
      id: 'pr',
      name: 'Privileges Required (PR)',
      description: 'This metric describes the level of privileges an attacker must possess before successfully exploiting the vulnerability.',
      values: [
        { code: 'N', label: 'None', description: 'The attacker is unauthorized prior to attack.', example: 'Unauthenticated remote code execution' },
        { code: 'L', label: 'Low', description: 'The attacker requires basic user capabilities.', example: 'Authenticated user can escalate to admin privileges' },
        { code: 'H', label: 'High', description: 'The attacker requires significant privileges.', example: 'Admin-only vulnerability that affects system integrity' }
      ]
    },
    {
      id: 'ui',
      name: 'User Interaction (UI)',
      description: 'This metric captures the requirement for a human user to participate in the successful compromise of the vulnerable component.',
      values: [
        { code: 'N', label: 'None', description: 'The vulnerable system can be exploited without interaction from any user.', example: 'Automated worm exploitation' },
        { code: 'R', label: 'Required', description: 'Successful exploitation requires user interaction.', example: 'Phishing attacks or malicious file downloads' }
      ]
    },
    {
      id: 's',
      name: 'Scope (S)',
      description: 'The Scope metric captures whether a vulnerability in one vulnerable component impacts resources in components beyond its security scope.',
      values: [
        { code: 'U', label: 'Unchanged', description: 'An exploited vulnerability can only affect resources managed by the same security authority.', example: 'Local privilege escalation within the same system' },
        { code: 'C', label: 'Changed', description: 'An exploited vulnerability can affect resources beyond the security scope.', example: 'VM escape affecting host system or other VMs' }
      ]
    },
    {
      id: 'c',
      name: 'Confidentiality Impact (C)',
      description: 'This metric measures the impact to the confidentiality of the information resources managed by a software component.',
      values: [
        { code: 'N', label: 'None', description: 'There is no loss of confidentiality within the impacted component.', example: 'DoS attack with no data disclosure' },
        { code: 'L', label: 'Low', description: 'There is some loss of confidentiality with limited access to restricted information.', example: 'Disclosure of some system configuration details' },
        { code: 'H', label: 'High', description: 'There is total loss of confidentiality with access to all restricted information.', example: 'Complete database dump or credential theft' }
      ]
    },
    {
      id: 'i',
      name: 'Integrity Impact (I)',
      description: 'This metric measures the impact to integrity of a successfully exploited vulnerability.',
      values: [
        { code: 'N', label: 'None', description: 'There is no loss of integrity within the impacted component.', example: 'Read-only information disclosure' },
        { code: 'L', label: 'Low', description: 'Modification of data is possible, but the attacker does not have control over the consequence.', example: 'Limited file modification without system control' },
        { code: 'H', label: 'High', description: 'There is a total loss of integrity with complete control over the impacted component.', example: 'Complete system compromise with arbitrary code execution' }
      ]
    },
    {
      id: 'a',
      name: 'Availability Impact (A)',
      description: 'This metric measures the impact to the availability of the impacted component resulting from a successfully exploited vulnerability.',
      values: [
        { code: 'N', label: 'None', description: 'There is no impact to availability within the impacted component.', example: 'Information disclosure with no service disruption' },
        { code: 'L', label: 'Low', description: 'Performance is reduced or there are interruptions in resource availability.', example: 'Temporary service degradation' },
        { code: 'H', label: 'High', description: 'There is total loss of availability with complete shutdown of the impacted component.', example: 'Complete denial of service or system crash' }
      ]
    }
  ]

  const cvss40Metrics = [
    {
      id: 'at',
      name: 'Attack Requirements (AT)',
      description: 'This metric captures the prerequisite deployment and execution conditions or variables of the vulnerable system.',
      values: [
        { code: 'N', label: 'None', description: 'The successful attack does not depend on the deployment and execution conditions.', example: 'Standard configuration vulnerability' },
        { code: 'P', label: 'Present', description: 'The successful attack depends on the presence of specific deployment and execution conditions.', example: 'Vulnerability requiring specific service configuration' }
      ]
    },
    {
      id: 'vc',
      name: 'Vulnerable System Confidentiality (VC)',
      description: 'This metric measures the impact to the confidentiality of the information managed by the vulnerable system.',
      values: [
        { code: 'H', label: 'High', description: 'There is total loss of confidentiality within the vulnerable system.', example: 'Complete database access' },
        { code: 'L', label: 'Low', description: 'There is some loss of confidentiality within the vulnerable system.', example: 'Limited data disclosure' },
        { code: 'N', label: 'None', description: 'There is no loss of confidentiality within the vulnerable system.', example: 'No data exposure' }
      ]
    },
    {
      id: 'vi',
      name: 'Vulnerable System Integrity (VI)',
      description: 'This metric measures the impact to integrity of the vulnerable system.',
      values: [
        { code: 'H', label: 'High', description: 'There is total loss of integrity within the vulnerable system.', example: 'Complete system control' },
        { code: 'L', label: 'Low', description: 'There is some loss of integrity within the vulnerable system.', example: 'Limited file modification' },
        { code: 'N', label: 'None', description: 'There is no loss of integrity within the vulnerable system.', example: 'Read-only access' }
      ]
    },
    {
      id: 'va',
      name: 'Vulnerable System Availability (VA)',
      description: 'This metric measures the impact to the availability of the vulnerable system.',
      values: [
        { code: 'H', label: 'High', description: 'There is total loss of availability within the vulnerable system.', example: 'Complete service shutdown' },
        { code: 'L', label: 'Low', description: 'There is some loss of availability within the vulnerable system.', example: 'Performance degradation' },
        { code: 'N', label: 'None', description: 'There is no loss of availability within the vulnerable system.', example: 'No service impact' }
      ]
    },
    {
      id: 'sc',
      name: 'Subsequent System Confidentiality (SC)',
      description: 'This metric measures the impact to the confidentiality of subsequent systems.',
      values: [
        { code: 'H', label: 'High', description: 'There is total loss of confidentiality within subsequent systems.', example: 'Lateral movement with data access' },
        { code: 'L', label: 'Low', description: 'There is some loss of confidentiality within subsequent systems.', example: 'Limited subsequent data access' },
        { code: 'N', label: 'None', description: 'There is no loss of confidentiality within subsequent systems.', example: 'Isolated vulnerability' }
      ]
    },
    {
      id: 'si',
      name: 'Subsequent System Integrity (SI)',
      description: 'This metric measures the impact to integrity of subsequent systems.',
      values: [
        { code: 'H', label: 'High', description: 'There is total loss of integrity within subsequent systems.', example: 'Complete subsequent system compromise' },
        { code: 'L', label: 'Low', description: 'There is some loss of integrity within subsequent systems.', example: 'Limited subsequent system modification' },
        { code: 'N', label: 'None', description: 'There is no loss of integrity within subsequent systems.', example: 'No subsequent system impact' }
      ]
    },
    {
      id: 'sa',
      name: 'Subsequent System Availability (SA)',
      description: 'This metric measures the impact to the availability of subsequent systems.',
      values: [
        { code: 'H', label: 'High', description: 'There is total loss of availability within subsequent systems.', example: 'Cascading service failures' },
        { code: 'L', label: 'Low', description: 'There is some loss of availability within subsequent systems.', example: 'Limited subsequent service impact' },
        { code: 'N', label: 'None', description: 'There is no loss of availability within subsequent systems.', example: 'No cascading impact' }
      ]
    }
  ]

  const temporalMetrics = [
    {
      id: 'e',
      name: 'Exploit Code Maturity (E)',
      description: 'This metric measures the likelihood of the vulnerability being attacked.',
      values: [
        { code: 'X', label: 'N/A', description: 'The metric is not being used in score calculation.', example: 'Temporal score not calculated' },
        { code: 'H', label: 'High', description: 'Functional autonomous code exists for widespread use.', example: 'Metasploit modules or public exploits' },
        { code: 'F', label: 'Functional', description: 'Functional exploit code is available with some preparation.', example: 'PoC code that needs modification' },
        { code: 'P', label: 'PoC', description: 'Proof-of-concept exploit code exists.', example: 'Academic research or demonstration code' },
        { code: 'U', label: 'Unproven', description: 'No exploit code is available or unproven theory.', example: 'Theoretical vulnerability without working exploit' }
      ]
    },
    {
      id: 'rl',
      name: 'Remediation Level (RL)',
      description: 'This metric measures the availability and effectiveness of remediation.',
      values: [
        { code: 'X', label: 'N/A', description: 'The metric is not being used in score calculation.', example: 'Temporal score not calculated' },
        { code: 'U', label: 'Unavailable', description: 'There is no solution available or it is impossible to apply.', example: 'Zero-day with no patch available' },
        { code: 'W', label: 'Workaround', description: 'There is an unofficial, non-vendor solution available.', example: 'Community workarounds or configuration changes' },
        { code: 'T', label: 'Temporary Fix', description: 'There is an official but temporary fix available.', example: 'Beta patch or hotfix' },
        { code: 'O', label: 'Official Fix', description: 'A complete vendor solution is available.', example: 'Official security update' }
      ]
    },
    {
      id: 'rc',
      name: 'Report Confidence (RC)',
      description: 'This metric measures the degree of confidence in the existence of the vulnerability.',
      values: [
        { code: 'X', label: 'N/A', description: 'The metric is not being used in score calculation.', example: 'Temporal score not calculated' },
        { code: 'C', label: 'Confirmed', description: 'Detailed reports exist with vendor acknowledgment.', example: 'CVE assigned with vendor confirmation' },
        { code: 'R', label: 'Reasonable', description: 'Significant details are published but incomplete.', example: 'Security advisory with some technical details' },
        { code: 'U', label: 'Unknown', description: 'Vulnerability details are unknown or unconfirmed.', example: 'Unverified security reports' }
      ]
    }
  ]

  const environmentalMetrics = [
    {
      id: 'cr',
      name: 'Confidentiality Requirement (CR)',
      description: 'This metric enables the analyst to customize the CVSS score based on the importance of confidentiality.',
      values: [
        { code: 'X', label: 'N/A', description: 'The metric is not being used in score calculation.', example: 'Environmental score not calculated' },
        { code: 'H', label: 'High', description: 'Loss of confidentiality is likely to have catastrophic impact.', example: 'Financial or healthcare data systems' },
        { code: 'M', label: 'Medium', description: 'Loss of confidentiality is likely to have serious impact.', example: 'Business-sensitive internal systems' },
        { code: 'L', label: 'Low', description: 'Loss of confidentiality is likely to have limited impact.', example: 'Public information systems' }
      ]
    },
    {
      id: 'ir',
      name: 'Integrity Requirement (IR)',
      description: 'This metric enables the analyst to customize the CVSS score based on the importance of integrity.',
      values: [
        { code: 'X', label: 'N/A', description: 'The metric is not being used in score calculation.', example: 'Environmental score not calculated' },
        { code: 'H', label: 'High', description: 'Loss of integrity is likely to have catastrophic impact.', example: 'Critical infrastructure or safety systems' },
        { code: 'M', label: 'Medium', description: 'Loss of integrity is likely to have serious impact.', example: 'Business-critical applications' },
        { code: 'L', label: 'Low', description: 'Loss of integrity is likely to have limited impact.', example: 'Non-critical support systems' }
      ]
    },
    {
      id: 'ar',
      name: 'Availability Requirement (AR)',
      description: 'This metric enables the analyst to customize the CVSS score based on the importance of availability.',
      values: [
        { code: 'X', label: 'N/A', description: 'The metric is not being used in score calculation.', example: 'Environmental score not calculated' },
        { code: 'H', label: 'High', description: 'Loss of availability is likely to have catastrophic impact.', example: 'Emergency response or life-safety systems' },
        { code: 'M', label: 'Medium', description: 'Loss of availability is likely to have serious impact.', example: 'Primary business services' },
        { code: 'L', label: 'Low', description: 'Loss of availability is likely to have limited impact.', example: 'Secondary or backup systems' }
      ]
    }
  ]

  const renderMetricSection = (title: string, metrics: any[], sectionId: string, icon: string = '📋') => (
    <div key={sectionId} className={styles.helpSection}>
      <button 
        className={styles.helpSectionHeader}
        onClick={() => toggleSection(sectionId)}
      >
        <div className={styles.sectionHeaderContent}>
          <span className={styles.sectionIcon}>{icon}</span>
          <h3>{title}</h3>
          <span className={styles.metricCount}>({metrics.length} metrics)</span>
        </div>
        <span className={styles.expandIcon}>
          {expandedSection === sectionId ? '−' : '+'}
        </span>
      </button>
      {expandedSection === sectionId && (
        <div className={styles.helpContent}>
          <div className={styles.metricsHelpGrid}>
            {metrics.map((metric) => (
              <div key={metric.id} className={styles.metricHelpCard}>
                <div className={styles.metricCardHeader}>
                  <h4>{metric.name}</h4>
                  <span className={styles.metricId}>{metric.id.toUpperCase()}</span>
                </div>
                <p className={styles.metricDescription}>{metric.description}</p>
                <div className={styles.metricValues}>
                  {metric.values.map((value: any, index: number) => (
                    <div key={value.code} className={`${styles.metricValue} ${index % 2 === 0 ? styles.evenValue : styles.oddValue}`}>
                      <div className={styles.valueHeader}>
                        <span className={styles.valueCode}>{value.code}</span>
                        <span className={styles.valueLabel}>{value.label}</span>
                      </div>
                      <p className={styles.valueDescription}>{value.description}</p>
                      <div className={styles.valueExample}>
                        <span className={styles.exampleLabel}>💡 Example:</span>
                        <span>{value.example}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className={styles.helpContainer}>
      <div className={styles.helpHeader}>
        <h2>CVSS {cvssVersion} Reference Guide</h2>
        <div className={styles.helpLinks}>
          <a href="https://www.first.org/cvss/v3.1/specification-document" target="_blank" rel="noopener noreferrer">
            📚 CVSS 3.1 Specification
          </a>
          <a href="https://www.first.org/cvss/v4.0/specification-document" target="_blank" rel="noopener noreferrer">
            📚 CVSS 4.0 Specification
          </a>
          <a href="https://nvd.nist.gov/vuln-metrics/cvss" target="_blank" rel="noopener noreferrer">
            🏛️ NIST CVSS Guide
          </a>
        </div>
      </div>

      <div className={styles.helpOverview}>
        <div className={styles.overviewGrid}>
          <div className={styles.overviewSection}>
            <h3>🎯 What is CVSS?</h3>
            <p>
              The Common Vulnerability Scoring System (CVSS) provides a standardized way to assess 
              and communicate the severity of security vulnerabilities using numerical scores from 0.0 to 10.0.
            </p>
          </div>
          <div className={styles.overviewSection}>
            <h3>📊 CVSS {cvssVersion} Features</h3>
            <p>
              <strong>CVSS {cvssVersion}</strong> {cvssVersion === '3.1' ? 
                'is the industry standard used by NIST, CVE databases, and security vendors worldwide.' :
                'introduces enhanced granularity with separate vulnerable and subsequent system impact metrics.'
              }
            </p>
          </div>
        </div>
        
        <div className={styles.quickReference}>
          <h3>🚀 Quick Start Guide</h3>
          <div className={styles.quickSteps}>
            <div className={styles.quickStep}>
              <span className={styles.stepNumber}>1</span>
              <span>Select <strong>Exploitability</strong> metrics (how the attack works)</span>
            </div>
            <div className={styles.quickStep}>
              <span className={styles.stepNumber}>2</span>
              <span>Choose <strong>Impact</strong> metrics (what gets affected)</span>
            </div>
            <div className={styles.quickStep}>
              <span className={styles.stepNumber}>3</span>
              <span>Set <strong>Temporal</strong> metrics (current exploit status) - optional</span>
            </div>
            <div className={styles.quickStep}>
              <span className={styles.stepNumber}>4</span>
              <span>Configure <strong>Environmental</strong> metrics (organizational context) - optional</span>
            </div>
          </div>
        </div>
      </div>

      {renderMetricSection('Base Metrics', baseMetrics, 'base', '🎯')}
      
      {cvssVersion === '4.0' && renderMetricSection('CVSS 4.0 Enhanced Metrics', cvss40Metrics, 'cvss40', '🚀')}
      
      {renderMetricSection('Temporal Metrics', temporalMetrics, 'temporal', '⏱️')}
      
      {renderMetricSection('Environmental Metrics', environmentalMetrics, 'environmental', '🏢')}

      <div className={styles.helpFooter}>
        <div className={styles.footerGrid}>
          <div className={styles.scoringSection}>
            <h3>📊 Scoring Ranges</h3>
            <div className={styles.scoringRanges}>
              <div className={`${styles.scoreRange} ${styles.scoreNone}`}>
                <span className={styles.scoreValue}>0.0</span>
                <span className={styles.scoreLabel}>None</span>
              </div>
              <div className={`${styles.scoreRange} ${styles.scoreLow}`}>
                <span className={styles.scoreValue}>0.1-3.9</span>
                <span className={styles.scoreLabel}>Low</span>
              </div>
              <div className={`${styles.scoreRange} ${styles.scoreMedium}`}>
                <span className={styles.scoreValue}>4.0-6.9</span>
                <span className={styles.scoreLabel}>Medium</span>
              </div>
              <div className={`${styles.scoreRange} ${styles.scoreHigh}`}>
                <span className={styles.scoreValue}>7.0-8.9</span>
                <span className={styles.scoreLabel}>High</span>
              </div>
              <div className={`${styles.scoreRange} ${styles.scoreCritical}`}>
                <span className={styles.scoreValue}>9.0-10.0</span>
                <span className={styles.scoreLabel}>Critical</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}