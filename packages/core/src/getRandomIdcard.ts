export default function () {
  const coefficientArray = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"] // 加权因子
  const lastNumberArray = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"] // 校验码
  const address = "342221" // 住址

  const birthday = "" + (parseInt(40 * Math.random()) + 1960) + "0" + (parseInt(9 * Math.random()) + 1) + (parseInt(20 * Math.random()) + 10) // 生日
  const s = Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString() + Math.floor(Math.random() * 10).toString()
  const array = (address + birthday + s).split("")
  let total = 0
  for (let i = 0; i < array.length; i++) {
      total = total + parseInt(array[i]) * parseInt(coefficientArray[i])
  }
  const lastNumber = lastNumberArray[parseInt(total % 11)]
  const id_no_String = address + birthday + s + lastNumber

  return id_no_String
}
