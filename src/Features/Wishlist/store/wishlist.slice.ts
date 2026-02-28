import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsResponse } from "../types/wishlist.type";




export  type wishliststat={
      products:Product[],
    isLoading:boolean,
    error: null|string
}


const initialState: wishliststat={
    products:[],
    isLoading:false,
    error: null

}

const wishlistClice=   createSlice({
    name :'wishlist',
    initialState,
    reducers:{
wishlistInfo:function (state,action :PayloadAction<ProductsResponse>) {
   state.products = action.payload.data
},

clearWashlist:function(state, action : PayloadAction<{id:string}>){
 const productId=action.payload.id
const removeid= state.products.find((item)=> item._id===productId)
if (removeid) {
    state.products=state.products.filter((pro)=>pro._id!==productId)
}
    
}

    }

})


export const wishlistReducer= wishlistClice.reducer
export const {wishlistInfo, clearWashlist} = wishlistClice.actions