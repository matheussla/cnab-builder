import * as path from 'path';
import { hideBin } from 'yargs/helpers';

import yargs from 'yargs';
import {
  exportToJson,
  messageLog,
  sliceArrayPosition,
  readFile,
} from './helper';
import { SearchService } from './services/searchService';

const DEFAULT_FILE_PATH = path.resolve(
  process.env.DEFAULT_FILE_PATH || 'src/data/input/cnabExample.rem',
);
const DEFAULT_OUTPUT_PATH = path.resolve(
  process.env.DEFAULT_OUTPUT_PATH || 'src/data/output/cnabToJson.json',
);

const main = () => {
  console.log('Running 🏃‍♂️‍➡️');

  const searchService = new SearchService();

  const optionsArgs: any = yargs(hideBin(process.argv))
    .usage('Use: $0 [options]')
    .option('f', {
      alias: 'from',
      describe: 'Cnab line search starting position',
      type: 'number',
      demandOption: false,
    })
    .option('t', {
      alias: 'to',
      describe: 'Final search position of the Cnab line',
      type: 'number',
      demandOption: false,
    })
    .option('s', {
      alias: 'segment',
      describe: 'Segment type',
      type: 'string',
      demandOption: false,
    })
    .option('file', {
      alias: 'fl',
      type: 'string',
      description: 'Path to the CNAB file',
      default: DEFAULT_FILE_PATH,
    })
    .option('segmentSearch', {
      alias: 'sg',
      type: 'string',
      description: 'Segment to search for',
    })
    .option('companyName', {
      alias: 'nm',
      type: 'string',
      description: 'Company name to search for',
    })
    .option('output', {
      alias: 'ot',
      type: 'string',
      description: 'Output path for the JSON file',
      default: DEFAULT_OUTPUT_PATH,
    })
    .help()
    .alias('help', 'h')
    .example(
      '$0 -f 21 -t 34 -s p',
      'List the line and field that from and to of cnab',
    ).argv;

  const { from, to, segmento } = optionsArgs;

  const log = console.log;

  const filePath = optionsArgs.file
    ? path.resolve(optionsArgs.file)
    : DEFAULT_FILE_PATH;
  const lines = readFile(filePath);

  const cnabHeader = sliceArrayPosition(lines, 0, 2);

  const [cnabBodySegmentoP, cnabBodySegmentoQ, cnabBodySegmentoR] =
    sliceArrayPosition(lines, 2, -2);

  const cnabTail = sliceArrayPosition(lines, -2);

  if (segmento === 'p') {
    log(messageLog(cnabBodySegmentoP, 'P', from, to));
    return;
  }

  if (segmento === 'q') {
    log(messageLog(cnabBodySegmentoQ, 'Q', from, to));
    return;
  }

  if (segmento === 'r') {
    log(messageLog(cnabBodySegmentoR, 'R', from, to));
    return;
  }

  if (optionsArgs.segmentSearch) {
    const companies = searchService.searchBySegment(
      lines,
      optionsArgs.segmentSearch,
    );

    const outputFilePath = optionsArgs.output
      ? path.resolve(optionsArgs.output)
      : DEFAULT_OUTPUT_PATH;
    exportToJson(companies, outputFilePath);
    console.log(
      `Companies in segment ${optionsArgs.segmentSearch}:`,
      companies,
    );
  }

  if (optionsArgs.companyName) {
    const matches = searchService.searchByCompanyName(
      lines,
      optionsArgs.companyName,
    );
    console.log(
      `Matches for company name '${optionsArgs.companyName}':`,
      matches,
    );

    const outputFilePath = optionsArgs.output
      ? path.resolve(optionsArgs.output)
      : DEFAULT_OUTPUT_PATH;
    exportToJson(matches, outputFilePath);
    console.log(`Exported data to ${outputFilePath}`);
  }
};

main();
