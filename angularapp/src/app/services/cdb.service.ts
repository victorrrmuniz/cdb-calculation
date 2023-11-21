import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvestmentDto } from '../models/investmentDto.model';

@Injectable({
  providedIn: 'root'
})
export class CdbService {

  baseAddress: string = 'https://localhost:7088';

  constructor(private http: HttpClient) { }

  calculate(monetaryValue: number, month: number): Observable<InvestmentDto> {
    return this.http.get<InvestmentDto>(`${this.baseAddress}/cdb?monetaryValue=${monetaryValue}&month=${month}`);
  }
}
