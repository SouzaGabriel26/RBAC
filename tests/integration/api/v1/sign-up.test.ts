import { randomBytes, randomUUID } from 'node:crypto';
import { beforeAll, describe, expect, it } from 'vitest';
import { prismaClient } from '../../../../src/application/libs/prismaClient';
import { webServer } from '../../../orchestrator';

beforeAll(async () => {
	await prismaClient.user.deleteMany();
	await prismaClient.role.deleteMany();
});

describe('> [POST] api/v1/sign-up', async () => {
	it('should return 400 if no body is provided', async () => {
		const response = await fetch(`${webServer.hostname}/api/v1/sign-up`, {
			method: 'POST',
			body: JSON.stringify({}),
		});

		expect(response.status).toBe(400);

		const responseBody = await response.json();
		expect(responseBody).toStrictEqual({
			error: [
				{
					code: 'invalid_type',
					expected: 'string',
					received: 'undefined',
					path: ['email'],
					message: 'Required',
				},
				{
					code: 'invalid_type',
					expected: 'string',
					received: 'undefined',
					path: ['name'],
					message: 'Required',
				},
				{
					code: 'invalid_type',
					expected: 'string',
					received: 'undefined',
					path: ['password'],
					message: 'Required',
				},
				{
					code: 'invalid_type',
					expected: 'string',
					received: 'undefined',
					path: ['roleId'],
					message: 'Required',
				},
			],
		});
	});

	it('should return 409 if account already exists (email)', async () => {
		const mockedEmail = 'mockedemail@mail.com';

		const createdRole = await prismaClient.role.create({
			data: {
				name: 'test-role',
			},
		});
		await prismaClient.user.create({
			data: {
				email: mockedEmail,
				name: 'Test',
				passwordHash: randomUUID(),
				roleId: createdRole.id,
			},
		});

		const response = await fetch(`${webServer.hostname}/api/v1/sign-up`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				email: mockedEmail,
				name: 'Test 2',
				password: randomUUID(),
				roleId: createdRole.id,
			}),
		});

		expect(response.status).toBe(409);

		const responseBody = await response.json();
		expect(responseBody).toStrictEqual({
			error: 'This email is already in use.',
		});
	});

	it('should return 404 if role does not exists (roleId)', async () => {
		const response = await fetch(`${webServer.hostname}/api/v1/sign-up`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				email: 'test.mail@email.com',
				name: 'Mocked Name',
				password: randomUUID(),
				roleId: randomUUID(),
			}),
		});

		expect(response.status).toBe(404);
		const responseBody = await response.json();

		expect(responseBody).toStrictEqual({
			error: 'Role not found.',
		});
	});

	it('should return 204 if all body inputs are valid', async () => {
		const mockedEmail = randomBytes(6).toString('hex').concat('@mail.com');

		const createdRole = await prismaClient.role.create({
			data: {
				name: 'mocked-role',
			},
		});

		const response = await fetch(`${webServer.hostname}/api/v1/sign-up`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({
				email: mockedEmail,
				name: 'Test 2',
				password: randomUUID(),
				roleId: createdRole.id,
			}),
		});

		expect(response.status).toBe(204);
	});
});
