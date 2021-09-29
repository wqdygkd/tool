const inquirer = require('inquirer')
const chalk = require('chalk')
const log = console.log

const questions = [
  {
    type: 'input',
    name: 'number',
    message: '请输入代理：'
  }
]

inquirer.prompt(questions).then(answers => {
  console.log('\nOrder receipt:')
  console.log(JSON.stringify(answers, null, '  '))
})

// const program = require('commander')

// program
//   .version('0.0.1')
//   .description('设置代理')
//   .action(option => {
//     console.log('name: ', option.name)
//     console.log('age: ', option.age)
//     console.log('enjoy: ', option.enjoy)
//   })

// program.parse(process.argv)
