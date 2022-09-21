import Link from "next/link";
import { ReactNode } from "react";

export const DashboardCard = ({
  children,
  path,
}: {
  children: ReactNode;
  path: string;
}) => {
  return (
    <Link href={path}>
      <div className="bg-white w-full h-40 rounded-md  text-gray-800 hover:bg-gray-100 cursor-pointer">
        {children}
      </div>
    </Link>
  );
};
