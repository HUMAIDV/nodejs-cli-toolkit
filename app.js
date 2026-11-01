#!/usr/bin/env node

require('dotenv').config()

const { uppercase, wordCount, isPalindrome } = require('./commands/StringUtils.js');

const { compressFile, decompressFile } = require('./commands/FileUtils.js')

const  getJoke  = require('./commands/apiUtils.js')

const [operation, ...values] = process.argv.slice(2)

const text = values.join(" ")

switch (operation) {
    case "uppercase":
        console.log(uppercase(text));
        break;
    case "wordCount":
        console.log("Word count : ", wordCount(text));
        break;
    case "isPalindrome":
        console.log("Is palindrome : ", isPalindrome(text));
        break;
    case "compress":
        compressFile(text)
            .then(outputFile => {
                console.log("File compressed : ", outputFile);
            }).catch(error => {
                console.log("Compression failed : ",error.message);
            })
        break;
    case "decompress":
        decompressFile(text)
            .then(outputFile => {
                console.log("File compressed : ", outputFile);
            }).catch(error => {
                console.log("Compression failed : ",error.message);
            })
        break;
    case "joke":
         getJoke()
        break;
    case "help":
        console.log(`
            ${process.env.APP_NAME || "Node CLI Utility"}

            Available Commands:

            String Manipulation:
                uppercase <text>       Convert text to uppercase
                wordcount <text>       Count words
                palindrome <text>      Check whether text is a palindrome

            File Operations:
                compress <file>        Compress a file
                decompress <file.gz>   Decompress a file

            API:
                joke                   Fetch a random joke

            General:
                help                   Display available commands
        `);
        break;
    default:
        console.log("Available commands:");
        console.log(' uppercase "your text"');
        console.log(' wordCount "your text"');
        console.log(' isPalindrome "your text"');
        console.log(' compress "filename"');
        console.log(' decompress "filename.gz"');
        console.log(' joke');

        break;
}
