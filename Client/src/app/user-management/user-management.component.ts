import { AuthService } from './../../service/auth.service';
import { ViewDataDialogComponent } from '../user-management-view-data-dialog/view-data-dialog.component';
import { AlertDialogComponent } from '../user-management-delete-dialogbox/alert-dialog.component';
import { DialogContentExampleDialogComponent } from '../user-management-update-dialog/dialog-content-example-dialog.component';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserManagement } from 'src/model/user-management';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements AfterViewInit, OnInit {
  highlightedToken: any;
  selectedRowIndex: any;
  loggedinUserfirstName = '';
  loggedinUserlastName = '';
  userInfo;

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'userName','email','phone','action',
  ];
  dataSource = new MatTableDataSource<UserManagement>();

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  tableData() {
    this.authService.getUserInfo().subscribe((data: any) => {
      this.userInfo = data.data[0];
      this.httpClient
        .post<UserManagement>('http://localhost:5000/userList/userList', {
          title: 'Angular',
        })
        .subscribe((res: any) => {
          this.dataSource.data = res.data[0];
        });
    });
  }

  ngOnInit(): void {
    this.tableData();
    this.highlight();
  }

  highlight() {
    this.authService.getUserInfo().subscribe((data: any) => {
      this.highlightedToken = data.data[0].firstName;
      this.selectedRowIndex = this.highlightedToken;
    });
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /** SORTING */
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  /*  FILTER    */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // For Delete Data
  openDialogDelete(element: number, id: any) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: element,
      id: id,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.tableData();
    });
  }
  token;

  //  For Edit/ Update Data
  openDialogEdit(element: number, i: any) {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent, {
      height: '72%',
      width: '40%',
      data: element,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.tableData();
    });
  }

  viewDataDialog(element: number, i: any) {
    this.dialog.open(ViewDataDialogComponent, {
      height: '55%',
      width: '40%',
      data: element,
    });
  }
}
