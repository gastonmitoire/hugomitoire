import { usersService } from "@/app/_user/_service/users.service";

export default async function AdminUsersPage() {
  const users = await usersService.getAll();

  return (
    <div>
      <h1>AdminUsersPage</h1>

      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
}
