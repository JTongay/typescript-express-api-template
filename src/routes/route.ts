import { Router } from 'express';
import { baseErrorHandler } from '@/middleware';

export abstract class BaseRoute {

  router: Router = Router({ mergeParams: true });

}
