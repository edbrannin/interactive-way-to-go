import fs from 'fs';
import util from 'util';

import parseProblem, { convertCoordinateLettersToLetterNumber, initialSetup } from '../src/tools/parseProblem'

const readFileAsync = util.promisify(fs.readFile);

const readXml = (name) => {
  return readFileAsync(`${__dirname}/xml-in/${name}.xml`);
}

describe('convertCoordinateLettersToLetterNumber', () => {
  it('should handle A1', () => {
    expect(convertCoordinateLettersToLetterNumber('aa')).toBe('a1');
    expect(convertCoordinateLettersToLetterNumber('AA')).toBe('a1');
  })
})

describe('initialSetup', () => {
  it('should handle 50k-1', () => {
    const input = 'B[de]W[ee]B[ed]B[ef]';
    const expected = {
      d5: "black",
      e5: "white",
      e4: "black",
      e6: "black",
    };
    const observed = initialSetup(input);
    expect(observed).toEqual(expected);
  })
})

describe('parseProblem', () => {
  it('should return a thing', async () => {
    const input = await readXml('50K-1');
    const output = await parseProblem(input);
    const expected = {
      size: 9,
      stones: {
        d5: "black",
        e5: "white",
        e4: "black",
        e6: "black",
      },
      plays: {
        fe: {
          message: 'success',
          style: 'red',
        },
        default: {
          response: 'fe',
          message: 'failed',
          style: 'blue',
        }
      },
    }
    console.log(expected)
    expect(output).toEqual(expected)
  })
})
