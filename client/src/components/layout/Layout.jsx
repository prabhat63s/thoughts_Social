import Sidebar from "../common/Sidebar";
import RightPanel from "../common/RightPanel";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../common/LoadingSpinner";
import { NavLink } from "react-router-dom";
import {
  BsChatDots,
  BsHouseDoor,
  BsPerson,
  BsPlusSquare,
  BsSearch,
} from "react-icons/bs";
import { MdOutlineNotifications } from "react-icons/md";

export default function Layout({ children }) {
  const { data: authUser, isLoading } = useQuery({
    // we use queryKey to give a unique name to our query and refer to it later
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        console.log("authUser is here:", data);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const nav = [
    {
      to: "/",
      icon: <BsHouseDoor size={20} />,
      title: "Home",
    },
    {
      to: "/explore",
      icon: <BsSearch size={20} />,
      title: "Explore",
    },
    {
      to: "/message",
      icon: <BsChatDots size={20} />,
      title: "Messages",
    },
    {
      to: "/notifications",
      icon: <MdOutlineNotifications size={20} />,
      title: "Notifications",
    },
    {
      to: `/profile/${authUser?.username}`,
      icon: <BsPerson size={20} />,
      title: "Profile",
    },
  ];

  return (
    <div className="flex w-full lg:max-w-7xl mx-auto h-screen">
      <div className="lg:w-[20%] h-full ">
        {authUser && <Sidebar />}
        <div className="fixed bottom-0 w-full flex lg:hidden py-4 px-5 justify-between bg-neutral-800">
          {nav.map((navItem, index) => (
            <NavLink
              to={navItem.to}
              key={index}
              className={({ isActive }) =>
                isActive
                  ? "w-fit text-xs gap-1 flex items-center flex-col"
                  : "w-fit text-xs gap-1 flex items-center flex-col text-neutral-400 hover:text-white"
              }
            >
              {navItem.icon} {navItem.title}
            </NavLink>
          ))}
        </div>
      </div>
      <main className="w-full lg:w-[50%]">
        {children}

        <NavLink to="/" className="fixed bottom-24 lg:bottom-4 right-5">
          <button className="text-blue-500 hover:bg-neutral-600 bg-neutral-900 animate-pulse rounded-full p-4">
            <BsPlusSquare size={20} />
          </button>
        </NavLink>
      </main>
      <div className="lg:w-[30%] h-full ">{authUser && <RightPanel />}</div>
    </div>
  );
}
