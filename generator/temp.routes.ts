import { BaseRoute } from '@/routes/route';
import { logger } from '@/services';
import { NextFunction, Request, Response, Router } from 'express';


export class <%= name %>Routes extends BaseRoute {
  private static instance: <%= name %>Routes;

  constructor() {
    super();
    // Initialize the routes
    this.init();
  }

  public static get router(): Router {
    if (!<%= name %>Routes.instance) {
      <%= name %>Routes.instance = new <%= name %>Routes();
    }
    return <%= name %>Routes.instance.router;
  }

  private init(): void {
    logger.info('Creating <%= name %>Routes');

    // this.router.get('/', this.method);
    // Insert Route methods here
  }
}
