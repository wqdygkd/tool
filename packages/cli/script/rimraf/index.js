// import fs from 'node:fs'
import path from 'node:path'

import { rimraf } from 'rimraf'
import ora from 'ora'
import chalk from 'chalk'

export default function (program) {
  program
    .command('rm')
    .argument('[path]', '需要删除的目录')
    .description('快速删除目录或文件')
    .action(async source => {
      if (source) {
        const start = process.hrtime()
        const spinner = ora('0%').start()
        let timer
        let time = 0

        try {
          timer = setInterval(() => {
            spinner.color = 'yellow'
            time += 0.1
            spinner.text = 'deleting ' + time.toFixed(1) + 's'
          }, 100)

          await rimraf([path.resolve('./', source)])
        } finally {
          clearInterval(timer)
          const end = process.hrtime(start)
          const time = end[0] + end[1] / 1_000_000 / 1000
          spinner.succeed(chalk.green(`Done in ${time.toFixed(3)}s`))
        }
      }
    })
}
