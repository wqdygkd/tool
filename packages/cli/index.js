#!/usr/bin/env node

// Native
import fs from 'fs'

// Packages
import { Command } from 'commander/esm.mjs'

import listInit from './script/index.js'
import nginxInit from './script/nginx/index.js'
const _packageJson = fs.readFileSync('./package.json')

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

program.parse(process.argv)

if (!program.args.length) {
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
