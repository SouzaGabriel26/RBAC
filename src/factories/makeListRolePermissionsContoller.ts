import { ListRolePermissionsController } from "../application/controllers/ListRolePermissionsController";
import { makeListRolePermissionsUseCase } from "./makeListRolePermissionsUseCase";

export function makeListRolePermissionsController() {
  const listRolePermissionsUseCase = makeListRolePermissionsUseCase();
  return new ListRolePermissionsController(listRolePermissionsUseCase);
}
