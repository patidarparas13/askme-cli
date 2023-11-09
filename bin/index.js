#!/usr/bin/env node
import fs from 'fs';

class FileReader {
  constructor(args) {
    this.args = args;
    this.filename = this.getFilenameFromArgs();
    this.fileContent = this.getFileBuffer();
    this.isReadBytesOption = this.args.includes('-c');
    this.isCountLinesOption = this.args.includes('-l');
    this.isCountWordOption = this.args.includes('-w');
    this.isCountCharsOption = this.args.includes('-m');
  }

  getFileBuffer() {
    try {
      return fs.readFileSync(this.filename, 'utf-8');
    } catch (err) {
      console.error(`Error reading file: ${err.message}`);
      process.exit(1);
    }
  }

  getFilenameFromArgs() {
    const filenameIndex = this.args.findIndex((arg) => !arg.startsWith('-'));
    if (filenameIndex === -1) {
      console.log('Please provide a filename.');
      process.exit(1);
    }
    return this.args[filenameIndex];
  }

  readFileAsBytes() {
    const byteLen = Buffer.byteLength(this.fileContent);
    return byteLen;
  }

  countLines() {
    const lineCount = this.fileContent.split('\n').length ? this.fileContent.split('\n').length - 1 : 0;
    return lineCount;
  }

  countWords() {
    const wordCount = this.fileContent
      .split(/\s+/)
      .filter((word) => word).length;
    return wordCount;
  }

  countChars() {
    let charCount =  this.fileContent.length;
    return charCount;
  }

  main() {
    let output = '';
    if (this.isReadBytesOption) {
      output += this.readFileAsBytes() + '\t';
    } else if (this.isCountLinesOption) {
      output += this.countLines() + '\t';
    } else if (this.isCountWordOption) {
      output += this.countWords() + '\t';
    } else if (this.isCountCharsOption) {
      output += this.countChars() + '\t';
    } else {
      output += this.readFileAsBytes() + '\t';
      output += this.countLines() + '\t';
      output += this.countWords() + '\t';
    }
    output += this.filename;
    console.log(output)
  }
}

// Create an instance of FileReader with command line arguments
const fileReader = new FileReader(process.argv.slice(2));

// Call the main method
fileReader.main();
