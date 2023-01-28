import _ from 'lodash';

const buildASTtree = (data1, data2) => {
  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));
  const tree = keys.map((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!_.has(data1, key)) {
      return { key, type: 'added', value: value2 };
    }
    if (!_.has(data2, key)) {
      return { key, type: 'removed', value: value1 };
    }
    if (_.has(data1, key) && _.has(data2, key)) {
      if (_.isObject(value1) && _.isObject(value2)) {
        return { key, type: 'nested', children: buildASTtree(value1, value2) };
      }
      if (value1 === value2) return { key, type: 'unchanged', value: value1 };
      if (value1 !== value2) {
        return {
          key, type: 'changed', oldValue: value1, newValue: value2,
        };
      }
    }
    return tree;
  });

  return tree;
};

export default buildASTtree;
