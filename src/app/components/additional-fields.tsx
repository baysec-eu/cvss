"use client"
import React from 'react'

interface AdditionalFieldsProps {
  nazwa: string,
  setNazwa: (val: string) => void
  opis: string
  setOpis: (val: string) => void
  obserwacje: string
  setObserwacje: (val: string) => void
  onAddFinding: () => void
}

export default function AdditionalFields({
  nazwa,
  setNazwa,
  opis,
  setOpis,
  obserwacje,
  setObserwacje,
  onAddFinding,
}: AdditionalFieldsProps) {
  return (
    <div style={{ width: '33%' }}>
      <h4>Additional Info</h4>
      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>Nazwa</label>
        <textarea
          rows={4}
          value={nazwa}
          onChange={(e) => setNazwa(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>Opis</label>
        <textarea
          rows={4}
          value={opis}
          onChange={(e) => setOpis(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>Obserwacje</label>
        <textarea
          rows={4}
          value={obserwacje}
          onChange={(e) => setObserwacje(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>
      <button
        onClick={onAddFinding}
        style={{
          padding: '12px 20px',
          backgroundColor: '#17a2b8',
          color: '#fff',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Add Finding
      </button>
    </div>
  )
}
