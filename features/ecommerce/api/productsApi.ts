import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DummyjsonProduct, DummyjsonProductsResponse } from "../types/dummyjson.types";

interface ProductsQueryParams {
  limit?: number;
  skip?: number;
  select?: string[];
}

interface CategoriesResponse {
  slug: string;
  name: string;
  url: string;
}

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query<DummyjsonProductsResponse, ProductsQueryParams>({
      query: ({ limit = 12, skip = 0, select = [] }) => {
        const params = new URLSearchParams();
        params.set("limit", String(limit));
        params.set("skip", String(skip));
        if (select.length > 0) {
          params.set("select", select.join(","));
        }
        return `/products?${params.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),

    getProductById: builder.query<DummyjsonProduct, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),

    searchProducts: builder.query<DummyjsonProductsResponse, string>({
      query: (q) => `/products/search?q=${encodeURIComponent(q)}`,
      providesTags: (result) =>
        result
          ? result.products.map(({ id }) => ({ type: "Product" as const, id }))
          : [],
    }),

    getCategories: builder.query<CategoriesResponse[], void>({
      query: () => "/products/categories",
    }),

    getProductsByCategory: builder.query<DummyjsonProductsResponse, string>({
      query: (category) => `/products/category/${encodeURIComponent(category)}?limit=12&skip=0`,
      providesTags: (result) =>
        result
          ? result.products.map(({ id }) => ({ type: "Product" as const, id }))
          : [],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useSearchProductsQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
} = productsApi;
