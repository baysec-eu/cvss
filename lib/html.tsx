import React from 'react';
import { Finding } from "../types/finding";

function expandAttackVector(av: string): string {
  switch (av) {
    case 'N': return 'Network';
    case 'A': return 'Adjacent';
    case 'L': return 'Local';
    case 'P': return 'Physical';
    default:  return av;
  }
}

function expandAttackComplexity(ac: string): string {
  return ac === 'L' ? 'Low' : 'High';
}

function expandPrivilegesRequired(pr: string): string {
  switch (pr) {
    case 'N': return 'None';
    case 'L': return 'Low';
    case 'H': return 'High';
    default:  return pr;
  }
}

function expandUserInteraction(ui: string): string {
  return ui === 'N' ? 'None' : 'Required';
}

function expandScope(s: string): string {
  return s === 'U' ? 'Unchanged' : 'Changed';
}

function expandImpact(impact: string): string {
  switch (impact) {
    case 'N': return 'None';
    case 'L': return 'Low';
    case 'H': return 'High';
    default:  return impact;
  }
}

interface CVSSAssessmentProps {
  finding: Finding;
}

const CVSSAssessment: React.FC<CVSSAssessmentProps> = ({ finding }) => {
  const isCritical = finding.severity.toLowerCase() === 'critical';

  const criteriaItems = [
    { label: 'Attack Vector', value: expandAttackVector(finding.attackVector) },
    { label: 'Attack Complexity', value: expandAttackComplexity(finding.attackComplexity) },
    { label: 'Privileges Required', value: expandPrivilegesRequired(finding.privilegesRequired) },
    { label: 'User Interaction', value: expandUserInteraction(finding.userInteraction) },
    { label: 'Scope', value: expandScope(finding.scope) },
    { label: 'Confidentiality', value: expandImpact(finding.confidentiality) },
    { label: 'Integrity', value: expandImpact(finding.integrity) },
    { label: 'Availability', value: expandImpact(finding.availability) },
  ];

  return (
    <div className="cvss-assessment">
      <h2>CVSS Assessment</h2>
      <table className="cvss-table">
        <tbody>
          <tr className="header-row">
            <th>CVSS Level</th>
            <td className={isCritical ? 'critical' : ''}>{finding.severity}</td>
            <th>CVSS v3 Score</th>
            <td>{finding.score.toFixed(1)}</td>
          </tr>
          <tr>
            <th>CVSS v3 Criteria</th>
            <td colSpan={3}>
              <div className="criteria-list">
                {criteriaItems.map((item, index) => (
                  <div key={index} className="criteria-item">
                    <strong>{item.label}:</strong> {item.value}
                  </div>
                ))}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

