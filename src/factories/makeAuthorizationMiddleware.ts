import {
  AuthorizationMiddleware,
  type IOptions,
} from "../application/middlewares/AuthorizationMiddleware";
import { makeGetRolePermissionUseCase } from "./makeGetRolePermissionUseCase";

export function makeAuthorizationMiddleware(
  requiredPermissions: string[],
  options?: IOptions
) {
  const getRolePermissionUseCase = makeGetRolePermissionUseCase();

  return new AuthorizationMiddleware(
    requiredPermissions,
    getRolePermissionUseCase,
    options
  );
}
