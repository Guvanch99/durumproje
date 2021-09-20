import { randomId } from './'

it('random number generator between two integer numbers', () => {
  expect.assertions(5)
  expect(randomId(1, 17)).not.toBeNull()
  expect(randomId(1, 17)).not.toBeUndefined()
  expect(randomId(1, 17)).toBeGreaterThanOrEqual(1)
  expect(randomId(1, 17)).toBeLessThanOrEqual(17)
  expect(randomId(1, 17) && typeof randomId(1, 17) === 'number').toBe(true)
})
