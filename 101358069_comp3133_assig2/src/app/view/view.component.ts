import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Employee } from '../classes/employee.class';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDataService } from '../employee-data.service';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  constructor(private dataService: EmployeeDataService, private activateRoute: ActivatedRoute, public dialog: MatDialog) {}
  id: any;

  employee = new Employee("","","","",0, "")
  message?: string

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get('id')

    this.dataService.getEmployee(this.id).subscribe((result: any) => {
      const getEmp = result.data.searchEmployee
      this.employee.id = this.id;
      this.employee.firstname = getEmp.firstname
      this.employee.lastname = getEmp.lastname
      this.employee.email = getEmp.email
      this.employee.salary = getEmp.salary

      let str = getEmp.gender
      str = str.split('')
      str[0] = str[0].toUpperCase()
      str = str.join('')
      this.employee.gender = str
    })
  }

  onSubmit() {
    this.dataService.updateEmployee(this.id, this.employee).subscribe((results: any) => {
      console.log(results);
    })
  }
}
