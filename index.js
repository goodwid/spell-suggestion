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

// String.prototype.removeLetter = function (index) {
//   if (index < 0 || index > this.length) {
//     console.error('Invalid index');
//     return undefined;
//   }
//   return this.slice(0,index) + this.slice(index+1, this.length);
// };
//
// intended for use w/ the removing duplicates portion of the work but unable to
// determine how to get that to work with the vowel checking.

String.prototype.replaceLetter = function (index, letter) {
  if (index < 0 || index > this.length) {
    console.error('Invalid index');
    return undefined;
  }
  if (typeof letter !== 'string') return undefined;
  return this.slice(0,index) + letter + this.slice(index+1, this.length);
};

String.prototype.isVowel = function() {
  if (this.length > 1) {
    console.error('Not a single character');
    return undefined;
  }
  return ['a','e','i','o','u'].indexOf(this[0]) > -1;
};


function checkVowels(word, index) {
  // word = word.trim();
  let vowels = ['a','e','i','o','u'];
  const letter = word.slice(index, index+1);
  const vowelIndex = vowels.indexOf(letter);
  if (vowelIndex > -1) {
    vowels.splice(vowelIndex, 1);
    for (let i = 0; i < vowels.length; i++) {
      let newWord = word.replaceLetter(index, vowels[i]);
      if (dict.lookup(newWord)) return newWord;
    }
  } else {
    return false;
  }
}

function processInput(input) {
  let checkWord = input.trim().toLowerCase();

  if (dict.lookup(checkWord)) {
    return checkWord;
  } else {
    for (var i = 0;i < checkWord.length; i++) {
      if (checkWord[i].isVowel()) {
        let newWord = checkVowels(checkWord, i);
        if (newWord !== false) return newWord;
      }
    }
  }
  return 'NO SUGGESTION';
}

prompt();

let dict = {};

process.stdin.on('data', text => {
  if (!Object.keys(dict).length) {
    fs.readFile('/usr/share/dict/words', (err, data) => {
      if (err) return console.error(err);
      dict = trie.createTrieFromArray(data.toString().split('\n'));
      process.stdout.write(`${processInput(text)}\n`);
      prompt();
    });
  } else {
    process.stdout.write(`${processInput(text)}\n`);
    prompt();
  }
});
