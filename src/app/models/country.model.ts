export interface ICountry {
  countryCode: string;
  name: string;
}

export interface ICountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: ICountryInfo[];
}
