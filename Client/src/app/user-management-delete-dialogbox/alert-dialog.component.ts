import { ManagementService } from './../../service/management.service';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css'],
})
export class AlertDialogComponent implements OnInit {
  message: string = 'Are you sure to delete this item?';
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';
  deleted: [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public openDialogDelete: any,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<AlertDialogComponent>,
    private managementService: ManagementService
  ) {}

  onConfirmClick(): void {
    this.dialogRef.close(true);
    this.deletedUser();

    this.openSnackBar('User Data Deleted!!!', 'Cancel'),
      {
        duration: 5000,
      };
  }

  ngOnInit(): void {}

  deletedUser() {
    var request: any = {
      id: this.openDialogDelete.id,
    };
    this.managementService.deleteService(this.openDialogDelete.id, request).subscribe((res: any) => {
        res.data;
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['custom-style'],
    });
  }
}
