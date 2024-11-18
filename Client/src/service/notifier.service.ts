import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotifierService {
  private _snackBar: any;

  constructor(private snackBar: MatSnackBar) {}
}
