Function.prototype.constructor_ = Function.prototype.constructor

Function.prototype.constructor = function (a) {
  console.log(a)
  if (a == 'debugger') {
    console.log(a)
    return function () {}
  }
  return Function.prototype.constructor_(a)
}
Function.prototype.constructor.prototype = Function.prototype.constructor_.prototype

Function_ = Function
Function = function (a) {
  console.log(a)
  if (a == 'debugger') {
    return Function_('')
  }
  return Function_(a)
}
Function.prototype = Function_.prototype

Function.prototype.call_ = Function.prototype.call
Function.prototype.call = function () {
  console.log(arguments)
  return Function.prototype.call_(arguments)
}

Function.prototype.apply_ = Function.prototype.apply
Function.prototype.apply = function () {
  console.log(arguments)
  return Function.prototype.apply_(arguments)
}
