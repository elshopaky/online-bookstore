import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../common/book';
import { map } from 'rxjs/operators';
import {BookCategory } from '../common/book-category';

@Injectable({
  providedIn: 'root'
})
export class BookService {

 //get all books
 private baseUrl="http://localhost:8080/api/v1/books";

 private categoryUrl="http://localhost:8080/api/v1/book-category";

  constructor(private  httpClient:HttpClient) { }

  //This method teturn observable of Book type
  //get books based on category id 
  getBooks(theCategoryId:number,currentPage:number,pageSize:number):Observable<GetResponseBooks>{
    //get books by category id
    const searchUrl=`${this.baseUrl}/search/categoryid/?id=${theCategoryId}&page=${currentPage}&size=${pageSize}`;
   return this.httpClient.get<GetResponseBooks>(searchUrl);
  }

  //search books
  searchBooks(keyword:string,currentPage:number,pageSize:number):Observable<GetResponseBooks>{
    const searchUrl=`${this.baseUrl}/search/searchbyKeyword/?name=${keyword}&page=${currentPage}&size=${pageSize}`;
    return this.httpClient.get<GetResponseBooks>(searchUrl);
  }

 //get book categories
  getBookCategories():Observable<BookCategory[]>{
     return this.httpClient.get<GetResponseCategories>(this.categoryUrl).pipe(
        map(response=>response._embedded.bookCategory)
      )
  }

  private getBooksList(searchUrl: string): Observable<Book[]> {
    return this.httpClient.get<GetResponseBooks>(searchUrl)
      .pipe(
        map(response => response._embedded.books)
      );
  }
//get book details
  get(bookId:number):Observable<Book>{
    const bookDetailsUrl=`${this.baseUrl}/${bookId}`;
    return  this.httpClient.get<Book>(bookDetailsUrl);
  }

}

//This interface has the structure of Book json object 
interface GetResponseBooks{
  _embedded : {
    books:Book[];
  },
  page :{
    //number of records in each page
    size:number,
    //total number of records in database
    totalElements:number,
    //total number of pages,start from 0 index
    totalPages:number,
    //current page
    number:number

  }
}

//This interface has the structure of BookCategory json object 
interface GetResponseCategories{
   _embedded:{
    bookCategory:BookCategory[];
   }
}