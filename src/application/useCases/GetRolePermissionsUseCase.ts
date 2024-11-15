import type { IUseCase } from "../interfaces/IUseCase";
import { prismaClient } from "../libs/prismaClient";

interface IInput {
  roleId: string;
}

export class GetRolePermissionsUseCase implements IUseCase {
  async execute({ roleId }: IInput) {
    const rolePermissions = await prismaClient.rolePermission.findMany({
      where: { roleId },
      select: { permissionCode: true },
    });

    const permissionCodes = rolePermissions.map(
      (rolePermissions) => rolePermissions.permissionCode
    );

    return { permissionCodes };
  }
}
