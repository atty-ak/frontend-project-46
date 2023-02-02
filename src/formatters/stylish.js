import _ from 'lodash';

const stringify = (value, depth, replacer = ' ', spacesCount = 1) => {
  const iter = (currentValue, deep) => {
    if (!_.isObject(currentValue)) {
      return `${currentValue}`;
    }

    const indentSize = deep * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => `${currentIndent}${key}: ${iter(val, deep + 1)}`);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, depth);
};

const replacer = '    ';
const spacesCount = 1;

const getIndent = (depth) => replacer.repeat(depth * spacesCount);

const stylish = (data) => {
  const iter = (currentValue, depth) => {
    const bracketIndent = replacer.repeat(depth * spacesCount - spacesCount);

    const lines = currentValue.map((node) => {
      const {
        key, type, value, children, oldValue, newValue,
      } = node;
      switch (type) {
        case 'nested':
          return `${getIndent(depth)}${key}: ${iter(children, depth + 1)}`;
        case 'removed':
          return `${getIndent(depth).slice(2)}- ${key}: ${stringify(value, depth + 1, replacer)}`;
        case 'added':
          return `${getIndent(depth).slice(2)}+ ${key}: ${stringify(value, depth + 1, replacer)}`;
        case 'changed':
          return `${getIndent(depth).slice(2)}- ${key}: ${stringify(oldValue, depth + 1, replacer)}\n${getIndent(depth).slice(2)}+ ${key}: ${stringify(newValue, depth + 1, replacer)}`;
        default:
          return `${getIndent(depth)}${key}: ${value}`;
      }
    });
    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };
  return iter(data, 1);
};

export default stylish;
