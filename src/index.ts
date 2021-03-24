/* eslint-disable no-console */
import {findUser, deleteUserFromDB} from './stub'

export async function testFunction(): Promise<boolean> {
  return true
}

export async function throwsError(): Promise<boolean> {
  throw new Error('I have exploded')

  return false
}

export function addAandB(a: number, b: number): number {
  return a + b
}

export async function deleteUser(username: string | undefined): Promise<string | undefined> {
  if (!username)
    return

  const userId = await findUser(username)
  const status = await deleteUserFromDB(userId)

  return status
}
