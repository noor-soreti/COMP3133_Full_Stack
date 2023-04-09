import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Employee } from './classes/employee.class';

const GET_EMPLOYEES = gql`query{
  getAllEmployees {
    firstname,lastname, email, _id
  }
}`

const CREATE_EMPLOYEE = gql`mutation($input: EmployeeInput!){
  createEmployee(input: $input) {
    firstname
  }
}`

const UPDATE_EMPLOYEE = gql`mutation($id: ID!, $input: EmployeeInput!){
  updateEmployeeById(_id: $id, input: $input) {
    firstname
  }
}`

const SEARCH_EMPLOYEE = gql`
query($id: ID!){
  searchEmployee(_id: $id) {
    firstname,
    lastname,
    email,
    gender,
    salary
  }
}`

const DELETE_EMPLOYEE = gql`
mutation($id: ID!){
  deleteEmployeeById(_id: $id) {
    firstname
  }
}`

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor(private apollo: Apollo){}

  message?: string

  getAllEmployees(): any {
     return this.apollo.query({
      query: GET_EMPLOYEES
    })
  }

  createEmployee(employee: Employee): any {
    return this.apollo.mutate({
      mutation: CREATE_EMPLOYEE,
      variables: {
        input: {
          firstname: employee.firstname,
          lastname: employee.lastname,
          email: employee.email,
          gender: employee.gender.toLowerCase,
          salary: employee.salary
        }
      }
    })
  }

  getEmployee(id: string): any {
    return this.apollo.query({
      query: SEARCH_EMPLOYEE,
      variables: {
        id: id}
    })
  }

  updateEmployee(id: string, employee: Employee): any {
    return this.apollo.mutate({      
      mutation: UPDATE_EMPLOYEE,
      variables: {
        id: employee.id,
        input: {
          firstname: employee.firstname,
          lastname: employee.lastname,
          email: employee.email,
          gender: employee.gender.toLocaleLowerCase(),
          salary: employee.salary,
        }
      }
    }) 
  }

  deleteEmployee(id: string): any {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: {
        id: id
      }
    })
  }
}
