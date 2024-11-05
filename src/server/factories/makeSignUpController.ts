import { SignUpController } from '../../application/controllers/SignUpController';

export function makeSignUpController() {
	return new SignUpController();
}
