import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap, catchError, map } from 'rxjs';

import { CountryService } from '../../services/country';

import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonToggleModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatIconModule,
  ],
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly countryService = inject(CountryService);

  public readonly years = Array.from({ length: 11 }, (_, i) => 2020 + i);

  public selectedYear = signal<number>(new Date().getFullYear());

  private readonly countryCode = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('code')))
  );

  public readonly countryInfo = toSignal(
    toObservable(this.countryCode).pipe(
      switchMap((code) => {
        if (!code) return of(undefined);
        return this.countryService.getCountryInfo(code).pipe(
          catchError(() => {
            return of(undefined);
          })
        );
      })
    )
  );

  private readonly holidayParams = computed(() => ({
    code: this.countryCode(),
    year: this.selectedYear(),
  }));

  public readonly holidays = toSignal(
    toObservable(this.holidayParams).pipe(
      switchMap(({ code, year }) => {
        if (!code) return of([]); // Return empty array if no country code
        return this.countryService.getHolidays(code, year).pipe(
          catchError(() => {
            return of([]);
          })
        );
      })
    ),
    { initialValue: [] }
  );

  public changeYear(year: number): void {
    this.selectedYear.set(year);
  }
}
