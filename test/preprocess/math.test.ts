import { describe, expect, it } from 'vitest'
import { fixMath } from '../../src/preprocess/math'
import { getTestCasesByCategories } from './test-cases'

describe('fixMath', () => {
  for (const testCase of getTestCasesByCategories(['math'])) {
    it(testCase.description, () => {
      expect(fixMath(testCase.input)).toBe(testCase.expected)
    })
  }
})
