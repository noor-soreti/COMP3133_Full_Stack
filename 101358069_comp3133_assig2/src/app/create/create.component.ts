import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { MatDialog } from "@angular/material/dialog";
import { Employee } from '../classes/employee.class';
import { EmployeeDataService } from '../employee-data.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(private dataService: EmployeeDataService,  public dialog: MatDialog) {}

  employee = new Employee("","","","",0)
  message?: string

  onSubmit() {
    this.dataService.createEmployee(this.employee).subscribe((results: any) => {
      if (results) {
        this.openDialog()
        this.message = ""
      }       
    })
  }

  openDialog(): void {
    this.dialog.open(ModalComponent, {
      data: {title: "Created new employee!", textContent: "You will be redirected to home page", nav: "/session/home"}
    })
  }

}
