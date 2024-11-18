import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDeleteDialogboxComponent } from './article-delete-dialogbox.component';

describe('ArticleDeleteDialogboxComponent', () => {
  let component: ArticleDeleteDialogboxComponent;
  let fixture: ComponentFixture<ArticleDeleteDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleDeleteDialogboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleDeleteDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
