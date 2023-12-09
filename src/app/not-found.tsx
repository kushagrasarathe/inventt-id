"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <div className=" flex min-h-[80dvh]  flex-col items-center justify-center space-y-4">
      <h1 className=" text-3xl">404</h1>
      <h1 className=" text-3xl">Page not found</h1>
      <Button onClick={goBack}>Go Back</Button>
    </div>
  );
}
