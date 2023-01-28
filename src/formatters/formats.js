import stylish from './stylish.js';

export default (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`Format not supported: ${format}`);
  }
};
