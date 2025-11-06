import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold">VaultDapp</div>
      </div>
    </Link>
  );
};
