import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { empData } from '../models/empData';

@Injectable({
  providedIn: 'root'
})
export class EmpDataService {

  constructor(private httpClient: HttpClient) { }

  getempData(): Observable<empData[]>
  {
    return this.httpClient.get<empData[]>("http://localhost:3001/api/empsData")
      
  }
}
