import process from 'process';
import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';
import buildASTtree from './ASTtree.js';
import format from './formatters/formats.js';

const getPathFile = (filepath) => path.resolve(process.cwd(), filepath);

const getFormatName = (filePath) => path.extname(filePath).slice(1);

const genDiff = (filepath1, filepath2, formats = 'stylish') => {
  const file1Data = fs.readFileSync(getPathFile(filepath1));
  const file2Data = fs.readFileSync(getPathFile(filepath2));
  const file1Ext = getFormatName(filepath1);
  const file2Ext = getFormatName(filepath2);
  const obj1 = parsers(file1Data, file1Ext);
  const obj2 = parsers(file2Data, file2Ext);
  const difference = buildASTtree(obj1, obj2);
  return format(difference, formats);
};

export default genDiff;
