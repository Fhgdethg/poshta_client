interface INormalError {
  [key: string]: any;
  message?: string;
}

export type TError = INormalError | any;
