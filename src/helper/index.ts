import * as jsonfile from 'jsonfile';
import chalk from 'chalk';
import * as fs from 'fs';
import { ICompany } from '../interfaces';

export const readFile = (filePath: string): string[] => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent.split('\n');
};

export const exportToJson = (data: ICompany[], outputFile: string): void => {
  jsonfile.writeFileSync(outputFile, data, { spaces: 4 });
};

export const sliceArrayPosition = (arr, ...positions) =>
  [...arr].slice(...positions);

export const messageLog = (segment, segmentType, from, to) => `
----- Cnab line ${segmentType} -----

position from: ${chalk.inverse.bgBlack(from)}

position to: ${chalk.inverse.bgBlack(to)}

isolated item: ${chalk.inverse.bgBlack(segment.substring(from - 1, to))}

item inside of line P: 
  ${segment.substring(0, from)}${chalk.inverse.bgBlack(segment.substring(from - 1, to))}${segment.substring(to)}

----- END ------
`;
