import { FormControl } from "@angular/forms";
import { Employee } from "../classes/employee.class";

export interface EmployeeInterface {
    employee: Employee[]
}

export interface EmployeeForm {
    firstname: FormControl<string | null>
    lastname: FormControl<string | null>
    email: FormControl<string | null>
    gender: FormControl<string | null>
    salary: FormControl<number | null>
}