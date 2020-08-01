import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if(cartItem.quantity===0){
      this.remove(cartItem);
    }else{
      this.calculateTotalPrice();
    }
   

  }

  remove(cartItem:CartItem){
    const itemIndex= this.cartItems.findIndex((tempCartItem)=> tempCartItem.id==cartItem.id)
    if(itemIndex>-1){
      this.cartItems.splice(itemIndex,1);
      this.calculateTotalPrice();
    }

  }

  cartItems:CartItem[]=[];
  totalPrice:Subject<number>=new Subject<number>();
  totalQuantity:Subject<number>=new Subject<number>();

  constructor() { }

  addToCart(theCartItem:CartItem){
    //check whether book /item ia already in the cart
     let alreadyExistsInCart:boolean=false;
     let existingcartItem:CartItem=undefined;

     if(this.cartItems.length>0){
       //find the book based on id
       existingcartItem= this.cartItems.find(tempCartItem=>tempCartItem.id===theCartItem.id);
       alreadyExistsInCart= (existingcartItem!=undefined);
     }
    
     if(alreadyExistsInCart){
       //increment the quantity
       existingcartItem.quantity++;
     }else{
        //add the cart to item array
        this.cartItems.push(theCartItem);
     }
      this.calculateTotalPrice();
  }
  calculateTotalPrice() {
      let totalPriceValue:number=0;
      let totalQuantityValue:number=0;
       //Calculate the total price and total quantity
      for(let currentCartItem of this.cartItems){
        totalPriceValue+=currentCartItem.quantity*currentCartItem.unitPrice;
        totalQuantityValue+=currentCartItem.quantity;
      }
      //console.log(`total price : ${totalPriceValue} total quantity : ${totalQuantityValue}`);
      
      //PUBLISH THE EVENTS
      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalQuantityValue);
  }


}
