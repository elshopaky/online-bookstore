import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../common/book';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class BookService {

 //get all books
 private baseUrl="http://localhost:8080/api/v1/books";

  constructor(private  http:HttpClient) { }
  //This method teturn observable of Book type
  getBooks(theCategoryId:number):Observable<Book[]>{
    //get books by category id
    const searchUrl=`${this.baseUrl}/search/categoryid/?id=${theCategoryId}`;
   return  this.http.get<GetResponseBooks>(searchUrl)
   .pipe(  
    map(response=>response._embedded.books) 
   );
  }
}

interface GetResponseBooks{
  _embedded : {
    books:Book[];
  }
}