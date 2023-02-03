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
  ['json'],
  ['yml'],
  ['yaml'],
];

describe('check for correct diff', () => {
  const expectedStylish = readFile('expected_nested.txt');
  const expectedPlain = readFile('expected_plain.txt');
  const expectedJson = readFile('expected_file.json');
  test.each(tests)('Compare files', (extension1) => {
    const file1 = getFixturePath(`file1.${extension1}`);
    const file2 = getFixturePath(`file2.${extension1}`);
    expect(genDiff(file1, file2, 'stylish')).toEqual(expectedStylish);
    expect(genDiff(file1, file2, 'plain')).toEqual(expectedPlain);
    expect(genDiff(file1, file2, 'json')).toEqual(expectedJson);
    expect(genDiff(file1, file2)).toEqual(expectedStylish);
  });
});

test('unknown format', () => {
  expect(() => genDiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'unknownFormat'))
    .toThrow('Format not supported: unknownFormat');
});

test('unknown extension', () => {
  expect(() => genDiff('__fixtures__/expected_nested.txt', '__fixtures__/expected_plain.txt'))
    .toThrow('Extension not supported: txt');
});
