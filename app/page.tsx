import Image from "next/image";

export default async function Home() {
  const users = await getData();

  console.log(users);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      OLAS COMO TE VA
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
