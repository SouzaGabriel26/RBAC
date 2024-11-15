import type { IController, IResponse } from "../interfaces/IController";
import type { IRequest } from "../interfaces/IRequest";
import type { ListRolePermissionsUseCase } from "../useCases/ListRolePermissionsUseCase";

export class ListRolePermissionsController implements IController {
  constructor(
    private readonly listRolePermissionsUseCase: ListRolePermissionsUseCase
  ) {}

  async handle(_request: IRequest): Promise<IResponse> {
    const { rolePermissions } = await this.listRolePermissionsUseCase.execute();

    return {
      body: { rolePermissions },
      statusCode: 200,
    };
  }
}
