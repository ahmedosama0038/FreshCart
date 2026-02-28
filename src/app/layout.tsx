import React, { ReactNode } from "react";
import "../Styles/globals.css";
import Footer from "@/Components/Sheard/Navbar/Footer/Footer";
import Navbar from "@/Components/Sheard/Navbar/Navbar";
import "../lib/Fontawesome";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/Components/provider/provider";
import { verifyToken } from "@/Features/Auth/Server/Auth.actions";
import { cartState } from "@/Features/Cart/Store/Cart.slice";
import { GetLoggedUser } from "@/Features/Cart/Server/Server.actios";
import { wishliststat } from "@/Features/Wishlist/store/wishlist.slice";
import { GetLoggedUserWishlist } from "@/Features/Wishlist/server/wishlist.actions";
import { ThemeProvider } from "@/Store/ThemeProvider";
import Image from "next/image";


export const metadata = {
  title: {
    default: 'LuxeMart. | Home', 
    template: '%s | LuxeMart.',
  },
  description: 'Premium shopping experience',
};

let cartstate: cartState = {
  numOfCartItems: 0,
  isLoding: false,
  error: null,
  cartId: null,
  products: [],
  totalCartPrice: 0,
};

let Wishliststat: wishliststat = {
  products: [],
  isLoading: false,
  error: null,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authvalues = await verifyToken();
  
  if (authvalues.isAuthenticated) {
    try {
      const cartResponse = await GetLoggedUser();
      cartstate = {
        numOfCartItems: cartResponse.numOfCartItems,
        isLoding: false,
        error: null,
        totalCartPrice: cartResponse.data.totalCartPrice,
        products: cartResponse.data.products,
        cartId: cartResponse.cartId,
      };
    } catch (error) {}
  }

  if (authvalues.isAuthenticated) {
    try {
      const wishlistResponse = await GetLoggedUserWishlist();
      Wishliststat = {
        products: wishlistResponse.data,
        error: null,
        isLoading: false,
      };
    } catch (error) {}
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers
          preloadedState={{
            auth: authvalues,
            cart: cartstate,
            wishlist: Wishliststat,
          }}
        >
       
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true}>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}