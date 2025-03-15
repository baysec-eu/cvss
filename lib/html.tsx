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


export function generateStyledHtml(findings: Finding[]): string {
  const styles = `
    <style>
      body {
        font-family: "Segoe UI", Arial, sans-serif;
        margin: 30px;
        color: #333;
        font-size: 14px;
        max-width: 800px;
      }
      h2 {
        font-weight: 600;
        margin-bottom: 16px;
      }
      table {
        width: 100%;
        border: 1px solid #999;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      th, td {
        border: 1px solid #999;
        padding: 8px 10px;
        vertical-align: top;
      }
      th {
        background-color: #f3f3f3;
        width: 100px;
      }
      .headerRow th {
        text-align: left;
      }
      .headerRow td {
        font-weight: bold;
      }
      /* Extra class to highlight "Critical" in red */
      .critical {
        color: #d9534f;
      }
      ul {
        margin: 0;
        padding-left: 20px;
      }
    </style>
  `;

  let htmlContent = `
    <html>
      <head>
        <meta charset="UTF-8" />
        ${styles}
      </head>
      <body>
  `;

  for (const finding of findings) {
    const isCritical = finding.severity.toLowerCase() === 'critical';

    const criteriaText = `
      Attack Vector: ${expandAttackVector(finding.attackVector)}<br/>
      Attack Complexity: ${expandAttackComplexity(finding.attackComplexity)}<br/>
      Privileges Required: ${expandPrivilegesRequired(finding.privilegesRequired)}<br/>
      User Interaction: ${expandUserInteraction(finding.userInteraction)}<br/>
      Scope: ${expandScope(finding.scope)}<br/>
      Confidentiality: ${expandImpact(finding.confidentiality)}<br/>
      Integrity: ${expandImpact(finding.integrity)}<br/>
      Availability: ${expandImpact(finding.availability)}
    `;

    htmlContent += `
      <h2>${finding.nazwa}</h2>
      <table>
        <tr class="headerRow">
          <th>CVSS STOPIEŃ</th>
          <td class="${isCritical ? 'critical' : ''}">${finding.severity}</td>
          <th>CVSSv3 WYNIK</th>
          <td>${finding.score.toFixed(1)}</td>
        </tr>

        <tr>
          <th>CVSSv3 KRYTERIA</th>
          <td colspan="3">${criteriaText}</td>
        </tr>

        <tr>
          <th>Objęty zakres</th>
          <td colspan="3">
            ${finding.zakres ? finding.zakres : '(brak)'}
          </td>
        </tr>

        <tr>
          <th>OPIS</th>
          <td colspan="3">
            ${finding.opis ? finding.opis.replace(/\n/g, '<br/>') : '(brak)'}
          </td>
        </tr>

        <tr>
          <th>OBSERWACJE</th>
          <td colspan="3">
            ${finding.obserwacje ? finding.obserwacje.replace(/\n/g, '<br/>') : '(brak)'}
          </td>
        </tr>

        <tr>
          <th>ZAGROŻENIE</th>
          <td colspan="3">
            Prawdopodobieństwo wystąpienia: ${finding.severity}<br/>
            Impact: ${finding.severity}
          </td>
        </tr>

        <tr>
          <th>REFERENCJE</th>
          <td colspan="3">
            <ul>
              <li><a href="XXXXX">XXXXX</a></li>
            </ul>
          </td>
        </tr>
      </table>
    `;
  }

  htmlContent += `
      </body>
    </html>
  `;

  return htmlContent;
}
