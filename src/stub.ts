export async function findUser(username: string): Promise<string> {
  console.log(username)
  return 'id-12354'
}

export async function deleteUserFromDB(id: string): Promise<string> {
  console.log(id)
  const status = 'deleted'
  return status
}
