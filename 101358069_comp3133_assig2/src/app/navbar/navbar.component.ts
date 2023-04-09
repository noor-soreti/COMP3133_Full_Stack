import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(public dialog: MatDialog) {}

  onClick() {
    this.dialog.open(ModalComponent, {
      data: {title: "Logout", textContent: "Confirm logout", nav: '/', btnString: 'Logout'}
    })
  }
}
