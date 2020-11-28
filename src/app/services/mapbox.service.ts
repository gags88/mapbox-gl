import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateCapitals } from '../models/StateCapitals';

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  constructor(private readonly http: HttpClient) {}

  fetchUSStateCapitals(): Observable<StateCapitals[]> {
    return this.http.get<StateCapitals[]>(this.url);
  }

  get url(): string {
    return 'https://raw.githubusercontent.com/vega/vega/master/docs/data/us-state-capitals.json';
  }
}
