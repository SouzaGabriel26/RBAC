import type { NextFunction, Request, Response } from "express";
import type { IMiddleware } from "../../application/interfaces/IMiddleware";

export function middlewareAdapter(middleware: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const middlewareResult = await middleware.handle({
      body: request.body,
      params: request.params,
      headers: request.headers as Record<string, string>,
      user: request.metadata?.user,
    });

    if ("statusCode" in middlewareResult) {
      const { body, statusCode } = middlewareResult;
      response.json(body).status(statusCode);
      return;
    }

    request.metadata = {
      ...request.metadata,
      ...middlewareResult.data,
    };

    next();
  };
}
