import { AuthService } from './../../service/auth.service';
import { ArticleService } from './../../service/article.service';
import { Article } from './../../model/article';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { toHTML } from 'ngx-editor';
import jsonDoc from './doc';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateArticleComponent implements OnInit {
  editordoc = jsonDoc;
  data: Article[] = [];
  public errorMsg: string = '';
  data1!: Observable<Article[]>;
  private terms = new Subject<string>();
  data2(term: string): void {
    this.terms.next(term);
  }

  htmlContent = toHTML(jsonDoc);

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [['bold']],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
  };

  constructor(
    private _snackBar: MatSnackBar,
    private articleService: ArticleService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
  saveArticle() {
    this.authService.getUserInfo().subscribe((res: any) => {
      var tempdata: Article = {
        data: this.htmlContent,
        createdBy: res.data[0].userName,
        createdAt: new Date(),
        updatedDate: new Date(),
      };

      this.articleService.createArticle(tempdata).subscribe(
        (res) => {
          this.data.push(tempdata);
          this.openSnackBar('Article Published', ''),
            {
              duration: 4000,
            };
        },
        (error: HttpErrorResponse) => {
          this.errorMsg = error.error.errorMsg;
          this.openSnackBar(' Article already exists ', ''),
          {
            duration: 3000,
          };
        }
      );
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
