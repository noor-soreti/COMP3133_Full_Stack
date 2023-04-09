import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

import { Router, ActivatedRoute } from '@angular/router';

const POST_LOGIN = gql`query($username: String!, $password: String!){
  login(username: $username, password: $password) {
    username,
    password,
    _id
  }
}`

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  constructor(private apollo: Apollo, private route: ActivatedRoute, private router: Router) {}
  username = ""
  password = ""
  id = ""
  message = ""

  onSubmit ()  {
    this.route.queryParamMap.forEach(e => console.log(e)
    )
    
    this.apollo.watchQuery({
      query: POST_LOGIN,
      variables: {
        username: this.username,
        password: this.password
      }
    }).valueChanges.subscribe((result: any) => {      
      if (result.data.login != null) {
        this.id = result.data.login._id
        this.message = ""
        this.router.navigate(['/session/home'])
        
      } else {
        console.log("User not registered");
        this.message = "Username or password incorrect"
      }
    })       
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.username = params['username'];
    });    
  }
}
