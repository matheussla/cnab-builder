import { ICompany } from '../interfaces';

export class SearchService {
  searchByFilter(lines: string[], filter: string): ICompany[] {
    const matches: ICompany[] = [];

    lines.forEach((line) => {
      if (line[13] === 'P' || line[13] === 'Q' || line[13] === 'R') {
        const companyNameMatch = line.includes(filter);
        const cityWithRegion = line
          .slice(136, 153)
          .trim()
          .replace(/\s\s+/g, ' ');
        const addressMatch = line.slice(73, 128).trim().replace(/\s\s+/g, ' ');
        const cep = line.slice(128, 136).trim().replace(/\s\s+/g, ' ');

        if (companyNameMatch) {
          const name = line.slice(33, 73).trim().replace(/\s\s+/g, ' ');
          const address = `${addressMatch}, ${cep}, ${cityWithRegion}`;

          const segment = line[13];

          matches.push({
            name,
            address,
            segment,
            position: lines.indexOf(line),
          });
        }
      }
    });
    return matches;
  }
}
