import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { expect, beforeEach, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

let result;

beforeEach(() => {
  result = readFile('expected_file.txt');
});

test('json format', () => {
  const file1 = getFixturePath('filepath1.json');
  const file2 = getFixturePath('filepath2.json');
  expect(genDiff(file1, file2)).toEqual(result);
});

test('yml format', () => {
  const file1 = getFixturePath('filepath1.yml');
  const file2 = getFixturePath('filepath2.yml');
  expect(genDiff(file1, file2)).toEqual(result);
});
