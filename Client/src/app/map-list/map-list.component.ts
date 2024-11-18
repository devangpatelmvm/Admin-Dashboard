import { MapDeleteDialogboxComponent } from './../map-delete-dialogbox/map-delete-dialogbox.component';
import { MapService } from './../../service/map.service';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import { Map } from 'src/model/map'
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-map-list',
  templateUrl: './map-list.component.html',
  styleUrls: ['./map-list.component.css']
})
export class MapListComponent implements OnInit, AfterViewInit {

  data: Map[] = [];
  displayedColumns: string[] = ['about', 'address1', 'address2', 'action'];;
  dataSource = new MatTableDataSource<Map>()
   
  constructor(private _liveAnnouncer: LiveAnnouncer,
              private mapService: MapService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              ) {}

 

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngOnInit(): void {
    this.mapTableData();
  }

  
  mapTableData() {
    this.mapService.mapList( this.data ).subscribe((res: any) => {
       this.dataSource.data = res.data[0];
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  openDialog(element: any) {
    const dialogRef = this.dialog.open(MapDeleteDialogboxComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.mapTableData();
    });
  }


}