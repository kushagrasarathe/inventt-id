import Link from "next/link";
import React from "react";

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
    <div className=" flex items-center justify-between ">
      <div>InventtID</div>
      <div>
        {paths.map(({ label, path }: Path, idx: number) => (
          <Link key={idx} href={path}>
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
