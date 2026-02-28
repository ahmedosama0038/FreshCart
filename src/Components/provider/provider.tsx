"use client";

import { AppStore, CreateStore } from "@/Store/Store";
import type { preloadedState } from "@/Store/Store";

import { Provider } from "react-redux";
import { ReactNode, useRef } from "react";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type PropsProvider = {
  children: ReactNode;
  preloadedState: preloadedState;
};

export default function Providers({ children, preloadedState }: PropsProvider) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = CreateStore(preloadedState);
  }

  return (
    <Provider store={storeRef.current!}>
      {children}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={false}
        pauseOnHover
        draggable
        theme="light"
        transition={Bounce}
      />
    </Provider>
  );
}
