import { IDimensions } from '@/types/sizeAndCoordinates';

export interface IProduct {
  _id: string;
  productID: number;
  productDimensions: IDimensions;
  shelveID: number;
  productTitle?: string;
  productDescription?: string;
  productImgUrl?: string;
  __v: number;
}
