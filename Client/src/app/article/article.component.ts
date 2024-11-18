import { ArticleService } from './../../service/article.service';
import { OnInit } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Article } from 'src/model/article';
import { ArticleDeleteDialogboxComponent } from '../article-delete-dialogbox/article-delete-dialogbox.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements AfterViewInit, OnInit {
  id: any;
  deletedData: any;
  data: Article[] = [];
  displayedColumns: string[] = [
    'articleName',
    'authorName',
    'publishDate',
    'updatedDate',
    'action',
  ];
  dataSource = new MatTableDataSource<Article>();

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private httpClient: HttpClient,
    private articleService: ArticleService
  ) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.articleTableData();
    this.articleService.getNewArticles.subscribe((data) => {
      if (data) {
        this.articleTableData();
      }
    });
  }
  
  articleTableData() {
    this.articleService.articleList( this.data ).subscribe((res: any) => {
       this.dataSource.data = res.data[0];
    })

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['custom-style'],
    });
  }

  openDialog(element: any) {
    const dialogRef = this.dialog.open(ArticleDeleteDialogboxComponent, {
      data: element,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.articleTableData();
    });
  }
}
