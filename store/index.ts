import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "@/features/ecommerce/api/productsApi";
import cartReducer from "@/features/ecommerce/slices/cartSlice";
import toastReducer from "@/features/ecommerce/slices/toastSlice";
import wishlistReducer from "@/features/ecommerce/slices/wishlistSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      [productsApi.reducerPath]: productsApi.reducer,
      cart: cartReducer,
      toast: toastReducer,
      wishlist: wishlistReducer,
    },
    middleware: (getDefault) =>
      getDefault().concat(productsApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
