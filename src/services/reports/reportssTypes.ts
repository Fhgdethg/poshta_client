export interface IAddReportReqBody {
  eventDescription: string;
  date: string;
  reportID?: number;
}

export interface IGetProductUsingARobotResBody {
  message: string;
  productID: number;
}
