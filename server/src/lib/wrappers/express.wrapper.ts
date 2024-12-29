import { Request, Response, NextFunction } from "express";

function expressWrapper(
  fn: (req: Request, res: Response, next?: NextFunction) => Promise<void>,
) {
  return async function (req: Request, res: Response, next: NextFunction) {
    try {
      await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };
}

export { expressWrapper };
