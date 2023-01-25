import process from 'process';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parsers from './parsers.js';

const getDiffInfo = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const result = keys.map((key) => {
    if (!_.has(data1, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: data1[key] };
    }
    if (data1[key] !== data2[key]) {
      return {
        key, type: 'changed', oldValue: data1[key], newValue: data2[key],
      };
    }
    return { key, type: 'unchanged', value: data1[key] };
  });
  return result;
};

const getDiffStyle = (difference) => {
  const result = difference.map((diff) => {
    const diffType = diff.type;
    switch (diffType) {
      case 'removed':
        return `  - ${diff.key}: ${diff.value}`;
      case 'unchanged':
        return `    ${diff.key}: ${diff.value}`;
      case 'changed':
        return (`  - ${diff.key}: ${diff.oldValue} \n  + ${diff.key}: ${diff.newValue}`);
      case 'added':
        return `  + ${diff.key}: ${diff.value}`;
      default:
        return null;
    }
  });
  return `{\n${result.join('\n')}\n}`;
};

const getPathFile = (filepath) => path.resolve(process.cwd(), filepath);

const getFormatName = (filePath) => path.extname(filePath).slice(1);

const genDiff = (filepath1, filepath2) => {
  const file1Data = fs.readFileSync(getPathFile(filepath1));
  const file2Data = fs.readFileSync(getPathFile(filepath2));
  const file1Ext = getFormatName(filepath1);
  const file2Ext = getFormatName(filepath2);
  const obj1 = parsers(file1Data, file1Ext);
  const obj2 = parsers(file2Data, file2Ext);
  const difference = _.sortBy(getDiffInfo(obj1, obj2), (o) => o.key);
  return getDiffStyle(difference);
};

export default genDiff;
