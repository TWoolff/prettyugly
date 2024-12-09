export const serializeData = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj))
}
