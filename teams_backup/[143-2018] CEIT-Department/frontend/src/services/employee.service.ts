import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Employee } from 'src/models/employee.model';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  uri = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) { }

  logIn(username:string, password:string){
    var data={
      username: username,
      password: password
    }
    return this.http.post<Employee>(`${this.uri}/login`, data);
  }

    //Server vraca zaposlenog kome se poklapa kor ime sa parametrima
    check(username:string){
      var data={
        username:username
      }
      return this.http.post<Employee>(`${this.uri}/check`, data);
    }
  
    //Server kreira zaposlenog sa parametrima
    register(username:string, password:string, name:string, surname:string, rank: string, phone: string, address: string, website: string, biography: string, room: string){
      var data={
        username: username+'@etf.bg.ac.rs',
        password: password,
        name:name,
        surname:surname,
        rank:rank,
        phone:phone,
        address:address,
        website:website,
        biography:biography,
        room:room,
        status:1
      }
      return this.http.post<Employee>(`${this.uri}`, data);
    }
  
    //Vracanje svih zaposlenih
    getEmployees(){
      return this.http.get<Employee[]>(`${this.uri}`);
    }
  
    deleteEmployee(id:number){
      return this.http.delete(`${this.uri}/${id}`);
    }
  
    updateEmployee(id:number, username:string, name:string, surname:string, rank: string, phone: string, address: string, website: string, biography: string, room: string, status:number){
      var data={
        id:id,
        username: username,
        name:name,
        surname:surname,
        rank:rank,
        phone:phone,
        address:address,
        website:website,
        biography:biography,
        room:room,
        status:status
      }
      return this.http.put<Employee>(`${this.uri}`, data);
    }

    updateEmployeeWithPass(id:number, username:string, password:string, name:string, surname:string, rank: string, phone: string, address: string, website: string, biography: string, room: string, status:number){
      var data={
        id:id,
        username: username,
        password:password,
        name:name,
        surname:surname,
        rank:rank,
        phone:phone,
        address:address,
        website:website,
        biography:biography,
        room:room,
        status:status
      }
      return this.http.put<Employee>(`${this.uri}`, data);
    }
  
    deleteAllEmployees(){
      return this.http.delete(`${this.uri}`);
    }
}