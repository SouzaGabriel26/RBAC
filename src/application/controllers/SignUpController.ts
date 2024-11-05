import type { IController, IResponse } from '../interfaces/IController';
import type { IRequest } from '../interfaces/IRequest';

export class SignUpController implements IController {
	// signUpUseCase
	// constructor() {}

	async handle({ body }: IRequest): Promise<IResponse> {
		return {
			statusCode: 200,
			body: {
				message: 'Hello World',
			},
		};
	}
}
