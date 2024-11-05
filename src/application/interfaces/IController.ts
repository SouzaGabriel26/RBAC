import type { IRequest } from './IRequest';

export interface IResponse {
	statusCode: number;
	body: Record<string, unknown> | null;
}

export interface IController {
	handle(request: IRequest): Promise<IResponse>;
}
