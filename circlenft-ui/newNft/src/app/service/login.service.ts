import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { signUp } from '../models/signUp';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(data:Login): Observable<Login>
  {
    return this.httpClient.post<Login>("http://localhost:3001/api/signin", data);
  }

  sigup(data:signUp): Observable<signUp>{
    return this.httpClient.post<signUp>("http://localhost:3001/api/signup", data);
  }

  update(data:signUp): Observable<signUp>{
    return this.httpClient.post<signUp>("http://localhost:3001/api/update", data);
  }
}


