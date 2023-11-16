import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CdbServiceService {

  baseAddress: string = 'https://localhost:7088';

  constructor(private http: HttpClient) { }

  calculate(): Observable<any> {
    return this.http.get<any>(`${this.baseAddress}/cdb`);
  }
}
