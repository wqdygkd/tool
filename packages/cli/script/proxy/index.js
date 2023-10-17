import inquirer from 'inquirer'
import chalk from 'chalk'
const log = console.log

// const shell = require('shelljs')

export default function () {
  const questions = [
    {
      type: 'input',
      name: 'proxy',
      message: '请输入代理:',
      default: 'http://127.0.0.1:10809'
    }
  ]

  inquirer.prompt(questions).then(answers => {
    // const cmd = '$env:HTTP_PROXY=' + answers.proxy

    // console.log(shell.exec(cmd).code)
    // console.log('\nOrder receipt:')
    // console.log(JSON.stringify(answers, null, '  '))
  })
}

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
