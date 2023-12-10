"use client";
import Link from "next/link";
import { useAccount } from "wagmi";
import { ConnectWalletButton } from "./connect-button";

export default function Navbar() {
  const { isConnected } = useAccount();
  return (
    <div className=" flex h-20 items-center justify-between border-b border-violet-200 ">
      <div className=" text-xl font-bold">
        <Link href={"/"}>InventtID</Link>
      </div>
      <div className=" flex items-center gap-4">
        {isConnected && (
          <Link href={"/dashboard"} className="hover:underline">
            Dashboard
          </Link>
        )}
        {!isConnected && (
          <Link href={"/onboarding"} className="hover:underline">
            Join
          </Link>
        )}
        <ConnectWalletButton />
      </div>
    </div>
  );
}
