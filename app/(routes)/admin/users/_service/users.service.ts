import { fetchClient } from "@/app/_utils";
import { User as UserModel } from "@prisma/client";

export const usersService = {
  getAll,
  getById,
  getByRole,
};

async function getAll() {
  const users = await fetchClient("/users", { method: "GET", headers: {} });

  return users as UserModel[];
}

async function getByRole(role: string) {
  const users = await fetchClient(`/users/${role}`, {
    method: "GET",
    headers: {},
  });

  return users as UserModel[];
}

async function getById(id: string) {
  const user = await fetchClient(`/users/${id}`, {
    method: "GET",
    headers: {},
  });

  return user as UserModel;
}
