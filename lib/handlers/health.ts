const {name, version} = require('./../../package.json')

export function handler() {
  return {
    name,
    version
  }
}
