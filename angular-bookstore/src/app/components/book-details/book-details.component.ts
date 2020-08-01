import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../../common/book';
import { HttpClient } from '@angular/common/http';
import { BookService } from 'src/app/services/book.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})

export class BookDetailsComponent implements OnInit {
 
  book:Book=new Book();

  constructor(private bookService:BookService,
               private activatedRoute:ActivatedRoute
               ,private _cartService:CartService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(
     ()=>{
       this.getBookInfo();
     }
    );
  }

  getBookInfo(){
  const bookId:number =+this.activatedRoute.snapshot.paramMap.get("id");
  this.bookService.get(bookId).subscribe(
     data=>{  
     this.book=data;
      }
  );
}

addToCart(){
  const cartItem=new CartItem(this.book);
  this._cartService.addToCart(cartItem);

}

}
