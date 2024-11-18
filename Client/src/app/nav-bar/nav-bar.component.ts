import { AuthService } from 'src/service/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  loggedinUser: string;
  userInfo: any;

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.getUserInfo().subscribe((res: any) => {
      this.userInfo = res.data[0];
    });

    this.loggedinUser = localStorage.getItem('token');
    if (this.loggedinUser) {
    } else {
      this.openSnackBar('No user details found...', 'Cancel'),
        {
          duration: 3000,
        };
      this.router.navigate(['./login']);
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  dayDisplay() {
    var today = new Date();
    var curHr = today.getHours();
    if (curHr < 12) {
      return 'Good Morning';
    } else if (curHr < 16) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  onLogout() {
    this.router.navigate(['./login']);
    return localStorage.removeItem('token');
  }
}
