import type { IData, IMiddleware, IResponse } from "../interfaces/IMiddleware";
import type { IRequest } from "../interfaces/IRequest";
import type { GetRolePermissionsUseCase } from "../useCases/GetRolePermissionsUseCase";

export interface IOptions {
  operator: "AND" | "OR";
}

export class AuthorizationMiddleware implements IMiddleware {
  constructor(
    private readonly requiredPermissions: string[],
    private readonly getRolePermissionUseCase: GetRolePermissionsUseCase,
    private readonly options?: IOptions
  ) {}

  async handle(request: IRequest): Promise<IResponse | IData> {
    const { user } = request;

    if (!user) {
      return {
        statusCode: 401,
        body: {
          error: "Access Denied.",
        },
      };
    }

    const { permissionCodes } = await this.getRolePermissionUseCase.execute({
      roleId: user.role,
    });

    const operatorFn = this.options?.operator === "AND" ? "every" : "some";
    const userHasPermission = this.requiredPermissions[operatorFn](
      (requiredPermission) => permissionCodes.includes(requiredPermission)
    );

    if (!userHasPermission) {
      return {
        statusCode: 403,
        body: {
          error: "Access Denied.",
        },
      };
    }

    return {
      data: {},
    };
  }
}
