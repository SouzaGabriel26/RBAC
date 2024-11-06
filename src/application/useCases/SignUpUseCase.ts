import { AccountAlreadyExists } from '../error/AccountAlreadyExists';
import { prismaClient } from '../libs/prismaClient';

import { hash } from 'bcryptjs';

interface IInput {
	name: string;
	email: string;
	password: string;
	roleId: string;
}

export class SignUpUseCase {
	constructor(private readonly salt: number) {}

	async execute({ email, name, password, roleId }: IInput) {
		const accountAlreadyExists = await prismaClient.user.findUnique({
			where: {
				email,
			},
		});

		if (accountAlreadyExists) {
			throw new AccountAlreadyExists();
		}

		// TODO: validate if roleId exists

		const hashedPassword = await hash(password, this.salt);

		await prismaClient.user.create({
			data: {
				email,
				name,
				passwordHash: hashedPassword,
				roleId,
			},
		});
	}
}
