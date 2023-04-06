import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_EMPLOYEES = gql`query{
  getAllEmployees {
    firstname,lastname, email, _id
  }
}`

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private apollo: Apollo) {}
  employees = []

  ngOnInit() {
    this.apollo.query({
      query: GET_EMPLOYEES
    }).subscribe((result: any) => {
      this.employees = result.data.getAllEmployees      
    })
  }
}
