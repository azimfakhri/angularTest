import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../services/model/employee';
import { Sort, SortDirection } from '@angular/material/sort';
import * as moment from 'moment';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employeeList :Employee[] =[];
  sorted : Employee[] = [];
  count:number = 0;

  currency:string = 'MYR';
  activeSort:string = '';
  activeDirection:SortDirection = '';
  maxsalary:any;
  recentjoin:any;
  constructor(private empService:EmployeeService) { }

  ngOnInit(): void {
    this.InitData();
  }

  InitData(){

    this.empService.getlist()
    .subscribe(res =>{
      this.employeeList = res.map(e=>{
        return new Employee(e.id,e.employeeId,e.firstname,e.lastname,e.dateJoined,e.salary)
      });
      this.sorted = this.employeeList;
      this.count = this.employeeList.length;
      this.activeSort = 'dateJoined';
      this.activeDirection = 'asc';

      let sort:Sort = {active :this.activeSort,direction:this.activeDirection}
      
      this.sorting(sort);
      this.GetSummary();
    });
  }

  GetSummary(){
    var salary = 0;
    var recent = moment('1900-01-01');
    for (let index = 0; index < this.employeeList.length; index++) {
      const element = this.employeeList[index];
      
      if(element.salary>salary){
        salary = element.salary;
        this.maxsalary = element;
      }
      if(moment(element.dateJoined)> moment(recent)){
        recent = moment(element.dateJoined);
        this.recentjoin = element;
      }
    }

    
  }

  sorting(event:Sort){
    if(event.direction != ''){
      this.sorted = this.employeeList.sort((a, b) => {
        return this.sortCompare(a,b,event)
      });
      
    }
  }

  private sortCompare(a:Employee,b:Employee,event:Sort){
    var direction = event.direction === 'asc' ? 1: -1;

    switch (event.active) {
      case 'fullName':
        return (a.fullName > b.fullName ? 1 : -1 ) * direction;
      case 'dateJoined':
        return (moment(a.dateJoined) > moment(b.dateJoined) ? 1 : -1) * direction;
      case 'salary':
        return (a.salary > b.salary ? 1 : -1) * direction;
      default:
        return 0;
    }

  }
}
