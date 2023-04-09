import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { EmployeeDataService } from '../employee-data.service';
import { subscribe } from 'graphql';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private dataServie: EmployeeDataService) {}
  employees  = []

  ngOnInit() {
    this.dataServie.getAllEmployees().subscribe((result: any) => {
      this.employees = result.data.getAllEmployees
    })
  }
}
