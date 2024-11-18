import { MapViewComponent } from './map-view/map-view.component';
import { EditArticleComponent } from './article-updated/edit-article.component';
import { CreateArticleComponent } from './article-create/create-article.component';
import { ViewDataDialogComponent } from './user-management-view-data-dialog/view-data-dialog.component';
import { AlertDialogComponent } from './user-management-delete-dialogbox/alert-dialog.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementComponent } from './user-management/user-management.component';
import { DialogContentExampleDialogComponent } from './user-management-update-dialog/dialog-content-example-dialog.component';
import { ArticleComponent } from './article/article.component';
import { ViewArticleComponent } from './article-view-data/view-article.component';
import { ArticleDeleteDialogboxComponent } from './article-delete-dialogbox/article-delete-dialogbox.component';
import { MapComponent } from './map/map.component';
import { MapListComponent } from './map-list/map-list.component';

const routes: Routes = [
  {
    path: '', // Default
    redirectTo: 'LoginComponent',
    pathMatch: 'full',
  },
  { path: '', 
    component: LoginComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'dash-board',
    component: DashBoardComponent,
  },
  {
    path: 'nav-bar',
    component: NavBarComponent,
  },
  {
    path: 'user-management',
    component: UserManagementComponent,
  },
  {
    path: 'dialog-content-example-dialog',
    component: DialogContentExampleDialogComponent,
  },
  {
    path: 'alert-dialog',
    component: AlertDialogComponent,
  },
  {
    path: 'view-data-dialog',
    component: ViewDataDialogComponent,
  },
  {
    path: 'article',
    component: ArticleComponent,
  },
  {
    path: 'create-article',
    component: CreateArticleComponent,
  },
  {
    path: 'view-article/:id',
    component: ViewArticleComponent,
  },
  {
    path: 'edit-article/:id',
    component: EditArticleComponent,
  },
  {
    path: 'article-delete-dialogbox',
    component: ArticleDeleteDialogboxComponent,
  },
  {
    path: 'map',
    component: MapComponent,
  },
  {
    path: 'map-list',
    component: MapListComponent,
  },
   {
    path: 'map-view/:id',
    component: MapViewComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
