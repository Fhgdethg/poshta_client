import { clAPI } from '@/queries/clQueries/clQueries';
import { clQKeys } from '@/queries/clQueries/clQKeys';
import { ILoginReqBody, ILoginResBody } from '@/services/auth/authTypes';

export const login = (userData: ILoginReqBody) =>
  clAPI.post<ILoginResBody>(`${clQKeys.auth}${clQKeys.login}`, userData);

export const auth = () => clAPI.get(`${clQKeys.auth}${clQKeys.auth}`);
