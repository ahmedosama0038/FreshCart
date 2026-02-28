
import { authreducer, AuthStata } from "@/Features/Auth/Store/Auth.Slice";
import { cartreducers, cartState } from "@/Features/Cart/Store/Cart.slice";
import { wishlistReducer, wishliststat } from "@/Features/Wishlist/store/wishlist.slice";
import { configureStore} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export type preloadedState={
    auth: AuthStata,
    cart : cartState
    wishlist:wishliststat
   
}

export function CreateStore(preloadedState:preloadedState){
    
 const Store = configureStore({
  reducer: {
   auth: authreducer,
    cart :cartreducers,
    wishlist: wishlistReducer
  },

  preloadedState,
});
 return Store
}

 export  type AppStore =  ReturnType<typeof CreateStore>   
export  type AppState =ReturnType<AppStore['getState'] > 
type dispatch = AppStore['dispatch']

// export const useAppSelector= useSelector.withTypes<AppState>()



export const useAppDaspatch= useDispatch.withTypes<dispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;