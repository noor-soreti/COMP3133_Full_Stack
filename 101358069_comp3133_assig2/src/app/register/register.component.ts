import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Apollo, gql } from 'apollo-angular';
import { ModalComponent } from '../modal/modal.component';

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

  constructor(private apollo: Apollo, public dialog: MatDialog) {}

  username = ""
  password = ""
  email = ""
  message = ""
  title?: string;


  onSubmit() {
    this.message = "Username or email already in use"
    this.apollo.mutate({
      mutation: SIGNUP_MUTATE,
      variables: {
        username: this.username,
        email: this.email,
        password: this.password
      }
    }).subscribe((result: any) => {
      if (result) {
        this.message = ""
        this.openDialog()
      } 
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {title: "Success!", textContent: "You will be redirected to login page", nav: '/', btnString: "Continue"}
    })
  }
}