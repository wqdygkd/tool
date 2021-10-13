#!/usr/bin/env node

import { Command } from 'commander/esm.mjs'
import init from './script/index.js'
const program = new Command()
program.version('0.0.1')

program.action(() => {
  console.log('tool')
  init()
})

// nginx
const nginx = program.command('nginx')
nginx
  .action((source, destination) => {
    console.log('nginx')
  })
nginx
  .command('start')
  .description('start nginx')
  .action((source, destination) => {
    console.log('nginx start')
  })
nginx
  .command('reload')
  .description('reload nginx')
  .action((source, destination) => {
    console.log('nginx reload')
  })

program.parse(process.argv)

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
