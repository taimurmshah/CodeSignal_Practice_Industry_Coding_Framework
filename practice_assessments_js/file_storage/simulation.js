const { file } = require("@babel/types");
const { log, time, timeStamp } = require("console");

/**
 * Simulates a coding framework operation on a list of lists of strings.
 *
 * This function mirrors the signature of the original Python implementation
 * (`simulate_coding_framework`) so that you can practice translating the logic
 * into JavaScript. The accompanying Jest test-suite (see `test_simulation.test.js`)
 * contains the exact same scenarios as the Python unit tests and will guide you
 * towards a correct implementation.
 *
 * @param {string[][]} listOfLists – A list of operations, where each operation is represented
 *                                    as an array of strings. Refer to the tests for concrete
 *                                    examples of the expected input format.
 * @returns {string[]} – An array of result strings corresponding to each operation.
 */

function simulateCodingFramework(listOfLists) {
  const storage = {}
  const output = []

  const isExpired = (timestamp, file) => {
    const searchTime = new Date(timestamp).getTime()
    const expirationTime = file.timestamp.getTime() + (file.ttl * 1000)

    return searchTime > expirationTime
  }

  for (const operation of listOfLists) {
    const [command, ...args] = operation;

    switch (command) {
      case 'FILE_UPLOAD': {
        // console.log("In FILE_UPLOAD, args:", { args })
        const [fileName, size] = args;
        if (storage[fileName]) throw new Error(fileName + " already exists.");

        storage[fileName] = { size }

        output.push("uploaded " + fileName)

        break;
      }

      case 'FILE_UPLOAD_AT': {
        // console.log("In FILE_UPLOAD_AT, args:", { args })
        const [timestamp, fileName, size, ttl = null] = args

        if (storage[fileName]) output.push('could not upload file.');
        else {
          const date = new Date(timestamp)

          storage[fileName] = { size, timestamp: date, ttl }
          console.log({ storage })

          output.push(`uploaded at ${fileName}`)
        }
        break;
      }

      case 'FILE_GET': {
        // console.log("In FILE_GET, args:", { args })
        const [fileName] = args;
        if (!storage[fileName]) output.push("file not found.");
        else output.push("got " + fileName)

        break;
      }

      case 'FILE_GET_AT': {
        // console.log("In FILE_GET_AT, args:", { args })
        const [timestamp, fileName] = args;
        if (!storage[fileName]) {
          output.push("file not found.")
          break;
        }

        const file = storage[fileName];

        if (file.ttl && isExpired(timestamp, file)) output.push('file not found');
        else output.push(`got at ${fileName}`);

        break;
      }

      case 'FILE_COPY': {
        // console.log("In FILE_COPY, args:", { args })
        const [source, dest] = args;

        if (source == dest) output.push("invalid arguments");
        else if (!storage[source]) output.push("source file not found.");
        else storage[dest] = storage[source];

        output.push(`copied ${source} to ${dest}`)

        break;
      }

      case 'FILE_COPY_AT': {
        // console.log("In FILE_COPY, args:", { args })
        const [timestamp, source, dest] = args;

        if (!storage[source]) {
          output.push("file not found")
          break;
        }

        const file = storage[source]

        if (file.ttl && isExpired(timestamp, file)) output.push("could not copy file");
        else {
          storage[dest] = storage[source]
          storage[dest].timestamp = new Date(timestamp)
          output.push(`copied at ${source} to ${dest}`)
        }

        break;
      }

      case 'FILE_SEARCH': {
        const [prefix] = args;
        let files = Object.entries(storage).filter(e => e[0].startsWith(prefix));
        files.sort((a, b) => {
          if (a[1].size != b[1].size) {
            return b[0].localeCompare(a[0])
          } else return b[1].size - a[1].size;
        })

        output.push(`found [${files.map(f => f[0]).join(', ')}]`)

        break;
      }

      case 'FILE_SEARCH_AT': {
        const [timestamp, prefix] = args;

        let files = Object.entries(storage).filter(file => {
          if (file[1].ttl) return !isExpired(timestamp, storage[file[0]]) && file[0].startsWith(prefix);
          else return file[0].startsWith(prefix)
        })

        files.sort((a, b) => {
          if (a[1].size == b[1].size) return a[0].localeCompare(b[0]);
          else return b[1].size - a[1].size;
        })

        output.push(`found at [${files.map(f => f[0]).join(', ')}]`)

        break;
      }

      default:
        output.push("No operations provided.")
    }

  }


  // console.log({ output });
  return output
}

module.exports = { simulateCodingFramework };
