import { randomUUID } from "node:crypto";
import type { IController, IResponse } from "../interfaces/IController";
import type { IRequest } from "../interfaces/IRequest";
import { sleep } from "../utils/sleep";

export class ListLeadsController implements IController {
  async handle(_request: IRequest): Promise<IResponse> {
    await sleep();

    const leads = [
      { id: randomUUID(), name: "User 1", email: "user1@mail.com" },
      { id: randomUUID(), name: "User 2", email: "user2@mail.com" },
      { id: randomUUID(), name: "User 3", email: "user3@mail.com" },
    ];

    return {
      statusCode: 200,
      body: { leads },
    };
  }
}
