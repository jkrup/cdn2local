#!/usr/bin/env node

var program = require('commander');

program.version('0.0.1');

program
  .command('yo')
  .description('Hellos the world with a flair')
  .action(function() {
    console.log('Yo');
});

program
  .command('*')
  .action(function(env) {
    console.log('Enter a Valid command');
});

program.parse(process.argv);
