import inquirer from 'inquirer'
import chalk from 'chalk'

// 命令列表
import list from '../command/index.js'
import proxy from './proxy/index.js'

const log = console.log

let str = list.reduce((pre, current) => { return pre + current.name + '\n' }, '')
str = '================= 命令列表 ====================\n' +
  str +
  '(0) 取消\n' +
  '==============================================='

const questions = [
  {
    type: 'input',
    name: 'number',
    message: '请输入命令编号：',
    validate (value) {
      const valid = !isNaN(parseFloat(value))
      return valid || 'Please enter a number'
    },
    filter: Number
  }
]

export default () => {
  log(chalk.blue(str))
  inquirer.prompt(questions).then(answers => {
    const { number } = answers
    if (number === 1) {
      proxy()
      // program
      //   .command('node', 'script/proxy.js')
      //   .option('-c, --cheese [type]', 'Add cheese with optional type')

      // program.parse(process.argv).action((env, options) => {
      //   env = env || 'all'
      //   console.log('read config from %s', program.opts().config)
      //   console.log('setup for %s env(s) with %s mode', env, options.setup_mode)
      // })
    }
  })
}
