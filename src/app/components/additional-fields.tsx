"use client"
import React from 'react'

interface AdditionalFieldsProps {
  nazwa: string,
  setNazwa: (val: string) => void

  opis: string
  setOpis: (val: string) => void

  obserwacje: string
  setObserwacje: (val: string) => void

  zakres: string
  setZakres: (val: string) => void

  prawdopodobienstwo: string
  setPrawdopodobienstwo: (val: string) => void

  ryzyko: string
  setRyzyko: (val: string) => void

  impakt: string
  setImpakt: (val: string) => void

  referencje: string
  setReferencje: (val: string) => void

  onAddFinding: () => void
}

export default function AdditionalFields({
  nazwa,
  setNazwa,
  opis,
  setOpis,
  obserwacje,
  setObserwacje,

  zakres,
  setZakres,

  prawdopodobienstwo,
  setPrawdopodobienstwo,

  ryzyko,
  setRyzyko,

  impakt,
  setImpakt,

  referencje,
  setReferencje,
  
  onAddFinding,
}: AdditionalFieldsProps) {
  return (
    <div style={{ width: '100%' }}>
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

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>Zakres</label>
        <textarea
          rows={4}
          value={zakres}
          onChange={(e) => setZakres(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>Prawdopodobieństwo</label>
        <textarea
          rows={4}
          value={prawdopodobienstwo}
          onChange={(e) => setPrawdopodobienstwo(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>Ryzyko</label>
        <textarea
          rows={4}
          value={ryzyko}
          onChange={(e) => setRyzyko(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>Impakt</label>
        <textarea
          rows={4}
          value={impakt}
          onChange={(e) => setImpakt(e.target.value)}
          style={{ width: '100%' }}
        />
      </div>

      <div style={{ marginBottom: 10 }}>
        <label style={{ display: 'block', fontWeight: 'bold' }}>Referencje</label>
        <textarea
          rows={4}
          value={referencje}
          onChange={(e) => setReferencje(e.target.value)}
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
