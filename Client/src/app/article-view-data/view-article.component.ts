import { ArticleService } from './../../service/article.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-article',
  templateUrl: './view-article.component.html',
  styleUrls: ['./view-article.component.css'],
})
export class ViewArticleComponent implements OnInit {
  data: any;
  array1: any = [];
  html: any;
  id: string;
  constructor(
    private route: ActivatedRoute,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    var request: any = {
      id: this.id,
    };
    this.articleService
      .viewArticleService(this.id, request)
      .subscribe((res: any) => {
        this.html = res.data[0].data;
      });
  }
}
