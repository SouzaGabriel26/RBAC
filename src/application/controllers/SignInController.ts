import { ZodError, z } from "zod";
import { InvalidCredentials } from "../error/InvalidCredentials";
import type { IController, IResponse } from "../interfaces/IController";
import type { IRequest } from "../interfaces/IRequest";
import type { SignInUseCase } from "../useCases/SignInUseCase";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must have at least 6 characters.",
  }),
});

export class SignInController implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    try {
      const { email, password } = schema.parse(request.body);

      const { accessToken } = await this.signInUseCase.execute({
        email,
        password,
      });

      return {
        statusCode: 200,
        body: {
          accessToken,
        },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: {
            error: error.issues,
          },
        };
      }

      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: {
            error: "Invalid credentials.",
          },
        };
      }
    }
  }
}
