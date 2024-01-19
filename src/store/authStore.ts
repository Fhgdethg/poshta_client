import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { auth, login } from '@/services/auth/authService';

import { lSKeys } from '@/constants/lSKeys';

import { ILoginReqBody } from '@/services/auth/authTypes';
import { IUser } from '@/types/user';
import { TError } from '@/types/error';

export interface IAuthState {
  token: string;
  user: IUser | null;
  isLoading: boolean;
  error: string;
  loginAction: (loginData: ILoginReqBody) => Promise<void>;
  authAction: () => Promise<void>;
}

export const useAuthStore = create<IAuthState>()(
  immer((set, get) => ({
    token: '',
    user: null,
    isLoading: false,
    error: '',
    loginAction: async (loginData: ILoginReqBody) => {
      try {
        set({ isLoading: true });

        const {
          data: { user, token },
        } = await login(loginData);

        set({ user, token });

        localStorage.setItem(lSKeys.t, token);
      } catch (err: TError) {
        const error = err?.message ? err.message : 'Login error';

        set({ error });
      } finally {
        set({ isLoading: false });
      }
    },
    authAction: async () => {
      try {
        const { data: user } = await auth();

        set({ user });

        return user;
      } catch (err: TError) {
        const errCode = err.response.status;

        if (errCode === 401) set({ user: null });

        return;
      }
    },
  })),
);

// const useItems = (state) => state.items;
// const items = useItems();
