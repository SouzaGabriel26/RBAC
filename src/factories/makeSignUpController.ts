import { SignUpController } from '../application/controllers/SignUpController';
import { makeSignUpUseCase } from './makeSignUpUseCase';

export function makeSignUpController() {
	const SALT = 10;
	const signUpUseCase = makeSignUpUseCase(SALT);
	return new SignUpController(signUpUseCase);
}
