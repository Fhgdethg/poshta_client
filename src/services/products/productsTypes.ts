export interface IAddProductReqBody {
  productID: number;
  width: number;
  height: number;
  length: number;
  shelveID: number;
}

export interface IGetProductUsingARobotResBody {
  message: string;
  productID: number;
}
