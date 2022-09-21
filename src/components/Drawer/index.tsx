import Link from "next/link";
import { IconType } from "react-icons/lib";
import { RiDashboardFill, RiSettings2Fill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { WithUser } from "../../contexts/UserContext";
import { useRouter } from "next/router";
import { FiUsers } from "react-icons/fi";
import { VscProject } from "react-icons/vsc";
import { RiTeamLine } from "react-icons/ri";
export const Drawer = () => {
  const { user, logout } = WithUser();
  const router = useRouter();
  const pages = [
    {
      path: "/",
      label: "Dashboard",
      Icon: RiDashboardFill,
    },
    {
      path: "/settings",
      label: "Settings",
      Icon: RiSettings2Fill,
    },
    {
      path: "/employees",
      label: "Employees",
      Icon: FiUsers,
    },
    {
      path: "/projects",
      label: "Projects",
      Icon: VscProject,
    },
    {
      path: "/teams",
      label: "Teams",
      Icon: RiTeamLine,
    },
  ];
  type Tab = {
    path: string;
    label: string;
    Icon: IconType;
  };
  const Tab = ({ label, path, Icon }: Tab) => {
    const active = router.pathname === path;
    return (
      <Link href={path}>
        <div className="cursor-pointer flex items-center flex-col">
          <Icon size={30} color={active ? "gray" : "black"} />
          {label}
        </div>
      </Link>
    );
  };
  return (
    <div className="w-52 h-full p-4">
      <div className="bg-white h-full text-gray-800 items-center rounded-md flex flex-col justify-between p-4">
        <div className="border-b-2 h-20 flex items-center ju">
          {user && <p className="text-xl font-bold">Hello {user.firstName}</p>}
        </div>
        <div className="flex flex-col gap-5 items-center h-full pt-40">
          {pages.map((page, key) => {
            return <Tab {...page} key={key} />;
          })}
        </div>
        <div
          className="flex items-center justify-center w-full"
          onClick={logout}
        >
          <Tab label="Sign Out" path="" Icon={FaSignOutAlt} />
        </div>
      </div>
    </div>
  );
};
