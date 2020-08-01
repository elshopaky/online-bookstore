import { Component, OnInit } from '@angular/core';
import { Book } from '../../common/book';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  currentCategotyId: number = 1;
  searchMode: boolean = false;
  previousCategory: number = 1;
  //new properties for server side paging
  currentPage: number = 1;
  pageSize: number = 3;
  totalRecords: number = 0;

  constructor(
    private bookService: BookService,
    private _activatedRoute: ActivatedRoute,
    private _config: NgbPaginationConfig,
    private _cartService: CartService,
    private _spinnerService: NgxSpinnerService
  ) {
    _config.maxSize = 3;
    _config.boundaryLinks = true;
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(() => {
      this.listBooks();
    });
  }

   listBooks() {
    //start the spinner
    this._spinnerService.show();
    this.searchMode = this._activatedRoute.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchBooks();
    } else {
      this.handleListBooks();
    }
  }

  handleListBooks() {
    //check if there is found category id
    const hasCategoryId: boolean = this._activatedRoute.snapshot.paramMap.has(
      'id'
    );
    if (hasCategoryId) {
      //get the category id parameter
      this.currentCategotyId = +this._activatedRoute.snapshot.paramMap.get(
        'id'
      );
    } else {
      //if ctaegory id not found make it 1 by default
      this.currentCategotyId = 1;
    }
    //setting the current page to 1
    //if user navigate to other category
    if (this.previousCategory != this.currentCategotyId) {
      this.currentPage = 1;
    }
    this.previousCategory = this.currentCategotyId;
    this.bookService
      .getBooks(this.currentCategotyId, this.currentPage - 1, this.pageSize)
      .subscribe(this.processPagination());
  }

  handleSearchBooks() {
    const keyword: string = this._activatedRoute.snapshot.paramMap.get(
      'keyword'
    );
    this.bookService
      .searchBooks(keyword, this.currentPage - 1, this.pageSize)
      .subscribe(this.processPagination());
  }

  processPagination() {
    return (data) => {
     //stops the loader
      this._spinnerService.hide();
      
      this.books = data._embedded.books;
      //page number start with 1 in front end application
      this.currentPage = data.page.number + 1;
      this.totalRecords = data.page.totalElements;
      this.pageSize = data.page.size;
    };
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.listBooks();
  }

  addToCart(book: Book) {
    //console.log(`book name : ${book.name} book price : ${book.unitPrice}`);
    const cartItem = new CartItem(book);
    this._cartService.addToCart(cartItem);
  }
}
