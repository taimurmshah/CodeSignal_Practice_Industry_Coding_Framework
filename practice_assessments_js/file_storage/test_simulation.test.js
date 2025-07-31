const { simulateCodingFramework } = require('./simulation');

/*
  This test-suite is a line-for-line port of the original Python `unittest`
  file (`test_simulation.py`). The input data and expected outputs are identical
  so that behaviour remains unchanged across languages.

  The tests use Jest which is a popular JavaScript testing framework. To run
  the tests:

      1. npm install --save-dev jest
      2. npx jest  # or add an npm script such as "test": "jest"

  You should not modify the tests – update your implementation in
  `simulation.js` until all the tests pass.
*/

describe('simulateCodingFramework', () => {
  const testData1 = [
    ['FILE_UPLOAD', 'Cars.txt', '200kb'],
    ['FILE_GET', 'Cars.txt'],
    ['FILE_COPY', 'Cars.txt', 'Cars2.txt'],
    ['FILE_GET', 'Cars2.txt'],
  ];
  const expected1 = [
    'uploaded Cars.txt',
    'got Cars.txt',
    'copied Cars.txt to Cars2.txt',
    'got Cars2.txt',
  ];

  const testData2 = [
    ['FILE_UPLOAD', 'Foo.txt', '100kb'],
    ['FILE_UPLOAD', 'Bar.csv', '200kb'],
    ['FILE_UPLOAD', 'Baz.pdf', '300kb'],
    ['FILE_SEARCH', 'Ba'],
  ];
  const expected2 = [
    'uploaded Foo.txt',
    'uploaded Bar.csv',
    'uploaded Baz.pdf',
    'found [Baz.pdf, Bar.csv]',
  ];

  const testData3 = [
    ['FILE_UPLOAD_AT', '2021-07-01T12:00:00', 'Python.txt', '150kb'],
    ['FILE_UPLOAD_AT', '2021-07-01T12:00:00', 'CodeSignal.txt', '150kb', 3600],
    ['FILE_GET_AT', '2021-07-01T13:00:01', 'Python.txt'],
    ['FILE_COPY_AT', '2021-07-01T12:00:00', 'Python.txt', 'PythonCopy.txt'],
    ['FILE_SEARCH_AT', '2021-07-01T12:00:00', 'Py'],
    ['FILE_UPLOAD_AT', '2021-07-01T12:00:00', 'Expired.txt', '100kb', 1],
    ['FILE_GET_AT', '2021-07-01T12:00:02', 'Expired.txt'],
    ['FILE_COPY_AT', '2021-07-01T12:00:00', 'CodeSignal.txt', 'CodeSignalCopy.txt'],
    ['FILE_SEARCH_AT', '2021-07-01T12:00:00', 'Code'],
  ];
  const expected3 = [
    'uploaded at Python.txt',
    'uploaded at CodeSignal.txt',
    'got at Python.txt',
    'copied at Python.txt to PythonCopy.txt',
    'found at [Python.txt, PythonCopy.txt]',
    'uploaded at Expired.txt',
    'file not found',
    'copied at CodeSignal.txt to CodeSignalCopy.txt',
    'found at [CodeSignal.txt, CodeSignalCopy.txt]',
  ];

  const testData4 = [
    ['FILE_UPLOAD_AT', '2021-07-01T12:00:00', 'Initial.txt', '100kb'],
    ['FILE_UPLOAD_AT', '2021-07-01T12:05:00', 'Update1.txt', '150kb', 3600],
    ['FILE_GET_AT', '2021-07-01T12:10:00', 'Initial.txt'],
    ['FILE_COPY_AT', '2021-07-01T12:15:00', 'Update1.txt', 'Update1Copy.txt'],
    ['FILE_UPLOAD_AT', '2021-07-01T12:20:00', 'Update2.txt', '200kb', 1800],
    ['ROLLBACK', '2021-07-01T12:10:00'],
    ['FILE_GET_AT', '2021-07-01T12:25:00', 'Update1.txt'],
    ['FILE_GET_AT', '2021-07-01T12:25:00', 'Initial.txt'],
    ['FILE_SEARCH_AT', '2021-07-01T12:25:00', 'Up'],
    ['FILE_GET_AT', '2021-07-01T12:25:00', 'Update2.txt'],
  ];
  const expected4 = [
    'uploaded at Initial.txt',
    'uploaded at Update1.txt',
    'got at Initial.txt',
    'copied at Update1.txt to Update1Copy.txt',
    'uploaded at Update2.txt',
    'rollback to 2021-07-01T12:10:00',
    'got at Update1.txt',
    'got at Initial.txt',
    'found at [Update1.txt, Update1Copy.txt, Update2.txt]',
    'got at Update2.txt',
  ];

  test('group 1 – basic upload/get/copy', () => {
    expect(simulateCodingFramework(testData1)).toEqual(expected1);
  });

  test('group 2 – search functionality', () => {
    expect(simulateCodingFramework(testData2)).toEqual(expected2);
  });

  test('group 3 – expiry and timestamped operations', () => {
    expect(simulateCodingFramework(testData3)).toEqual(expected3);
  });

  test('group 4 – rollback', () => {
    expect(simulateCodingFramework(testData4)).toEqual(expected4);
  });
});
