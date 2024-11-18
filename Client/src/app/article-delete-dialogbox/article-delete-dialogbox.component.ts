import { ArticleService } from './../../service/article.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-article-delete-dialogbox',
  templateUrl: './article-delete-dialogbox.component.html',
  styleUrls: ['./article-delete-dialogbox.component.css'],
})
export class ArticleDeleteDialogboxComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public openDialog: any,
    private dialogRef: MatDialogRef<ArticleDeleteDialogboxComponent>,
    private _snackBar: MatSnackBar,
    private articleService: ArticleService
  ) {}
  message: string = 'Are you sure to delete this item?';
  confirmButtonText = 'Yes';
  cancelButtonText = 'Cancel';
  ngOnInit(): void {}

  onConfirmClick(openDialog) {
    this.dialogRef.close(true);
    this.deletedArticle();

    this.openSnackBar('Article Deleted!!!', ''),
      {
        duration: 5000,
      };
  }

  deletedArticle() {
    var request: any = {
      id: this.openDialog,
    };
    this.articleService.deleteArticleService(this.openDialog, request)
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
