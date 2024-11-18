import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-data-dialog',
  templateUrl: './view-data-dialog.component.html',
  styleUrls: ['./view-data-dialog.component.css'],
})
export class ViewDataDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public viewDataDialog: any,
    public dialogRef: MatDialogRef<ViewDataDialogComponent>,
    public router: ActivatedRoute
  ) {}

  ngOnInit(): void {
  }
}
