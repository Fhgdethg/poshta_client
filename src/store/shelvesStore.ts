import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import {
  getAllShelves,
  getShelveByID,
} from '@/services/shelves/shelvesService';

import { TError } from '@/types/error';
import { IShelve } from '@/types/shelve';

export interface IShelvesState {
  isLoading: boolean;
  error: string;
  shelves: IShelve[];
  getAllShelvesAction: () => Promise<void>;
  getShelveByIDAction: (shelveID: number) => Promise<void>;
}

export const useShelvesStore = create<IShelvesState>()(
  immer((set, get) => ({
    isLoading: false,
    error: '',
    shelves: [],
    getAllShelvesAction: async () => {
      try {
        set({ isLoading: true, error: '' });

        const { data } = await getAllShelves();

        set({ shelves: data });
      } catch (err: TError) {
        const error = err?.message ? err.message : 'Login error';

        set({ error });
      } finally {
        set({ isLoading: false });
      }
    },
    getShelveByIDAction: async (shelveID) => {
      try {
        set({ isLoading: true, error: '' });

        const { data } = await getShelveByID(shelveID);

        set({ shelves: [data] });
      } catch (err: TError) {
        if (err.response.data.isShelveNotExist) set({ shelves: [] });
        else {
          const error = err?.message ? err.message : 'Login error';

          set({ error });
        }
      } finally {
        set({ isLoading: false });
      }
    },
  })),
);

// const useItems = (state) => state.items;
// const items = useItems();
