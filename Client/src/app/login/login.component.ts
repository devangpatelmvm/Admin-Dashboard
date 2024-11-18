import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public errorMsg: string = '';
  public userName: string = '';
  userData: any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {}
  onLogin(loginForm: NgForm) {
    this.authService.loginUser(loginForm.value).subscribe(
      (data) => {
        this.userData = data;
        localStorage.setItem('token', this.userData.token);
        this.router.navigate(['./dash-board']);
      },
      (err) => {
        this.openSnackBar('Password MisMatch!!!', 'Cancel'),
          {
            duration: 4000,
          };
      }
    );
  }

  // Notification Code
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass: ['custom-style'],
    });
  }
}
