const fs = require('fs')
const zlib = require('zlib')
const path =require('path')

function validateInputFile(inputFile){
    if (!inputFile) {
        throw new Error("Please provide a file path")
    }
    if (!fs.existsSync(inputFile)) {
        throw new Error(`File not found : ${inputFile}`)
    }
    if (!fs.statSync(inputFile).isFile()) {
        throw new Error("The provided path is not a file")
    }
}

function compressFile(inputFile) {
    return new Promise((resolve, reject) => {

        validateInputFile(inputFile)

        const outputFile = `${inputFile}.gz`
        const source = fs.createReadStream(inputFile)
        const destination = fs.createWriteStream(outputFile)

        source
            .pipe(zlib.createGzip())
            .pipe(destination)

        source.on("error",reject)
        destination.on("error",reject)

        destination.on("finish", ()=>{
            resolve(outputFile)
        })
    })
}

function decompressFile(inputFile) {
    return new Promise((resolve, reject)=>{
        if (!inputFile.endsWith(".gz")) {
            return reject(
                new Error("Input file must have a .gz extension")
            )
        }
        const outputFile = inputFile.slice(0,-3)
        const source = fs.createReadStream(inputFile)
        const destination = fs.createWriteStream(outputFile)

        source  
            .pipe(zlib.createGunzip())
            .pipe(destination)

        source.on("error",reject)
        destination.on("error",reject)

        destination.on("finish",()=>{
            resolve(outputFile)
        })
    })
}

module.exports = { compressFile, decompressFile}