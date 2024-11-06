import { SignUpUseCase } from '../application/useCases/SignUpUseCase';

export function makeSignUpUseCase(salt: number) {
	return new SignUpUseCase(salt);
}
