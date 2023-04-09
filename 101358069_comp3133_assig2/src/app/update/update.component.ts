import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Employee } from '../classes/employee.class';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDataService } from '../employee-data.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {

  constructor(private dataService: EmployeeDataService, private activateRoute: ActivatedRoute, public dialog: MatDialog) {}
  id: any;
  gender = ["Male", "Female", "Other"]

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
    console.log(this.id);
    
    try {
      this.dataService.updateEmployee(this.id, this.employee).subscribe((results: any) => {
        if ( results ) {
          console.log("hi");
        } 
      })
    } catch (e) {
      console.log(e);
      
    }
    
  }

  openDialog(): void {
    this.dialog.open(ModalComponent, {
      data: {title: "Created new employee!", textContent: "You will be redirected to home page", nav: "/session/home"}
    })
  }
}
