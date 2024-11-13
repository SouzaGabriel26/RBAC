import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { InvalidCredentials } from "../error/InvalidCredentials";
import type { IUseCase } from "../interfaces/IUseCase";
import { prismaClient } from "../libs/prismaClient";

interface IInput {
  email: string;
  password: string;
}

export class SignInUseCase implements IUseCase {
  async execute({ email, password }: IInput) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new InvalidCredentials();
    }

    const { passwordHash } = user;
    const isPasswordValid = await compare(password, passwordHash);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign({ id: user.id }, process.env.JWT_SECRET_KEY!);

    return {
      accessToken,
    };
  }
}
