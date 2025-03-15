import type { NextApiRequest, NextApiResponse } from 'next'

import {
  calculateCvss31BaseScore,
  cvssSeverityFromScore,
  CVSSCalculationInput,
} from '../../lib/cvss'

interface CVSSRequestBody extends CVSSCalculationInput {
  version: '3.1' | '4.0'
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const {
    version,
    attackVector,
    attackComplexity,
    privilegesRequired,
    userInteraction,
    scope,
    confidentiality,
    integrity,
    availability,
  } = req.body as CVSSRequestBody

  if (version === '4.0') {
    console.warn(
      'CVSS v4.0 logic not implemented — using v3.1 data/metrics as a placeholder!'
    )
  }

  const baseScore = calculateCvss31BaseScore({
    attackVector,
    attackComplexity,
    privilegesRequired,
    userInteraction,
    scope,
    confidentiality,
    integrity,
    availability,
  })

  const severity = cvssSeverityFromScore(baseScore)

  return res.status(200).json({
    version,
    baseScore,
    severity,
  })
}
