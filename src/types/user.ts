export interface User {
  id: string
  name: string
  followers: Set<string>
  following: Set<string>
}
