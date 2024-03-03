import _, { PropertyPath } from 'lodash-es'

/** Obfuscate Lodash `set` function for testing convenience */
export const forceAssign = <T extends object>(object: T, path: PropertyPath, value: any): T => {
  return _.set(object, path, value)
}
