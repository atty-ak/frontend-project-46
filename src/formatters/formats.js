import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

export default (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    case 'json':
      return json(diff);
    default:
      throw new Error(`Format not supported: ${format}`);
  }
};
