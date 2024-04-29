import { clAPI } from '@/queries/clQueries/clQueries';
import { clQKeys } from '@/queries/clQueries/clQKeys';

import { ILoginReqBody, ILoginResBody } from '@/services/auth/authTypes';
import { IUser } from '@/types/user';

export const login = (userData: ILoginReqBody) =>
  clAPI.post<ILoginResBody>(`${clQKeys.auth}${clQKeys.login}`, userData);

export const auth = () => clAPI.get<IUser>(`${clQKeys.auth}${clQKeys.auth}`);
