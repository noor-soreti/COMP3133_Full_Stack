import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Employee } from '../classes/employee.class';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDataService } from '../employee-data.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {

  constructor(private dataService: EmployeeDataService, private activateRoute: ActivatedRoute, public dialog: MatDialog) {}

  employee = new Employee("","","","",0, "")
  id: any
  gender = ["Male", "Female", "Other"]
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
    this.dataService.deleteEmployee(this.id).subscribe((result: any) => {
      this.openDialog()

      console.log(result);
    })
  }

  openDialog(): void {
    this.dialog.open(ModalComponent, {
      data: {title: "Employee deleted!", textContent: "You will be redirected to home page", nav: "/session/home"}
    })
  }

}
