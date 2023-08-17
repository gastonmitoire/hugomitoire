import { UsersTable } from "@/app/features/admin/UsersTable";

export default async function AdminPage() {
  const users = await getData();
  return (
    <main className="container mx-auto">
      USERS
      {/* <UsersTable users={users} />{" "} */}
    </main>
  );
}

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      cache: "no-cache",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(`Error: ${error}`);
  }
}
