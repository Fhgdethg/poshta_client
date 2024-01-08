import { IUser } from '@/types/user';

export interface ILoginReqBody {
  email: string;
  password: string;
}

export interface ILoginResBody {
  token: string;
  user: IUser;
}
