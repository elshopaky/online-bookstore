import { Component, OnInit } from '@angular/core';
import { Book } from '../../common/book';
import { BookService } from '../../services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  books:Book[];
  currentCategotyId:number;


   constructor(private bookService:BookService,
    private _activatedRoute:ActivatedRoute ){}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(()=>{
      this.listBooks();
    })  
  }

  listBooks(){
    //check if there is found category id
   const hasCategoryId:boolean =this._activatedRoute.snapshot.paramMap.has('id');
    if(hasCategoryId){
      //get the category id parameter
      this.currentCategotyId=+this._activatedRoute.snapshot.paramMap.get('id');
    }else{
      //if ctaegory id not found make it 1 by default 
      this.currentCategotyId=1;
    }
   
   this.bookService.getBooks(this.currentCategotyId).subscribe(data=>this.books=data);
  }

}
