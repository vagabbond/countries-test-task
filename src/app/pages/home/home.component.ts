import { Component, OnInit, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  Observable,
  forkJoin,
  of,
  catchError,
  map,
  switchMap,
  tap,
} from 'rxjs';

import { CountryService } from '../../services/country';
import { ICountry, IHoliday } from '../../models';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

type RandomHolidayInfo = {
  country: ICountry;
  holiday: IHoliday;
};

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public searchControl = new FormControl('');

  private searchTerm = toSignal(this.searchControl.valueChanges, {
    initialValue: '',
  });

  private allCountries = signal<ICountry[]>([]);

  public filteredCountries = computed(() => {
    const term = this.searchTerm()?.toLowerCase() ?? '';
    if (!term) {
      return this.allCountries();
    }
    return this.allCountries().filter((country) =>
      country.name.toLowerCase().includes(term)
    );
  });

  public isLoadingRandomHolidays = signal(true);

  public randomHolidays = signal<RandomHolidayInfo[]>([]);

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.initializeCountries();
    this.initializeRandomHolidaysWidget();
  }

  private initializeCountries(): void {
    this.countryService
      .getCountries()
      .pipe(catchError(() => of([])))
      .subscribe((countries) => {
        this.allCountries.set(countries);
      });
  }

  private initializeRandomHolidaysWidget(): void {
    this.countryService
      .getCountries()
      .pipe(
        switchMap((countries) => this.fetchRandomHolidays(countries)),
        tap(() => this.isLoadingRandomHolidays.set(false)),
        catchError(() => {
          this.isLoadingRandomHolidays.set(false);
          return of([]);
        })
      )
      .subscribe((holidays) => {
        this.randomHolidays.set(holidays);
      });
  }

  private fetchRandomHolidays(
    countries: ICountry[]
  ): Observable<RandomHolidayInfo[]> {
    if (!countries || countries.length === 0) return of([]);

    const randomCountries = this.getRandomItems(countries, 3);

    const holidayRequests$ = randomCountries.map((country) =>
      this.countryService.getNextHolidays(country.countryCode).pipe(
        map((holidays) => ({
          country,
          holiday: holidays[0],
        })),
        catchError(() => of(null))
      )
    );

    return forkJoin(holidayRequests$).pipe(
      map((results) =>
        results.filter(
          (result): result is RandomHolidayInfo =>
            result !== null && !!result.holiday
        )
      )
    );
  }

  private getRandomItems<T>(array: T[], count: number): T[] {
    return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
  }
}
