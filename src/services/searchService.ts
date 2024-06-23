import { ICompany } from '../interfaces';

export class SearchService {
  searchBySegment(lines: string[], segment: string): ICompany[] {
    const companies: ICompany[] = [];
    lines.forEach((line, index) => {
      if (line.includes(segment)) {
        const fullName = line.slice(86, 126).trim();
        const address = line.slice(126, 166).trim();
        companies.push({
          name: fullName,
          address,
          position: index,
          segment,
        });
      }
    });
    return companies;
  }

  searchByCompanyName(lines: string[], companyName: string): ICompany[] {
    const matches: ICompany[] = [];
    lines.forEach((line, index) => {
      if (line.includes(companyName)) {
        const fullName = line.slice(86, 126).trim();
        const address = line.slice(126, 166).trim();
        const segment = line[13];
        matches.push({
          name: fullName,
          address,
          position: index,
          segment,
        });
      }
    });
    return matches;
  }
}
