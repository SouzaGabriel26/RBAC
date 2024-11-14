import { AuthenticationMiddleware } from "../middlewares/AuthenticationMiddleware";

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware();
}
