/*
  get platform

  aix      IBM AIX platform
  android  Android platform
  darwin   Darwin platfrom(MacOS, IOS etc)
  freebsd  FreeBSD Platform
  linux    Linux Platform
  openbsd  OpenBSD platform
  sunos    SunOS platform
  win32    windows platform
*/

// import * as os from 'os'
// const platform = os.platform()

const platform = process.env.npm_config_platform || process.platform
const arch = process.env.npm_config_arch || process.arch

export { platform, arch }
