import { AccountAlreadyExists } from '../error/AccountAlreadyExists';
import type { IController, IResponse } from '../interfaces/IController';
import type { IRequest } from '../interfaces/IRequest';
import type { SignUpUseCase } from '../useCases/SignUpUseCase';

import { ZodError, z } from 'zod';

const schema = z.object({
	email: z.string().email(),
	name: z.string(),
	password: z.string().min(6, {
		message: 'Password must have at least 6 characters.',
	}),
	roleId: z.string().uuid({
		message: 'Role ID must be a valid UUID.',
	}),
});

export class SignUpController implements IController {
	constructor(private readonly signUpUseCase: SignUpUseCase) {}

	async handle({ body }: IRequest): Promise<IResponse> {
		try {
			const { email, name, password, roleId } = schema.parse(body);

			await this.signUpUseCase.execute({ email, name, password, roleId });

			// TODO: Log to an external service

			return {
				statusCode: 204,
				body: null,
			};
		} catch (error) {
			if (error instanceof ZodError) {
				return {
					statusCode: 400,
					body: {
						error: error.issues,
					},
				};
			}

			if (error instanceof AccountAlreadyExists) {
				return {
					statusCode: 409,
					body: {
						error: 'This email is already in use.',
					},
				};
			}

			throw error;
		}
	}
}
