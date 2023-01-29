import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { expect, describe, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const tests = [
  ['file1.json', 'file2.json', 'expected_nested.txt', 'stylish'],
  ['file1.yml', 'file2.yml', 'expected_nested.txt', 'stylish'],
  ['file1.yml', 'file2.yml', 'expected_plain.txt', 'plain'],
  ['file1.yml', 'file2.yml', 'expected_plain.txt', 'plain'],
];

describe('check for correct diff', () => {
  test.each(tests)('Compare files', (firstData, secondData, expectedData, format) => {
    const firstFile = getFixturePath(firstData);
    const secondFile = getFixturePath(secondData);
    const getResult = readFile(expectedData);
    const result = genDiff(firstFile, secondFile, format);
    expect(result).toEqual(getResult);
  });
});
