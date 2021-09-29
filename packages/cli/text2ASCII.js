// text2ASCII
const tip = () => {
  /*
    _              _        _ _
    | |            | |      | (_)
    | |_ ___   ___ | |   ___| |_
    | __/ _ \ / _ \| |  / __| | |
    | || (_) | (_) | | | (__| | |
    \__\___/ \___/|_|  \___|_|_|
    */
}

const consoler = () => {
  return tip.toString()
    .substring(
      tip.toString().indexOf('/*') + 3,
      tip.toString().lastIndexOf('*/')
    )
}
console.log(consoler())
