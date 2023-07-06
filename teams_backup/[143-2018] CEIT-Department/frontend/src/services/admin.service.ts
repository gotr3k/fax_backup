import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Admin } from 'src/models/admin.model';


@Injectable({
    providedIn:'root'
})

export class AdminService {

  uri = 'http://localhost:8080/api/admins';

  constructor(private http: HttpClient) { }

  logIn(username:string, password:string){
    var data={
      username: username,
      password: password
    }
    return this.http.post<Admin>(`${this.uri}/login`, data);
  }
}
