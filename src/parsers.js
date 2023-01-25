const parsers = {
  json: JSON.parse,
};

export default (data, format) => {
  if (!parsers[format]) {
    throw new Error(`The input format '${format}' is not supported.`);
  }
  return parsers[format](data);
};
