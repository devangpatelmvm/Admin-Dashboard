import { MapService } from './../../service/map.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-map-delete-dialogbox',
  templateUrl: './map-delete-dialogbox.component.html',
  styleUrls: ['./map-delete-dialogbox.component.css']
})
export class MapDeleteDialogboxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public openDialog: any,
              private dialogRef: MatDialogRef<MapDeleteDialogboxComponent>,
              private _snackBar: MatSnackBar,
              private mapService: MapService) { }

  message: string = 'Are you sure to delete this item?';
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';
  ngOnInit(): void {

  }

  onConfirmClick(openDialog) {
    this.dialogRef.close(true);
    this.deletedMap();

    this.openSnackBar('Selected Address Deleted!!!', ''),
      {
        duration: 5000,
      };
  }
  deletedMap() {
    var request: any = {
      id: this.openDialog,
    };
    this.mapService
      .deleteMap(this.openDialog, request)
      .subscribe((res: any) => {
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
