import Link from "next/link";
import { ConnectWalletButton } from "./connect-button";

interface Path {
  label: string;
  path: string;
}
const paths: Path[] = [
  {
    label: "Join",
    path: "/join",
  },
];

export default function Navbar() {
  return (
    <div className=" flex h-20 items-center justify-between border-b border-neutral-300 ">
      <div className=" text-xl font-bold">
        <Link href={"/"}>InventtID</Link>
      </div>
      <div className=" flex items-center gap-4">
        {paths.map(({ label, path }: Path, idx: number) => (
          <Link key={idx} href={path} className=" hover:underline">
            {label}
          </Link>
        ))}
        <ConnectWalletButton />
      </div>
    </div>
  );
}
