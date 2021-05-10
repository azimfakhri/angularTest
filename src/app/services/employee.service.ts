import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment'
import { Employee } from './model/employee';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  empurl: string = environment.empAPI;
  constructor(private http: HttpClient) { 

  }

  getlist():Observable<Employee[]>{
    return this.http.get<Employee[]>(this.empurl);
  }
}
