### Tests and linter status:
[![Actions Status](https://github.com/Atty-code/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/Atty-code/frontend-project-46/actions)
[![Actions Status](https://github.com/Atty-code/frontend-project-46/workflows/main-check/badge.svg)](https://github.com/Atty-code/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/2059a93e05ba25d7d8fd/maintainability)](https://codeclimate.com/github/Atty-code/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2059a93e05ba25d7d8fd/test_coverage)](https://codeclimate.com/github/Atty-code/frontend-project-46/test_coverage)

## About The Project

"Difference generator" is a program that determines the difference between two data structures. This is a popular task for which there are many online services, such as http://www.jsondiff.com/. A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files.

## Installation

1. Clone the repo
   ```bash
   git clone https://github.com/atty-ak/frontend-project-46.git
   ```

2. Install packages dependencies
   ```bash
   make install
   ```

## Usage:
  ```bash
gendiff [options] <filepath1> <filepath2>
  ```
  _Options:_
```
    -V, --version        output the version number
    -f, --format <type>  output format: stylish, plain, json (default: "stylish")
    -h, --help           display help for command
```

## Demo:
1. Flat json format comparison and -h option:

[![asciicast](https://asciinema.org/a/Afrea5BmMEf6jcoVruJ53xO3P.svg)](https://asciinema.org/a/Afrea5BmMEf6jcoVruJ53xO3P)

2. Flat yaml format comparison:

[![asciicast](https://asciinema.org/a/554555.svg)](https://asciinema.org/a/554555)

3. Comparison nested structures with default --format stylish:

[![asciicast](https://asciinema.org/a/555352.svg)](https://asciinema.org/a/555352)

4. Comparison nested structures with --format plain:

[![asciicast](https://asciinema.org/a/555535.svg)](https://asciinema.org/a/555535)

5. Comparison nested structures with --format json:

[![asciicast](https://asciinema.org/a/555547.svg)](https://asciinema.org/a/555547)