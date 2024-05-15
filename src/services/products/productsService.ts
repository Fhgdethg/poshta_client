import axios, { CancelToken } from 'axios';

import { clAPI } from '@/queries/clQueries/clQueries';

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

export const addProductUsingARobot = (
  robotIP: string,
  shelveID: number,
  productID: number,
  axiosParams: { [keys: string]: any } = {},
) =>
  axios.get<IGetProductUsingARobotResBody>(
    `${process.env.R_SERVER_URL}${robotIP}${rQKeys.product}${rQKeys.add}?shelveID=${shelveID}&productID=${productID}`,
    axiosParams,
  );

export const getProductUsingARobot = (
  productID: number,
  robotIP: string,
  axiosParams: { [keys: string]: any } = {},
) =>
  axios.get<IGetProductUsingARobotResBody>(
    `${process.env.R_SERVER_URL}${robotIP}${rQKeys.product}${rQKeys.get}?id=${productID}`,
    axiosParams,
  );

export const removeProductByID = (productID: number) =>
  clAPI.delete<IProduct>(`${clQKeys.products}/${productID}`);
