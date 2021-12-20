import * as FS from 'node:fs'
import * as OS from 'node:os'
import * as path from 'node:path'

export function getCacheDirectory (name) {
  const nodeModules = findPackageNodeModules(process.cwd())

  return nodeModules
    ? path.join(nodeModules, '.cache', name)
    : path.join(OS.tmpdir(), name)
}

function findPackageNodeModules (cwd) {
  let directory = path.resolve(cwd)
  const rootDirectory = path.parse(directory).root

  while (directory !== rootDirectory) {
    const nodeModules = path.join(directory, 'node_modules')
    if (isWritableDirectory(nodeModules)) {
      return nodeModules
    }
    directory = path.dirname(directory)
  }
}

function isWritableDirectory (path) {
  try {
    if (!FS.statSync(path).isDirectory()) {
      return false
    }
    FS.accessSync(path, FS.constants.W_OK)
    return true
  } catch {
    return false
  }
}
