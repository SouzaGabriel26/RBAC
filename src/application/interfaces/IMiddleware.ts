import type { IRequest } from "./IRequest";

export interface IResponse {
  statusCode: number;
  body: Record<string, unknown> | null;
}

export interface IData {
  data: Record<string, unknown>;
}

export interface IMiddleware {
  handle(request: IRequest): Promise<IResponse | IData>;
}
