import type { IUseCase } from "../interfaces/IUseCase";
import { prismaClient } from "../libs/prismaClient";

interface IOutput {
  rolePermissions: Array<{
    permissionId: string;
    permissionCode: string;
    roleId: string;
    roleName: string;
  }>;
}

export class ListRolePermissionsUseCase implements IUseCase {
  async execute(): Promise<IOutput> {
    const rolePermissions = await prismaClient.rolePermission.findMany({
      select: {
        roleId: true,
        permissionCode: true,
        role: {
          select: {
            name: true,
          },
        },
        permission: {
          select: {
            id: true,
          },
        },
      },
    });

    const formattedRolePermissions = rolePermissions.map(
      ({ permissionCode, permission, role, roleId }) => ({
        permissionId: permission.id,
        permissionCode,
        roleId,
        roleName: role.name,
      })
    );

    return {
      rolePermissions: formattedRolePermissions,
    };
  }
}
