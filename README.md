# CNAB Builder

This Node.js service allows you to process CNAB files, search for segments, and company names, and export the results to a JSON file.

## Requirements

- Node.js (>=20.x)
- TypeScript (>=5.x)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/matheussla/cnab-builder.git
    cd cnab-builder
    ```

2. Install the dependencies:

    ```sh
    yarn install
    ```

## Usage

You can use the CLI to search for segments or company names within a CNAB file and export the results to a JSON file.

### CLI Options

- `--from, -f` : Cnab line search starting position
- `--to, -t` : Final search position of the Cnab line
- `--segment, -s` : Segment type
- `--file, -fl` : Path to the CNAB file (default: `./cnabExample.rem`)
- `--segmentSearch, -sg` : Segment to search for
- `--companyName, -nm` : Company name to search for
- `--output, -ot` : Output path for the JSON file (default: `./output.json`)

### Examples

#### Search by Segment

Use the default file and search for a segment:

```sh
yarn dev --segmentSearch R
```

#### Search by Segment with path file and output

Choose the file path input and the output file name

```sh
yarn dev --segmentSearch R --file src/cnabExample.rem --output custom_json_name.json
```

#### Search by Company Name

Use the default file and search for a company name:

```sh
yarn dev --companyName "NTT BRASIL COMERCIO"   
```
#### List Line

The default CLI

```sh
yarn dev -f 21 -t 34 -s p
```