import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  getAllProducts,
  getProductByID,
} from '@/services/products/productsService';

import { TError } from '@/types/error';
import { IProduct } from '@/types/product';

export interface IShelvesState {
  isLoading: boolean;
  error: string;
  products: IProduct[];
  allProducts: IProduct[];
  getAllProductsAction: () => Promise<void>;
  getProductByIDAction: (productID: number) => Promise<void>;
}

export const useProductsStore = create<IShelvesState>()(
  immer((set, get) => ({
    isLoading: false,
    error: '',
    products: [],
    allProducts: [],
    getAllProductsAction: async () => {
      try {
        set({ isLoading: true, error: '' });

        const { data } = await getAllProducts();

        set({ products: data, allProducts: data });
      } catch (err: TError) {
        const error = err?.message ? err.message : 'Get all products error';

        set({ error });
      } finally {
        set({ isLoading: false });
      }
    },
    getProductByIDAction: async (productID) => {
      try {
        set({ isLoading: true, error: '' });

        const { data } = await getProductByID(productID);

        set({ products: [data] });
      } catch (err: TError) {
        if (err.response.data.isProductNotExist) set({ products: [] });
        else {
          const error = err?.message ? err.message : 'Get product error';

          set({ error });
        }
      } finally {
        set({ isLoading: false });
      }
    },
  })),
);
