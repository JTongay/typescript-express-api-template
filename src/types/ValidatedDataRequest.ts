import { Request } from 'express';

export interface ValidatedDataRequest extends Request {
  data: {
    [key: string]: any;
  };
}
