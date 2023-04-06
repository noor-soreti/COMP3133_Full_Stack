import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const CREATE_EMPLOYEE = gql`mutation($input: EmployeeInput!){
  createEmployee(input: $input) {
    firstname
  }
}`

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  constructor(private apollo: Apollo) {}

  firstname = ""
  lastname = ""
  email = ""
  gender = ""
  salary = 0.0


  onSubmit() {
    this.apollo.mutate({
      mutation: CREATE_EMPLOYEE,
      variables: {
        input: {
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          gender: this.gender.toLowerCase,
          salary: this.salary
        }
      }
    }).subscribe((results: any) => {
      console.log(results.data);
      
    })
  }
}
