import * as path from 'path';
import * as jsonfile from 'jsonfile';
import { inverse, bgBlack } from 'ansi-colors';
import * as fs from 'fs';
import { ICompany } from '../interfaces';

export const readFile = (filePath: string): string[] => {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return fileContent.split('\n');
};

export const exportToJson = (data: ICompany[], outputFile: string): void => {
  jsonfile.writeFileSync(outputFile, data, { spaces: 4 });
};

export const generateJson = (
  matches: ICompany[],
  defaultOutput: string,
  output?: string,
) => {
  const outputFilePath = output ? path.resolve(output) : defaultOutput;
  exportToJson(matches, outputFilePath);
};

export const sliceArrayPosition = (arr, ...positions) =>
  [...arr].slice(...positions);

export const messageLog = (
  segment: string,
  segmentType: string,
  from: number,
  to: number,
): string => `
----- Cnab line ${segmentType} -----

position from: ${inverse(bgBlack(from.toString()))}

position to: ${inverse(bgBlack(to.toString()))}

isolated item: ${inverse(bgBlack(segment.substring(from - 1, to)))}

item inside of line P: 
  ${segment.substring(0, from - 1)}${inverse(bgBlack(segment.substring(from - 1, to)))}${segment.substring(to)}

----- END ------
`;
