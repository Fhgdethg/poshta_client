import { clAPI } from '@/queries/clQueries/clQueries';
import { clQKeys } from '@/queries/clQueries/clQKeys';

import { IShelve } from '@/types/shelve';
import { IAddShelveReqBody } from '@/services/shelves/shelvesTypes';

export const getAllShelves = () => clAPI<IShelve[]>(clQKeys.shelves);

export const getShelveByID = (shelveID: number) =>
  clAPI<IShelve>(`${clQKeys.shelves}/${shelveID}`);

export const addShelve = (addShelveBody: IAddShelveReqBody) =>
  clAPI.post<IShelve>(clQKeys.shelves, addShelveBody);
