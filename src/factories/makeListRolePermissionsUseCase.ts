import { ListRolePermissionsUseCase } from "../application/useCases/ListRolePermissionsUseCase";

export function makeListRolePermissionsUseCase() {
  return new ListRolePermissionsUseCase();
}
