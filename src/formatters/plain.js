import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return value;
};

const plain = (data) => {
  const iter = (currentValue, ancestry) => {
    const lines = currentValue.flatMap((node) => {
      const {
        key, type, value, children, oldValue, newValue,
      } = node;
      const countAncestry = `${ancestry}${key}.`;
      switch (type) {
        case 'nested':
          return iter(children, countAncestry);
        case 'removed':
          return `Property '${ancestry}${key}' was removed`;
        case 'added':
          return `Property '${ancestry}${key}' was added with value: ${stringify(value)}`;
        case 'changed':
          return `Property '${ancestry}${key}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
        case 'unchanged':
          return null;
        default:
          throw new Error(`Unknown type ${type}`);
      }
    });
    return lines.filter((item) => item !== null).join('\n');
  };
  return iter(data, '');
};

export default plain;
