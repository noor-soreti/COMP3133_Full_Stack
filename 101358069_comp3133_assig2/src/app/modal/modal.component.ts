import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { ModalData } from '../interfaces/modal.interface';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor(private route: ActivatedRoute, private router: Router, public dialogRef: MatDialogRef<ModalComponent>, @Inject(MAT_DIALOG_DATA) public data: ModalData) {}

  onClick(): void {
    this.dialogRef.close()
    this.router.navigate([`${this.data.nav}`])
  }
}
