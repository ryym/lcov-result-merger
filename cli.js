exports.parseArgs = parseArgs

function parseArgs(rawArgv) {
  var args = rawArgv.slice(2)
  var outStart = findOutStartIndex(args)
  var outputFile, inputFiles

  if (outStart === 0) {
    inputFiles = []
    outputFile = args[1]
  }
  else if (outStart > 1) {
    outputFile = args[outStart + 1]
    inputFiles = args.slice(0, outStart)
  }
  else {
    inputFiles = args
  }

  return {
    inputFiles: inputFiles,
    outputFile: outputFile
  }
}

function findOutStartIndex(args) {
  var outStart = args.indexOf('-o')
  return outStart > -1 ? outStart : args.indexOf('--outfile')
}
