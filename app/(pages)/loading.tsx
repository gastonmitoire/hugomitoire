import { Spinner } from "@nextui-org/spinner";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="flex h-screen w-full animate-pulse items-center justify-center bg-white bg-opacity-5">
      <Spinner />
    </div>
  );
}
