"use client"
import React from 'react'

interface Finding {
  attackVector: string
  attackComplexity: string
  privilegesRequired: string
  userInteraction: string
  scope: string
  confidentiality: string
  integrity: string
  availability: string
  nazwa: string,
  opis: string
  obserwacje: string
  score: number
  severity: string
}

interface FindingsTableProps {
  findings: Finding[]
}

export default function FindingsTable({ findings }: FindingsTableProps) {
  if (findings.length === 0) {
    return <p>No findings yet.</p>
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Severity</th>
          <th>Score</th>
          <th>AV</th>
          <th>AC</th>
          <th>PR</th>
          <th>UI</th>
          <th>Scope</th>
          <th>Conf.</th>
          <th>Integ.</th>
          <th>Avail.</th>
          <th>Nazwa</th>
          <th>Opis</th>
          <th>Obserwacje</th>
        </tr>
      </thead>
      <tbody>
        {findings.map((f, idx) => (
          <tr key={idx}>
            <td>{f.severity}</td>
            <td>{f.score.toFixed(1)}</td>
            <td>{f.attackVector}</td>
            <td>{f.attackComplexity}</td>
            <td>{f.privilegesRequired}</td>
            <td>{f.userInteraction}</td>
            <td>{f.scope}</td>
            <td>{f.confidentiality}</td>
            <td>{f.integrity}</td>
            <td>{f.availability}</td>
            <td>{f.nazwa}</td>
            <td>{f.opis}</td>
            <td>{f.obserwacje}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
