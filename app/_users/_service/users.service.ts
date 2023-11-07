import { fetchClient } from "@/app/_utils";
import { User as UserModel } from "@prisma/client";

export const usersService = {
  getAll,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  const users = await fetchClient("/users", { method: "GET", headers: {} });

  return users as UserModel[];
}

async function create(user: Omit<UserModel, "id">) {
  const response = await fetchClient("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  return response as UserModel;
}

async function update(user: UserModel) {
  const response = await fetchClient(`/users/${user.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  return response as UserModel;
}

async function _delete(id: string) {
  const response = await fetchClient(`/users/${id}`, {
    method: "DELETE",
    headers: {},
  });

  return response as UserModel;
}
