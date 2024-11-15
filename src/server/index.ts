import express from "express";
import { makeAuthenticationMiddleware } from "../factories/makeAuthenticationMiddleware";
import { makeAuthorizationMiddleware } from "../factories/makeAuthorizationMiddleware";
import { makeListLeadsController } from "../factories/makeListLeadsController";
import { makeListRolePermissionsController } from "../factories/makeListRolePermissionsContoller";
import { makeSignInController } from "../factories/makeSignInController";
import { makeSignUpController } from "../factories/makeSignUpController";
import { middlewareAdapter } from "./adapters/middlewareAdapter";
import { routeAdapter } from "./adapters/routeAdapter";
const app = express();

app.use(express.json());

app.post(mountUrl("/sign-up"), routeAdapter(makeSignUpController()));
app.post(mountUrl("/sign-in"), routeAdapter(makeSignInController()));

app.get(
  mountUrl("/leads"),
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeListLeadsController())
);

app.get(
  mountUrl("/role-permissions"),
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(["permission:read"])),
  routeAdapter(makeListRolePermissionsController())
);

app.listen(3000, () => {
  console.log("🚀 Server is running on port: http://localhost:3000");
});

function mountUrl(path: string) {
  const baseRoute = "/api/v1";
  return baseRoute.concat(path);
}
