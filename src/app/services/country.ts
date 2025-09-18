import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICountry, ICountryInfo, IHoliday } from '../models';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCountries(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(`${this.apiUrl}/AvailableCountries`);
  }

  getHolidays(countryCode: string, year: number): Observable<IHoliday[]> {
    return this.http.get<IHoliday[]>(
      `${this.apiUrl}/PublicHolidays/${year}/${countryCode}`
    );
  }

  getNextHolidays(countryCode: string): Observable<IHoliday[]> {
    return this.http.get<IHoliday[]>(
      `${this.apiUrl}/NextPublicHolidays/${countryCode}`
    );
  }

  getCountryInfo(countryCode: string): Observable<ICountryInfo> {
    return this.http.get<ICountryInfo>(
      `${this.apiUrl}/CountryInfo/${countryCode}`
    );
  }
}
