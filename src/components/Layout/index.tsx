import Link from "next/link";
import { ReactNode } from "react";
import { WithUser } from "../../contexts/UserContext";
import { Drawer } from "../Drawer";
export const Layout = ({ children }: { children: ReactNode }) => {
  const { user } = WithUser();
  return (
    <div className="bg-gray-800 flex flex-col text-white h-screen">
      {/* Navbar */}
      <div className="bg-white">
        <div className="container mx-auto text-gray-800 h-14 flex items-center  justify-between">
          <div>
            <Link href={"/"}>
              <span className="text-2xl font-bold cursor-pointer ">
                Admin Dashboard
              </span>
            </Link>
          </div>
        </div>
      </div>
      {/* Main Page */}
      <main className="flex flex-row h-full">
        {/* Sidebar */}
        {user && <Drawer />}
        {children}
      </main>
    </div>
  );
};
