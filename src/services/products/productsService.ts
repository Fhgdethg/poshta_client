import { clAPI } from '@/queries/clQueries/clQueries';
import { rAPI } from '@/queries/rQueries/rQueries';

import { clQKeys } from '@/queries/clQueries/clQKeys';
import { rQKeys } from '@/queries/rQueries/rQKeys';

import { IProduct } from '@/types/product';
import {
  IAddProductReqBody,
  IGetProductUsingARobotResBody,
} from '@/services/products/productsTypes';

export const addProduct = (addProductBody: IAddProductReqBody) =>
  clAPI.post<IProduct>(clQKeys.products, addProductBody);

export const getAllProducts = () => clAPI<IProduct[]>(clQKeys.products);

export const getProductByID = (productID: number) =>
  clAPI<IProduct>(`${clQKeys.products}/${productID}`);

export const getProductUsingARobot = (productID: number) =>
  rAPI<IGetProductUsingARobotResBody>(
    `${rQKeys.product}${rQKeys.get}?id=${productID}`,
  );

export const removeProductByID = (productID: number) =>
  clAPI<IProduct>(`${clQKeys.products}/${productID}`);
