const { file } = require("@babel/types");
const { log } = require("console");

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

  for (const operation of listOfLists) {
    const [command, ...args] = operation;
    console.log({ command })

    switch (command) {
      case 'FILE_UPLOAD': {
        // console.log("In FILE_UPLOAD, args:", { args })
        const [fileName, size] = args;
        if (storage[fileName]) throw new Error(fileName + " already exists.");

        storage[fileName] = { size }

        output.push("uploaded " + fileName)

        break;
      }

      case 'FILE_GET': {
        // console.log("In FILE_GET, args:", { args })
        const [fileName] = args;
        if (!storage[fileName]) output.push("file not found.");
        else output.push("got " + fileName)

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

      default:
        output.push("No operations provided.")
    }

  }



  return output
}

module.exports = { simulateCodingFramework };
