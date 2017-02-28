#!/usr/bin/env node
const fs = require('fs');
const tty = require('tty');
/*
 *  This trie data structure library sourced from https://github.com/kbjr/node-trie
 */
const trie = require('./lib/node-trie');


process.stdin.resume();
process.stdin.setEncoding('utf-8');

function prompt() {
  if (tty.isatty(process.stdout)) process.stdout.write('> ');
}

function processInput(input) {
  let checkWord = input.trim().toLowerCase();
  if (dict[checkWord]) {
    return checkWord;
  }
  return 'NO SUGGESTION';

}

prompt();

let dict = {};

process.stdin.on('data', text => {
  if (!Object.keys(dict).length) {
    fs.readFile('/usr/share/dict/words', (err, data) => {
      if (err) return console.error(err);
      // data.toString().split('\n').forEach(el => dict[el] = true);
      process.stdout.write(`${processInput(text)}\n`);
      prompt();
    });
  } else {
    process.stdout.write(`${processInput(text)}\n`);
    prompt();
  }
});
