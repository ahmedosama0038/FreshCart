import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProduct, CartResponse } from "../Types/Type.cart";



export  interface cartState{
  numOfCartItems: number,
cartId:string|null,
products:CartProduct[],
totalCartPrice:number,
isLoding:boolean,
error: string|null

}


const initialState:cartState ={
numOfCartItems:0,
cartId:null,
products:[],
totalCartPrice:0,
isLoding:false,
error: null
}
    


const cartSlice=  createSlice({
    name :'Cart',
    initialState,
reducers:{
  setCartInfo:function(state, action :PayloadAction<CartResponse>){
    state.cartId= action.payload.cartId;
    state.products=action.payload.data.products;
    state.numOfCartItems=action.payload.numOfCartItems;
    state.totalCartPrice=action.payload.data.totalCartPrice

  },
  removedProduct:function(state, action:PayloadAction<{id:string}>){
   const  productId= action.payload.id
   const removedItem= state.products.find((item)=>item.product._id==productId)
   if (removedItem) {
    state.products=state.products.filter((product)=> product.product.id!==productId)
    state.numOfCartItems= state.products.length
    state.totalCartPrice-= removedItem.price*removedItem.count
   }
  },
  clearCart:function(state){
    state.numOfCartItems=0
    state.products=[]
    state.totalCartPrice=0
    state.cartId=null
  }
}

})

export const cartreducers= cartSlice.reducer
export  const {setCartInfo,removedProduct , clearCart} =cartSlice.actions