interface INormalQBody {
  [keys: string]: any;
}

export type TQBody = INormalQBody | undefined;

export type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
