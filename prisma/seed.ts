import { prismaClient } from "../src/application/libs/prismaClient";

async function main() {
  await prismaClient.user.deleteMany();
  await prismaClient.rolePermission.deleteMany();
  await prismaClient.permission.deleteMany();
  await prismaClient.role.deleteMany();

  const adminRole = await prismaClient.role.create({
    data: {
      name: "admin",
    },
  });

  await prismaClient.role.create({
    data: {
      name: "user",
    },
  });

  const createPermission = await prismaClient.permission.create({
    data: {
      code: "permission:create",
    },
  });

  const readPermission = await prismaClient.permission.create({
    data: {
      code: "permission:read",
    },
  });

  await prismaClient.rolePermission.createMany({
    data: [
      {
        roleId: adminRole.id,
        permissionCode: createPermission.code,
      },
      {
        roleId: adminRole.id,
        permissionCode: readPermission.code,
      },
    ],
  });

  await prismaClient.user.create({
    data: {
      email: "admin@email.com",
      name: "Admin User",
      passwordHash:
        "$2a$12$cf1tYwdsYYkO6wUeDPOElegUY/6X2Iw/55XgR6B/NxBbnDcVyTzB.", // 123456
      roleId: adminRole.id,
    },
  });

  console.log("Seeds created successfully!");
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
