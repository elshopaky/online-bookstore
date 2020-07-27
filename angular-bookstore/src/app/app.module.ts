import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import {BookService} from './services/book.service';
import { BookCtegoryComponent } from './components/book-ctegory/book-ctegory.component';
import {RouterModule,Routes} from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes:Routes=[
{path:'books',component:BookListComponent},
{path:'category/:id',component:BookListComponent},
{path:'',redirectTo:'/books',pathMatch:'full'},
{path:'**',component:PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookCtegoryComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
