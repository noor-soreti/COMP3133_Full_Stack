import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

const SIGNUP_MUTATE = gql`
mutation($username: String!, $email: String!, $password: String!){
  signup(username: $username, email: $email, password: $password) {
    username
  }
}`

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private apollo: Apollo) {}

  username = ""
  password = ""
  email = ""
  message = ""

  onSubmit() {
    this.apollo.mutate({
      mutation: SIGNUP_MUTATE,
      variables: {
        username: this.username,
        email: this.email,
        password: this.password
      }
    }).subscribe((result: any) => {
      if (result) {
        console.log("yes");
      } 
    })
    this.message = "Username or email already in use"

  }

  
}
