export interface IAddProductReqBody {
  productID: number;
  width: number;
  height: number;
  length: number;
  shelveID: number;
  productTitle?: string;
  productDescription?: string;
  productImgUrl?: string;
}

export interface IGetProductUsingARobotResBody {
  message: string;
  productID: number;
}
