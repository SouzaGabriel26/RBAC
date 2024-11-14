import { verify } from "jsonwebtoken";
import type {
  IData,
  IMiddleware,
  IResponse,
} from "../application/interfaces/IMiddleware";
import type { IRequest } from "../application/interfaces/IRequest";

export class AuthenticationMiddleware implements IMiddleware {
  async handle(request: IRequest): Promise<IResponse | IData> {
    const { headers } = request;

    if (!headers.authorization) {
      return {
        statusCode: 401,
        body: { error: "Invalid access token." },
      };
    }

    try {
      const [type, token] = headers.authorization.split(" ");

      if (type !== "Bearer") {
        throw new Error();
      }

      const payload = verify(token, process.env.JWT_SECRET_KEY);

      return {
        data: {
          user: {
            id: payload.sub,
            role: payload.role,
          },
        },
      };
    } catch {
      return {
        statusCode: 401,
        body: { error: "Invalid access token." },
      };
    }
  }
}
