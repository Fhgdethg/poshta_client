import { clAPI } from '@/queries/clQueries/clQueries';
import { clQKeys } from '@/queries/clQueries/clQKeys';
import { IShelve } from '@/types/shelve';

export const getAllShelves = () => clAPI<IShelve[]>(clQKeys.shelves);

export const getShelveByID = (shelveID: number) =>
  clAPI<IShelve>(`${clQKeys.shelves}/${shelveID}`);
