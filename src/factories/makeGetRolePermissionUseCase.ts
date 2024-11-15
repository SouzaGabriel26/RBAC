import { GetRolePermissionsUseCase } from "../application/useCases/GetRolePermissionsUseCase";

export function makeGetRolePermissionUseCase() {
  return new GetRolePermissionsUseCase();
}
