// text2ASCII
const tip = () => {
  /*
   __                   __                  __    _
  / /_  ____   ____    / /         _____   / /   (_)
 / __/ / __ \ / __ \  / /         / ___/  / /   / /
/ /_  / /_/ // /_/ / / /         / /__   / /   / /
\__/  \____/ \____/ /_/          \___/  /_/   /_/
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
