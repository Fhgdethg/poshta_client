import { ICoordinates, IDimensions } from '@/types/sizeAndCoordinates';

export interface IShelve {
  shelveDimensions: IDimensions;
  coordinates: ICoordinates;
  percentBusyVolume: number;
  _id?: string;
  shelveID: number;
  products: any[];
  __v?: number;
}
