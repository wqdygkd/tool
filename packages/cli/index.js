#!/usr/bin/env node

// Native
import fs from 'node:fs'
import path from 'node:path'

// Packages
import { Command } from 'commander/esm.mjs'
import { fileURLToPath } from 'node:url'

import listInit from './script/index.js'
import nginxInit from './script/nginx/index.js'
import proxy from './script/proxy/index.js'
import upimg from './script/upimg/index.js'
import del from './script/del/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const _packageJson = fs.readFileSync(path.resolve(__dirname, './package.json'))

const program = new Command()
program.version(JSON.parse(_packageJson).version)

program
  .command('list')
  .description('list command')
  .action(() => {
    console.log('list command')
    listInit()
  })

nginxInit(program)
upimg(program)
del(program)

program
  .command('proxy')
  .description('proxy manage')
  .action(() => {
    proxy()
  })

program.parse(process.argv)

if (program.args.length === 0) {
  program.help()
}
export {
  program
}

// const options = program.opts()
// if (options.debug) console.log(options)
// console.log('pizza details:')
// if (options.small) console.log('- small pizza size')
// if (options.pizzaType) console.log(`- ${options.pizzaType}`)

// var process = require('child_process');

// var cmd = 'ifconfig';
// process.exec(cmd, function(error, stdout, stderr) {
//     console.log("error:"+error);
//     console.log("stdout:"+stdout);
//     console.log("stderr:"+stderr);
// });


// var a = 1;
// var b = 2;
// if (a => b) {
//  console.log('bigger');
// } else {
//  console.log('smaller');
// }
