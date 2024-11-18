import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArticleService } from 'src/service/article.service';
import { Article } from 'src/model/article';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AuthService } from 'src/service/auth.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditArticleComponent implements OnInit {
  id: string;
  htmlContent;
  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private articleService: ArticleService,
    private authService: AuthService
  ) {}

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

  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    var request: any = {
      id: this.id,
    };
    this.articleService.viewArticleService(this.id, request).subscribe((res: any) => {
        this.htmlContent = res.data[0].data;
      });

    
  }

  updateArticle() {

    this.authService.getUserInfo().subscribe((res: any) => {
      let authorName = res.data[0].firstName + ' ' + res.data[0].lastName;
      var tempData: Article = {
        data: this.htmlContent,
        createdBy: res.data[0].userName,
        updatedDate: new Date(),
      };

      this.articleService.updateArticleService(this.id, tempData).subscribe((res: any) => {
          this.openSnackBar('Article Updated', ''),
            {
              duration: 5000,
            };
        });
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      panelClass: ['custom-style'],
    });
  }
}
