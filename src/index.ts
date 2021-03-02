/* eslint-disable no-console */

export async function testFunction(): Promise<boolean> {
  return true
}

export async function throwsError(): Promise<boolean> {
  throw new Error('I have exploded')

  return false
}

