import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserServiceService } from 'src/service/user-service.service';
import { AuthService } from 'src/service/auth.service';
import { NgChartsModule } from 'ng2-charts';
import { NotifierModule } from 'angular-notifier';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { UserManagementComponent } from './user-management/user-management.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogContentExampleDialogComponent } from './user-management-update-dialog/dialog-content-example-dialog.component';
import { AlertDialogComponent } from './user-management-delete-dialogbox/alert-dialog.component';
import { ViewDataDialogComponent } from './user-management-view-data-dialog/view-data-dialog.component';
import { ArticleComponent } from './article/article.component';
import { NgxEditorModule } from 'ngx-editor';
import { CreateArticleComponent } from './article-create/create-article.component';
import { ViewArticleComponent } from './article-view-data/view-article.component';
import { EditArticleComponent } from './article-updated/edit-article.component';
import { DateFormatPipe } from 'src/pipes/date-pipe.pipe';
import { ArticleDeleteDialogboxComponent } from './article-delete-dialogbox/article-delete-dialogbox.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { ArticleDataPipe } from '../pipes/article-data.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DateAgoPipe } from 'src/pipes/date-ago.pipe';
import { GoogleMapsModule } from "@angular/google-maps";
import { MapComponent } from './map/map.component';
import { MapListComponent } from './map-list/map-list.component';
import { MapViewComponent } from './map-view/map-view.component';
import { MapDeleteDialogboxComponent } from './map-delete-dialogbox/map-delete-dialogbox.component';
import { MapUpdatedComponent } from './map-updated/map-updated.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashBoardComponent,
    NavBarComponent,
    UserManagementComponent,
    DialogContentExampleDialogComponent,
    AlertDialogComponent,
    ViewDataDialogComponent,
    ArticleComponent,
    CreateArticleComponent,
    ViewArticleComponent,
    EditArticleComponent,
    DateFormatPipe,
    ArticleDeleteDialogboxComponent,
    ArticleDataPipe,
    DateAgoPipe,
    MapComponent,
    MapListComponent,
    MapViewComponent,
    MapDeleteDialogboxComponent,
    MapUpdatedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    NgChartsModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
    NotifierModule,
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    MatGridListModule,
    MatButtonToggleModule,
    NgxEditorModule,
    HttpClientModule,
    AngularEditorModule,
    FontAwesomeModule,
    MatTooltipModule,
    GoogleMapsModule,
    
  ],

  providers: [UserServiceService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
